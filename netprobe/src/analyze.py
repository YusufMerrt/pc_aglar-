#!/usr/bin/env python3
"""Generate charts and summary from experiment results."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

ROOT = Path(__file__).resolve().parents[1]
RESULTS = ROOT / "experiments" / "results"


def _load_summaries(results_dir: Path) -> list[dict]:
    summaries = []
    for path in sorted(results_dir.glob("*_summary.json")):
        with open(path, encoding="utf-8") as f:
            summaries.append(json.load(f))
    return summaries


def plot_metric_by_scenario(summaries: list[dict], metric: str, out: Path) -> None:
    names, values = [], []
    for s in summaries:
        agg = s.get("aggregate", {}).get(metric, {})
        if agg.get("n", 0) > 0:
            names.append(s["config"]["name"])
            values.append(agg["mean"])

    if not names:
        return

    plt.figure(figsize=(10, 5))
    plt.bar(names, values, color="steelblue")
    plt.xticks(rotation=45, ha="right")
    plt.ylabel(metric)
    plt.title(f"NetProbe — {metric}")
    plt.tight_layout()
    plt.savefig(out, dpi=120)
    plt.close()


def write_summary_md(summaries: list[dict], out: Path) -> None:
    lines = ["# NetProbe Deney Özeti\n"]
    for s in summaries:
        cfg = s["config"]
        agg = s.get("aggregate", {})
        lines.append(f"## {cfg['name']}\n")
        lines.append(f"- Açıklama: {cfg.get('description', '')}\n")
        success = sum(1 for r in s["runs"] if r["success"])
        lines.append(f"- Başarı: {success}/{len(s['runs'])}\n")
        if agg:
            ct = agg.get("completion_time_s", {}).get("mean")
            tp = agg.get("throughput_bps", {}).get("mean")
            rr = agg.get("retransmission_rate", {}).get("mean")
            lines.append(f"- Ort. tamamlanma süresi: {ct:.3f} s\n" if ct else "")
            lines.append(f"- Ort. throughput: {tp:.0f} bps\n" if tp else "")
            lines.append(f"- Ort. retransmission rate: {rr:.4f}\n" if rr is not None else "")
        lines.append("\n**Yorum şablonu:** Parametre değişimi → retransmission/timeout davranışı → throughput ve completion time etkisi.\n\n")
    out.write_text("".join(lines), encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--results-dir", type=Path, default=RESULTS)
    args = parser.parse_args()

    results_dir = args.results_dir
    summaries = _load_summaries(results_dir)
    if not summaries:
        print("[analyze] No *_summary.json files found.")
        return

    charts_dir = results_dir / "charts"
    charts_dir.mkdir(parents=True, exist_ok=True)

    for metric in ["completion_time_s", "throughput_bps", "goodput_bps", "retransmission_rate"]:
        plot_metric_by_scenario(summaries, metric, charts_dir / f"{metric}.png")

    write_summary_md(summaries, results_dir / "summary.md")
    print(f"[analyze] Charts -> {charts_dir}")
    print(f"[analyze] Summary -> {results_dir / 'summary.md'}")


if __name__ == "__main__":
    main()
