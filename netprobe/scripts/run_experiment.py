#!/usr/bin/env python3
"""Run NetProbe experiment from JSON config."""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"


def load_config(path: Path) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def make_test_file(path: Path, size_bytes: int) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(os.urandom(size_bytes))


def run_single(cfg: dict, run_id: int) -> dict:
    file_path = ROOT / cfg.get("file", "experiments/test_files/sample.bin")
    size = cfg.get("file_size_bytes")
    if size:
        make_test_file(file_path, size)

    server_port = cfg.get("server_port", 9001)
    client_port = cfg.get("client_port", 9000)
    use_sim = cfg.get("use_simulator", False)
    loss_rate = cfg.get("loss_rate", 0.0)
    delay_ms = cfg.get("delay_ms", 0)

    results_dir = ROOT / "experiments" / "results" / cfg["name"]
    results_dir.mkdir(parents=True, exist_ok=True)

    log_suffix = f"{cfg['name']}_run{run_id}"
    metrics_out = results_dir / f"{log_suffix}_metrics.json"
    received_dir = results_dir / "received"

    env = {**os.environ, "PYTHONPATH": str(SRC)}
    procs: list[subprocess.Popen] = []

    try:
        if use_sim:
            sim_cmd = [
                sys.executable,
                str(SRC / "simulator.py"),
                "--listen",
                str(client_port),
                "--forward",
                str(server_port),
                "--loss-rate",
                str(loss_rate),
                "--delay-ms",
                str(delay_ms),
                "--seed",
                str(cfg.get("seed", 42) + run_id),
            ]
            procs.append(subprocess.Popen(sim_cmd, cwd=ROOT, env=env))

        server_cmd = [
            sys.executable,
            str(SRC / "server.py"),
            "--port",
            str(server_port),
            "--out-dir",
            str(received_dir),
            "--log",
            str(results_dir / f"server_{log_suffix}.jsonl"),
        ]
        procs.append(subprocess.Popen(server_cmd, cwd=ROOT, env=env))
        time.sleep(0.3)

        target_port = client_port if use_sim else server_port
        client_cmd = [
            sys.executable,
            str(SRC / "client.py"),
            "--host",
            "127.0.0.1",
            "--port",
            str(target_port),
            "--file",
            str(file_path),
            "--chunk-size",
            str(cfg.get("chunk_size", 1024)),
            "--timeout",
            str(cfg.get("timeout_ms", 1000)),
            "--window",
            str(cfg.get("window_size", 8)),
            "--max-retries",
            str(cfg.get("max_retries", 5)),
            "--log",
            str(results_dir / f"client_{log_suffix}.jsonl"),
            "--metrics-out",
            str(metrics_out),
        ]
        result = subprocess.run(
            client_cmd,
            cwd=ROOT,
            env=env,
            capture_output=True,
            text=True,
            timeout=cfg.get("timeout_sec", 120),
        )

        success = result.returncode == 0
        metrics = {}
        if metrics_out.exists():
            with open(metrics_out, encoding="utf-8") as f:
                metrics = json.load(f)

        return {
            "run_id": run_id,
            "success": success,
            "metrics": metrics,
            "stdout": result.stdout,
            "stderr": result.stderr,
        }
    finally:
        for p in procs:
            p.terminate()
            try:
                p.wait(timeout=2)
            except subprocess.TimeoutExpired:
                p.kill()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", type=Path, required=True)
    parser.add_argument("--repeats", type=int, default=3)
    args = parser.parse_args()

    cfg = load_config(args.config)
    repeats = cfg.get("repeats", args.repeats)

    print(f"[experiment] {cfg['name']} x{repeats}")
    runs = [run_single(cfg, i + 1) for i in range(repeats)]

    out_path = ROOT / "experiments" / "results" / f"{cfg['name']}_summary.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    successful = [r for r in runs if r["success"]]
    agg = {}
    if successful:
        keys = ["completion_time_s", "throughput_bps", "goodput_bps", "retransmission_rate", "packet_loss_rate", "avg_rtt_ms"]
        for key in keys:
            vals = [r["metrics"].get(key, 0) for r in successful if r.get("metrics")]
            agg[key] = {"mean": sum(vals) / len(vals) if vals else 0, "n": len(vals)}

    summary = {"config": cfg, "runs": runs, "aggregate": agg}
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=2)

    print(f"[experiment] Summary -> {out_path}")
    print(f"[experiment] Success: {len(successful)}/{len(runs)}")
    sys.exit(0 if successful else 1)


if __name__ == "__main__":
    main()
