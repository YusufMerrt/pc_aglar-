#!/usr/bin/env python3
"""E2E smoke tests for NetProbe."""

from __future__ import annotations

import hashlib
import os
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
ENV = {**os.environ, "PYTHONPATH": str(SRC)}


def make_file(path: Path, size: int) -> bytes:
    data = os.urandom(size)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return data


def run_transfer(
    file_path: Path,
    server_port: int = 9101,
    use_sim: bool = False,
    loss_rate: float = 0.0,
) -> bool:
    received_dir = ROOT / "received_smoke"
    received_dir.mkdir(exist_ok=True)

    procs = []
    client_port = 9100

    try:
        if use_sim:
            procs.append(
                subprocess.Popen(
                    [
                        sys.executable,
                        str(SRC / "simulator.py"),
                        "--listen",
                        str(client_port),
                        "--forward",
                        str(server_port),
                        "--loss-rate",
                        str(loss_rate),
                        "--seed",
                        "42",
                    ],
                    cwd=ROOT,
                    env=ENV,
                )
            )
            time.sleep(0.2)

        procs.append(
            subprocess.Popen(
                [
                    sys.executable,
                    str(SRC / "server.py"),
                    "--port",
                    str(server_port),
                    "--out-dir",
                    str(received_dir),
                ],
                cwd=ROOT,
                env=ENV,
            )
        )
        time.sleep(0.3)

        target = client_port if use_sim else server_port
        r = subprocess.run(
            [
                sys.executable,
                str(SRC / "client.py"),
                "--host",
                "127.0.0.1",
                "--port",
                str(target),
                "--file",
                str(file_path),
                "--timeout",
                "500",
            ],
            cwd=ROOT,
            env=ENV,
            capture_output=True,
            text=True,
            timeout=60,
        )

        if r.returncode != 0:
            print(r.stderr)
            return False

        out_file = received_dir / file_path.name
        if not out_file.exists():
            print(f"Missing output: {out_file}")
            return False

        return out_file.read_bytes() == file_path.read_bytes()
    finally:
        for p in procs:
            p.terminate()
            try:
                p.wait(timeout=2)
            except subprocess.TimeoutExpired:
                p.kill()


def main() -> None:
    test_file = ROOT / "experiments" / "test_files" / "smoke_test.bin"
    original = make_file(test_file, 65536)

    print("[smoke] Test 1: lossless 64KB...")
    if not run_transfer(test_file, use_sim=False):
        print("FAIL: lossless")
        sys.exit(1)
    print("PASS: lossless")

    print("[smoke] Test 2: 10% loss via simulator...")
    if not run_transfer(test_file, use_sim=True, loss_rate=0.10):
        print("FAIL: lossy")
        sys.exit(1)
    print("PASS: lossy")

    print("[smoke] All tests passed.")
    sys.exit(0)


if __name__ == "__main__":
    main()
