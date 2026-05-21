"""Sliding window sender for NetProbe client."""

from __future__ import annotations

import hashlib
import select
import socket
import time
from pathlib import Path
from typing import Optional

import config
from logger import EventLogger
from metrics import compute_metrics, save_metrics
from protocol import AckPacket, ErrPacket, decode_packet, encode_data, encode_fin


class SlidingWindowSender:
    def __init__(
        self,
        sock: socket.socket,
        addr: tuple[str, int],
        file_path: Path,
        chunk_size: int = config.CHUNK_SIZE,
        window_size: int = config.WINDOW_SIZE,
        timeout_ms: int = config.TIMEOUT_MS,
        max_retries: int = config.MAX_RETRIES,
        logger: Optional[EventLogger] = None,
        metrics_path: Optional[Path] = None,
    ):
        self.sock = sock
        self.addr = addr
        self.file_path = Path(file_path)
        self.chunk_size = chunk_size
        self.window_size = window_size
        self.timeout_sec = timeout_ms / 1000.0
        self.max_retries = max_retries
        self.logger = logger or EventLogger()
        self.metrics_path = metrics_path

        self.file_data = self.file_path.read_bytes()
        self.file_hash = hashlib.sha256(self.file_data).digest()

        if len(self.file_data) == 0:
            self.chunks = [b""]
        else:
            self.chunks = [
                self.file_data[i : i + chunk_size]
                for i in range(0, len(self.file_data), chunk_size)
            ]

        self.total_pkts = len(self.chunks)
        self.fin_seq = self.total_pkts

        self.base = 0
        self.in_flight: dict[int, dict] = {}
        self.acked_packets: set[int] = set()
        self.failed = False

    def _packet_bytes(self, seq: int) -> bytes:
        if seq < self.total_pkts:
            return encode_data(seq, self.total_pkts, self.chunks[seq])
        fin_payload = self.file_hash + self.file_path.name.encode("utf-8")
        return encode_fin(self.fin_seq, self.total_pkts, fin_payload)

    def _send_packet(self, seq: int, attempt: int = 1) -> None:
        raw = self._packet_bytes(seq)
        self.sock.sendto(raw, self.addr)
        payload_len = (
            len(self.chunks[seq]) if seq < self.total_pkts else len(self.file_hash)
        )
        self.logger.send(seq, payload_len)
        if attempt > 1:
            self.logger.retransmit(seq, attempt)
        self.in_flight[seq] = {"sent_at": time.time(), "attempt": attempt}

    def _handle_ack(self, ack_num: int) -> None:
        if ack_num in self.in_flight:
            rtt = (time.time() - self.in_flight[ack_num]["sent_at"]) * 1000
            self.logger.ack_received(ack_num, rtt)
            del self.in_flight[ack_num]

        self.acked_packets.add(ack_num)
        while self.base <= self.fin_seq and self.base in self.acked_packets:
            self.base += 1

    def _fill_window(self) -> None:
        upper = min(self.base + self.window_size, self.fin_seq + 1)
        for seq in range(self.base, upper):
            if seq not in self.in_flight:
                self._send_packet(seq)

    def _check_timeouts(self) -> bool:
        now = time.time()
        for seq, info in list(self.in_flight.items()):
            if now - info["sent_at"] < self.timeout_sec:
                continue
            self.logger.timeout(seq)
            attempt = info["attempt"] + 1
            if attempt > self.max_retries:
                self.logger.error(
                    "max_retries_exceeded",
                    seq=seq,
                    max_retries=self.max_retries,
                )
                self.failed = True
                return False
            del self.in_flight[seq]
            self._send_packet(seq, attempt)
        return True

    def transfer(self) -> bool:
        start = time.time()

        while self.base <= self.fin_seq and not self.failed:
            self._fill_window()

            if self.base > self.fin_seq:
                break

            readable, _, _ = select.select([self.sock], [], [], self.timeout_sec)

            if readable:
                data, _ = self.sock.recvfrom(config.BUFFER_SIZE)
                packet = decode_packet(data)
                if isinstance(packet, AckPacket):
                    self._handle_ack(packet.ack_num)
                elif isinstance(packet, ErrPacket):
                    self.logger.error("server_error", message=packet.message)
                    self.failed = True
                    break

            if not self._check_timeouts():
                break

        end = time.time()
        success = not self.failed and self.base > self.fin_seq

        metrics = compute_metrics(self.logger, len(self.file_data), start, end)
        metrics["success"] = success
        metrics["filename"] = self.file_path.name

        if self.metrics_path:
            save_metrics(metrics, self.metrics_path)

        if success:
            self.logger.transfer_complete(**metrics)

        return success
