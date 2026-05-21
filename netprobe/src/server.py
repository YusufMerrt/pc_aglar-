#!/usr/bin/env python3
"""NetProbe UDP file transfer server."""

from __future__ import annotations

import argparse
import select
import socket
import sys
import time
from pathlib import Path

import config
from logger import EventLogger
from protocol import FinPacket, decode_packet, encode_err
from receiver import SelectiveRepeatReceiver


def run_server(port: int, out_dir: Path, log_path: Path | None) -> None:
    logger = EventLogger(log_path)
    receiver = SelectiveRepeatReceiver(out_dir, logger)
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("0.0.0.0", port))
    sock.settimeout(config.TIMEOUT_MS / 1000.0 * 2)

    print(f"[server] Listening on UDP port {port}, output -> {out_dir}")

    try:
        while True:
            try:
                data, addr = sock.recvfrom(config.BUFFER_SIZE)
            except socket.timeout:
                continue

            response = receiver.process(data)
            if response:
                sock.sendto(response, addr)

            packet = decode_packet(data)
            if isinstance(packet, FinPacket) and receiver.is_complete():
                filename = receiver.filename or f"received_{int(time.time())}.bin"
                out_path = receiver.assemble_file(filename)
                ok = receiver.verify_hash(out_path)

                if ok:
                    print(f"[server] File saved: {out_path} ({out_path.stat().st_size} bytes)")
                    logger.transfer_complete(
                        filename=filename,
                        bytes=out_path.stat().st_size,
                        duplicates=receiver.duplicate_count,
                    )
                else:
                    print(f"[server] HASH MISMATCH: {out_path}")
                    err = encode_err(packet.seq, "hash mismatch")
                    sock.sendto(err, addr)

                receiver.chunks.clear()
                receiver.total_pkts = None
                receiver.expected_hash = None
                receiver.filename = None

    except KeyboardInterrupt:
        print("\n[server] Stopped.")
    finally:
        sock.close()


def main() -> None:
    parser = argparse.ArgumentParser(description="NetProbe UDP server")
    parser.add_argument("--port", type=int, default=config.PORT)
    parser.add_argument("--out-dir", type=Path, default=Path(config.RECEIVED_DIR))
    parser.add_argument("--log", type=Path, default=None)
    args = parser.parse_args()

    log_path = args.log
    if log_path is None:
        log_path = Path(config.LOG_DIR) / f"server_{int(time.time())}.jsonl"

    run_server(args.port, args.out_dir, log_path)


if __name__ == "__main__":
    main()
