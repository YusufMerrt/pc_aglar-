#!/usr/bin/env python3
"""NetProbe UDP file transfer client."""

from __future__ import annotations

import argparse
import socket
import sys
import time
from pathlib import Path

import config
from logger import EventLogger
from sender import SlidingWindowSender


def main() -> None:
    parser = argparse.ArgumentParser(description="NetProbe UDP client")
    parser.add_argument("--host", default=config.DEFAULT_HOST)
    parser.add_argument("--port", type=int, default=config.PORT)
    parser.add_argument("--file", type=Path, required=True)
    parser.add_argument("--chunk-size", type=int, default=config.CHUNK_SIZE)
    parser.add_argument("--timeout", type=int, default=config.TIMEOUT_MS, help="ms")
    parser.add_argument("--window", type=int, default=config.WINDOW_SIZE)
    parser.add_argument("--max-retries", type=int, default=config.MAX_RETRIES)
    parser.add_argument("--log", type=Path, default=None)
    parser.add_argument("--metrics-out", type=Path, default=None)
    args = parser.parse_args()

    if not args.file.is_file():
        print(f"[client] File not found: {args.file}", file=sys.stderr)
        sys.exit(1)

    log_path = args.log or Path(config.LOG_DIR) / f"client_{int(time.time())}.jsonl"
    metrics_path = args.metrics_out or Path(config.METRICS_DIR) / f"run_{int(time.time())}_metrics.json"

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    addr = (args.host, args.port)

    logger = EventLogger(log_path)
    sender = SlidingWindowSender(
        sock=sock,
        addr=addr,
        file_path=args.file,
        chunk_size=args.chunk_size,
        window_size=args.window,
        timeout_ms=args.timeout,
        max_retries=args.max_retries,
        logger=logger,
        metrics_path=metrics_path,
    )

    print(
        f"[client] Sending {args.file} ({args.file.stat().st_size} bytes) "
        f"-> {args.host}:{args.port} "
        f"(chunk={args.chunk_size}, window={args.window}, timeout={args.timeout}ms)"
    )

    success = sender.transfer()
    sock.close()

    if success:
        print(f"[client] Transfer complete. Log: {log_path}")
        print(f"[client] Metrics: {metrics_path}")
        sys.exit(0)

    print("[client] Transfer FAILED.", file=sys.stderr)
    sys.exit(1)


if __name__ == "__main__":
    main()
