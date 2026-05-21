"""Selective Repeat receiver for NetProbe server."""

from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Optional

from logger import EventLogger
from protocol import (
    AckPacket,
    DataPacket,
    ErrPacket,
    FinPacket,
    decode_packet,
    encode_ack,
    encode_err,
)


class SelectiveRepeatReceiver:
    def __init__(
        self,
        out_dir: Path,
        logger: Optional[EventLogger] = None,
    ):
        self.out_dir = Path(out_dir)
        self.out_dir.mkdir(parents=True, exist_ok=True)
        self.logger = logger or EventLogger()
        self.chunks: dict[int, bytes] = {}
        self.total_pkts: Optional[int] = None
        self.filename: Optional[str] = None
        self.duplicate_count = 0
        self.expected_hash: Optional[bytes] = None
        self.hash_verified: Optional[bool] = None
        self.transfer_failed = False

    def process(self, data: bytes) -> Optional[bytes]:
        """Process incoming UDP payload; return response bytes or None."""
        packet = decode_packet(data)
        if packet is None:
            return None

        if isinstance(packet, DataPacket):
            return self._handle_data(packet)
        if isinstance(packet, FinPacket):
            return self._handle_fin(packet)
        if isinstance(packet, ErrPacket):
            self.logger.error("peer_error", seq=packet.seq, message=packet.message)
            return None

        return None

    def _handle_data(self, packet: DataPacket) -> bytes:
        if self.total_pkts is None:
            self.total_pkts = packet.total_pkts

        if packet.seq in self.chunks:
            self.duplicate_count += 1
            self.logger.log("duplicate", seq=packet.seq)
            return encode_ack(packet.seq)

        self.chunks[packet.seq] = packet.payload
        self.logger.log("data_received", seq=packet.seq, bytes=len(packet.payload))
        return encode_ack(packet.seq)

    def _handle_fin(self, packet: FinPacket) -> bytes:
        if len(packet.payload) >= 32:
            self.expected_hash = packet.payload[:32]
            name_part = packet.payload[32:]
            if name_part:
                self.filename = name_part.decode("utf-8", errors="replace")
        else:
            self.expected_hash = packet.payload

        if self.total_pkts is None:
            self.total_pkts = packet.total_pkts

        if not self.is_complete():
            self.logger.error("incomplete_transfer", received=len(self.chunks))
            return encode_err(packet.seq, "incomplete transfer")

        return encode_ack(packet.seq)

    def is_complete(self) -> bool:
        if self.total_pkts is None:
            return False
        return len(self.chunks) >= self.total_pkts and all(
            i in self.chunks for i in range(self.total_pkts)
        )

    def assemble_file(self, filename: str) -> Path:
        out_path = self.out_dir / filename
        with open(out_path, "wb") as f:
            for i in range(self.total_pkts or 0):
                f.write(self.chunks[i])
        return out_path

    def verify_hash(self, file_path: Path) -> bool:
        digest = hashlib.sha256(file_path.read_bytes()).digest()
        if self.expected_hash is None:
            self.hash_verified = True
            return True
        self.hash_verified = digest == self.expected_hash
        if not self.hash_verified:
            self.logger.error(
                "hash_mismatch",
                expected=self.expected_hash.hex(),
                actual=digest.hex(),
            )
        else:
            self.logger.log("hash_verified", ok=True)
        return self.hash_verified
