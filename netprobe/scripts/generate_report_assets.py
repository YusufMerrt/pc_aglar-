#!/usr/bin/env python3
"""Generate clean academic-style figures for the technical report."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "docs" / "report_assets"
RESULTS = ROOT / "experiments" / "results"

plt.rcParams.update({
    "font.family": "sans-serif",
    "font.size": 10,
    "axes.titlesize": 11,
    "axes.labelsize": 10,
    "figure.facecolor": "white",
    "axes.facecolor": "white",
    "axes.grid": True,
    "grid.alpha": 0.3,
})


def load_summary(name: str) -> dict | None:
    path = RESULTS / f"{name}_summary.json"
    if not path.exists():
        return None
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def plot_architecture() -> None:
    fig, ax = plt.subplots(figsize=(7, 3.5))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis("off")

    boxes = [
        (0.3, 2.8, 2.4, 1.2, "İstemci\n(client / sender)", "#D6EAF8"),
        (3.8, 2.8, 2.4, 1.2, "Simülatör\n(kayıp / gecikme)", "#FCF3CF"),
        (7.3, 2.8, 2.4, 1.2, "Sunucu\n(server / receiver)", "#D5F5E3"),
        (3.8, 0.6, 2.4, 1.0, "Log & Metrik\n(JSONL / analyze)", "#E8DAEF"),
    ]
    for x, y, w, h, text, color in boxes:
        rect = mpatches.FancyBboxPatch(
            (x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08",
            facecolor=color, edgecolor="#2C3E50", linewidth=1.2,
        )
        ax.add_patch(rect)
        ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=9)

    for x1, x2, y in [(2.7, 3.8, 3.4), (6.2, 7.3, 3.4), (5.0, 5.0, 1.7)]:
        ax.annotate("", xy=(x2, y), xytext=(x1, y),
                    arrowprops=dict(arrowstyle="-|>", color="#2C3E50", lw=1.5))
    ax.text(3.25, 3.55, "UDP", fontsize=8, ha="center")
    ax.text(6.75, 3.55, "UDP", fontsize=8, ha="center")

    fig.savefig(ASSETS / "fig01_mimari.png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close()


def plot_sequence() -> None:
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis("off")

    ax.text(2, 6.5, "İstemci", ha="center", fontweight="bold")
    ax.text(8, 6.5, "Sunucu", ha="center", fontweight="bold")
    ax.plot([2, 2], [0.5, 6.2], color="#BDC3C7", linestyle="--", lw=1)
    ax.plot([8, 8], [0.5, 6.2], color="#BDC3C7", linestyle="--", lw=1)

    steps = [
        (5.8, "DATA (seq 0..n)", 2, 8, "#3498DB"),
        (5.2, "ACK", 8, 2, "#27AE60"),
        (4.6, "Timeout → Retransmit", 2, 8, "#E74C3C"),
        (4.0, "ACK", 8, 2, "#27AE60"),
        (3.4, "FIN + SHA256", 2, 8, "#3498DB"),
        (2.8, "ACK + doğrulama", 8, 2, "#27AE60"),
    ]
    for y, label, x1, x2, c in steps:
        ax.annotate("", xy=(x2, y), xytext=(x1, y),
                    arrowprops=dict(arrowstyle="-|>", color=c, lw=1.4))
        ax.text(5, y + 0.18, label, ha="center", fontsize=8,
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white", edgecolor="#DDD"))

    fig.savefig(ASSETS / "fig02_akis.png", dpi=200, bbox_inches="tight", facecolor="white")
    plt.close()


def plot_bar_chart(title: str, labels: list[str], values: list[float], ylabel: str, fname: str, fmt: str = ".3f") -> None:
    fig, ax = plt.subplots(figsize=(5.5, 3.2))
    colors = ["#3498DB", "#2ECC71", "#E67E22"][: len(labels)]
    bars = ax.bar(labels, values, color=colors, edgecolor="#2C3E50", linewidth=0.8)
    ax.set_title(title, fontweight="bold", pad=10)
    ax.set_ylabel(ylabel)
    for bar, v in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height(),
                format(v, fmt), ha="center", va="bottom", fontsize=9)
    fig.savefig(ASSETS / fname, dpi=200, bbox_inches="tight", facecolor="white")
    plt.close()


def plot_experiments() -> None:
    # Senaryo A — tamamlanma süresi
    s256 = load_summary("scenario_a_chunk_256")
    s1024 = load_summary("scenario_a_chunk_1024")
    s4096 = load_summary("scenario_a_chunk_4096")
    if s256 and s1024 and s4096:
        plot_bar_chart(
            "Senaryo A: Paket Boyutunun Etkisi (512 KB, kayıpsız)",
            ["256 B", "1024 B", "4096 B"],
            [
                s256["aggregate"]["completion_time_s"]["mean"],
                s1024["aggregate"]["completion_time_s"]["mean"],
                s4096["aggregate"]["completion_time_s"]["mean"],
            ],
            "Tamamlanma süresi (saniye)",
            "fig03_senaryo_a_sure.png",
        )
        plot_bar_chart(
            "Senaryo A: Throughput Karşılaştırması",
            ["256 B", "1024 B", "4096 B"],
            [
                s256["aggregate"]["throughput_bps"]["mean"] / 1e6,
                s1024["aggregate"]["throughput_bps"]["mean"] / 1e6,
                s4096["aggregate"]["throughput_bps"]["mean"] / 1e6,
            ],
            "Throughput (Mbps)",
            "fig04_senaryo_a_throughput.png",
            ".1f",
        )

    # Senaryo C
    s0 = load_summary("scenario_c_loss_0")
    s5 = load_summary("scenario_c_loss_5")
    s15 = load_summary("scenario_c_loss_15")
    if s0 and s5:
        labels, ct, rr = [], [], []
        for s, lb in [(s0, "%0"), (s5, "%5")]:
            labels.append(lb)
            ct.append(s["aggregate"]["completion_time_s"]["mean"])
            rr.append(s["aggregate"]["retransmission_rate"]["mean"])
        if s15 and s15.get("aggregate", {}).get("completion_time_s", {}).get("n", 0) > 0:
            labels.append("%15")
            ct.append(s15["aggregate"]["completion_time_s"]["mean"])
            rr.append(s15["aggregate"]["retransmission_rate"]["mean"])
        else:
            labels.append("%15 (başarısız)")
            ct.append(0)
            rr.append(0)

        plot_bar_chart(
            "Senaryo C: Kayıp Oranı — Tamamlanma Süresi (1 MB)",
            labels, ct, "Süre (saniye)", "fig05_senaryo_c_sure.png", ".1f",
        )
        plot_bar_chart(
            "Senaryo C: Kayıp Oranı — Yeniden Gönderim Oranı",
            labels, rr, "Retransmission rate", "fig06_senaryo_c_retrans.png", ".3f",
        )


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    plot_architecture()
    plot_sequence()
    plot_experiments()
    print(f"[assets] {len(list(ASSETS.glob('*.png')))} figures -> {ASSETS}")


if __name__ == "__main__":
    main()
