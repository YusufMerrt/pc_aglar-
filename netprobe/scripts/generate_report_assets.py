#!/usr/bin/env python3
"""Generate comprehensive academic figures for NetProbe technical report."""

from __future__ import annotations

import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "docs" / "report_assets"
RESULTS = ROOT / "experiments" / "results"

PALETTE = ["#2E86AB", "#A23B72", "#F18F01", "#C73E1D", "#3B1F2B", "#95C623"]
plt.rcParams.update({
    "font.family": "sans-serif",
    "font.size": 10,
    "axes.titlesize": 11,
    "axes.labelsize": 10,
    "figure.facecolor": "white",
    "axes.facecolor": "white",
    "axes.grid": True,
    "grid.alpha": 0.35,
    "axes.spines.top": False,
    "axes.spines.right": False,
})


def load_summary(name: str) -> dict | None:
    path = RESULTS / f"{name}_summary.json"
    if not path.exists():
        return None
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def agg_mean(summary: dict | None, key: str, default: float = 0.0) -> float:
    if not summary:
        return default
    return summary.get("aggregate", {}).get(key, {}).get("mean", default)


def plot_architecture() -> None:
    fig, ax = plt.subplots(figsize=(7.5, 3.8))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 5)
    ax.axis("off")
    boxes = [
        (0.3, 2.8, 2.4, 1.2, "İstemci\nclient.py / sender.py", "#D6EAF8"),
        (3.8, 2.8, 2.4, 1.2, "Simülatör\nkayıp & gecikme", "#FCF3CF"),
        (7.3, 2.8, 2.4, 1.2, "Sunucu\nserver.py / receiver.py", "#D5F5E3"),
        (3.8, 0.5, 2.4, 1.0, "Analiz\nlogger / metrics / analyze", "#E8DAEF"),
    ]
    for x, y, w, h, text, color in boxes:
        ax.add_patch(mpatches.FancyBboxPatch(
            (x, y), w, h, boxstyle="round,pad=0.02,rounding_size=0.08",
            facecolor=color, edgecolor="#2C3E50", linewidth=1.2))
        ax.text(x + w / 2, y + h / 2, text, ha="center", va="center", fontsize=9)
    for x1, x2, y in [(2.7, 3.8, 3.4), (6.2, 7.3, 3.4), (5.0, 5.0, 1.6)]:
        ax.annotate("", xy=(x2, y), xytext=(x1, y),
                    arrowprops=dict(arrowstyle="-|>", color="#2C3E50", lw=1.5))
    fig.savefig(ASSETS / "fig01_mimari.png", dpi=200, bbox_inches="tight")
    plt.close()


def plot_sequence() -> None:
    fig, ax = plt.subplots(figsize=(7.5, 4.2))
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 7)
    ax.axis("off")
    ax.text(2, 6.5, "İstemci", ha="center", fontweight="bold")
    ax.text(8, 6.5, "Sunucu", ha="center", fontweight="bold")
    ax.plot([2, 2], [0.5, 6.2], color="#BDC3C7", linestyle="--")
    ax.plot([8, 8], [0.5, 6.2], color="#BDC3C7", linestyle="--")
    for y, label, x1, x2, c in [
        (5.8, "DATA (seq 0..n)", 2, 8, "#3498DB"),
        (5.2, "ACK", 8, 2, "#27AE60"),
        (4.6, "Timeout → Retransmit", 2, 8, "#E74C3C"),
        (4.0, "ACK", 8, 2, "#27AE60"),
        (3.4, "FIN + SHA256", 2, 8, "#3498DB"),
        (2.8, "ACK + hash doğrulama", 8, 2, "#27AE60"),
    ]:
        ax.annotate("", xy=(x2, y), xytext=(x1, y),
                    arrowprops=dict(arrowstyle="-|>", color=c, lw=1.4))
        ax.text(5, y + 0.18, label, ha="center", fontsize=8,
                bbox=dict(boxstyle="round,pad=0.3", facecolor="white", edgecolor="#DDD"))
    fig.savefig(ASSETS / "fig02_akis.png", dpi=200, bbox_inches="tight")
    plt.close()


def _bar_ax(ax, labels, values, title, ylabel, fmt=".3f", colors=None):
    colors = colors or PALETTE[: len(labels)]
    bars = ax.bar(labels, values, color=colors, edgecolor="#2C3E50", linewidth=0.7)
    ax.set_title(title, fontweight="bold", fontsize=10)
    ax.set_ylabel(ylabel)
    for bar, v in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height(),
                format(v, fmt), ha="center", va="bottom", fontsize=8)


def scenario_a_charts() -> None:
    keys = ["scenario_a_chunk_256", "scenario_a_chunk_1024", "scenario_a_chunk_4096"]
    summaries = [load_summary(k) for k in keys]
    if not all(summaries):
        return
    labels = ["256 B", "1024 B", "4096 B"]

    fig, axes = plt.subplots(2, 2, figsize=(9, 6))
    fig.suptitle("Senaryo A: Paket Boyutu Etkisi (512 KB, kayıpsız, 3 tekrar)", fontweight="bold", y=1.02)
    metrics = [
        ("completion_time_s", "Tamamlanma (s)", ".3f"),
        ("throughput_bps", "Throughput (Mbps)", ".1f", 1e6),
        ("avg_rtt_ms", "Ort. RTT (ms)", ".2f", 1),
        ("packets_sent", "Gönderilen paket", ".0f", 1),
    ]
    for ax, (key, ylab, fmt, *div) in zip(axes.flat, metrics):
        div = div[0] if div else 1
        vals = [agg_mean(s, key) / div for s in summaries]
        if key == "packets_sent":
            vals = [s["runs"][0]["metrics"].get("packets_sent", 0) for s in summaries if s]
        _bar_ax(ax, labels, vals, ylab, ylab.split("(")[0].strip(), fmt)
    plt.tight_layout()
    fig.savefig(ASSETS / "fig03_senaryo_a_dashboard.png", dpi=200, bbox_inches="tight")
    plt.close()

    # Line: chunk size vs time (inverse relationship)
    fig, ax = plt.subplots(figsize=(6, 3.5))
    sizes = [256, 1024, 4096]
    cts = [agg_mean(s, "completion_time_s") for s in summaries]
    ax.plot(sizes, cts, "o-", color=PALETTE[0], linewidth=2, markersize=10)
    ax.set_xscale("log", base=2)
    ax.set_xlabel("Chunk boyutu (byte)")
    ax.set_ylabel("Tamamlanma süresi (s)")
    ax.set_title("Chunk Boyutu vs Aktarım Süresi", fontweight="bold")
    fig.savefig(ASSETS / "fig04_senaryo_a_chunk_line.png", dpi=200, bbox_inches="tight")
    plt.close()


def scenario_b_charts() -> None:
    configs = [
        ("200 ms", "scenario_b_timeout_200"),
        ("500 ms", "scenario_b_timeout_500"),
        ("2000 ms", "scenario_b_timeout_2000"),
    ]
    summaries = [(lb, load_summary(k)) for lb, k in configs]
    summaries = [(lb, s) for lb, s in summaries if s]
    if len(summaries) < 2:
        return
    labels = [lb for lb, _ in summaries]
    data = [s for _, s in summaries]

    fig, axes = plt.subplots(1, 3, figsize=(10, 3.5))
    fig.suptitle("Senaryo B: Timeout Etkisi (%5 kayıp, 1 MB)", fontweight="bold", y=1.05)
    for ax, key, ylab, fmt, div in zip(
        axes,
        ["completion_time_s", "retransmission_rate", "avg_rtt_ms"],
        ["Süre (s)", "Retrans. oranı", "RTT (ms)"],
        [".1f", ".3f", ".2f"],
        [1, 1, 1],
    ):
        _bar_ax(ax, labels, [agg_mean(s, key) / div for s in data], ylab, ylab, fmt)
    plt.tight_layout()
    fig.savefig(ASSETS / "fig05_senaryo_b_timeout.png", dpi=200, bbox_inches="tight")
    plt.close()


def scenario_c_charts() -> None:
    items = [
        ("%0", "scenario_c_loss_0"),
        ("%5", "scenario_c_loss_5"),
        ("%15", "scenario_c_loss_15"),
    ]
    labels, summaries = [], []
    for lb, key in items:
        s = load_summary(key)
        if s:
            labels.append(lb)
            summaries.append(s)

    if len(summaries) < 2:
        return

    loss_pct = [0, 5, 15][: len(summaries)]
    fig, axes = plt.subplots(2, 2, figsize=(9, 6))
    fig.suptitle("Senaryo C: Yapay Paket Kaybı (1 MB, simülatör)", fontweight="bold", y=1.02)

    plots = [
        ("completion_time_s", "Tamamlanma (s)", ".1f", 1),
        ("retransmission_rate", "Retrans. oranı", ".3f", 1),
        ("throughput_bps", "Goodput (Mbps)", ".2f", 1e6),
        ("packet_loss_rate", "Timeout oranı", ".3f", 1),
    ]
    for ax, (key, ylab, fmt, div) in zip(axes.flat, plots):
        vals = [agg_mean(s, key) / div for s in summaries]
        _bar_ax(ax, labels, vals, ylab, ylab, fmt)

    plt.tight_layout()
    fig.savefig(ASSETS / "fig06_senaryo_c_dashboard.png", dpi=200, bbox_inches="tight")
    plt.close()

    # Line chart: loss vs completion time
    fig, ax1 = plt.subplots(figsize=(6.5, 3.8))
    ct = [agg_mean(s, "completion_time_s") for s in summaries]
    rr = [agg_mean(s, "retransmission_rate") for s in summaries]
    ax1.plot(loss_pct, ct, "s-", color=PALETTE[0], linewidth=2, markersize=10, label="Tamamlanma (s)")
    ax1.set_xlabel("Kayıp oranı (%)")
    ax1.set_ylabel("Tamamlanma süresi (s)", color=PALETTE[0])
    ax2 = ax1.twinx()
    ax2.plot(loss_pct, rr, "o--", color=PALETTE[3], linewidth=2, markersize=8, label="Retrans. oranı")
    ax2.set_ylabel("Retransmission rate", color=PALETTE[3])
    ax1.set_title("Kayıp Oranı — Süre ve Retransmit İlişkisi", fontweight="bold")
    lines1, lab1 = ax1.get_legend_handles_labels()
    lines2, lab2 = ax2.get_legend_handles_labels()
    ax1.legend(lines1 + lines2, lab1 + lab2, loc="upper left", fontsize=8)
    fig.savefig(ASSETS / "fig07_senaryo_c_loss_line.png", dpi=200, bbox_inches="tight")
    plt.close()


def scenario_d_charts() -> None:
    items = [
        ("100 KB", "scenario_d_file_100k"),
        ("5 MB", "scenario_d_file_5m"),
        ("50 MB", "scenario_d_file_50m"),
    ]
    labels, summaries = [], []
    for lb, key in items:
        s = load_summary(key)
        if s and s.get("aggregate", {}).get("completion_time_s", {}).get("n", 0) > 0:
            labels.append(lb)
            summaries.append(s)
    if not summaries:
        return

    fig, axes = plt.subplots(1, 3, figsize=(10, 3.5))
    fig.suptitle("Senaryo D: Dosya Boyutu Etkisi (kayıpsız)", fontweight="bold", y=1.05)
    for ax, key, ylab, fmt, div in zip(
        axes,
        ["completion_time_s", "throughput_bps", "packets_sent"],
        ["Süre (s)", "Throughput (Mbps)", "Paket sayısı"],
        [".2f", ".1f", ".0f"],
        [1, 1e6, 1],
    ):
        if key == "packets_sent":
            vals = [s["runs"][0]["metrics"].get("packets_sent", 0) for s in summaries]
        else:
            vals = [agg_mean(s, key) / div for s in summaries]
        _bar_ax(ax, labels, vals, ylab, ylab, fmt)
    plt.tight_layout()
    fig.savefig(ASSETS / "fig08_senaryo_d_filesize.png", dpi=200, bbox_inches="tight")
    plt.close()


def plot_summary_comparison() -> None:
    """Cross-scenario overview of completion times."""
    scenarios = []
    for name, label in [
        ("scenario_a_chunk_256", "A: 256B"),
        ("scenario_a_chunk_1024", "A: 1024B"),
        ("scenario_a_chunk_4096", "A: 4096B"),
        ("scenario_b_timeout_200", "B: T=200ms"),
        ("scenario_b_timeout_500", "B: T=500ms"),
        ("scenario_c_loss_0", "C: %0"),
        ("scenario_c_loss_5", "C: %5"),
        ("scenario_d_file_100k", "D: 100KB"),
        ("scenario_d_file_5m", "D: 5MB"),
    ]:
        s = load_summary(name)
        if s and agg_mean(s, "completion_time_s") > 0:
            scenarios.append((label, agg_mean(s, "completion_time_s")))

    if len(scenarios) < 3:
        return

    labels, vals = zip(*scenarios)
    fig, ax = plt.subplots(figsize=(9, 4))
    ypos = np.arange(len(labels))
    bars = ax.barh(ypos, vals, color=PALETTE[0], alpha=0.85, edgecolor="#2C3E50")
    ax.set_yticks(ypos)
    ax.set_yticklabels(labels, fontsize=9)
    ax.set_xlabel("Tamamlanma süresi (saniye)")
    ax.set_title("Tüm Senaryolar — Tamamlanma Süresi Karşılaştırması", fontweight="bold")
    for bar, v in zip(bars, vals):
        ax.text(v + max(vals) * 0.02, bar.get_y() + bar.get_height() / 2,
                f"{v:.2f}s", va="center", fontsize=8)
    fig.savefig(ASSETS / "fig09_genel_karsilastirma.png", dpi=200, bbox_inches="tight")
    plt.close()


def plot_metrics_radar_style() -> None:
    """Grouped: goodput vs retrans for key scenarios."""
    data = []
    for name, label in [
        ("scenario_a_chunk_1024", "A-1024"),
        ("scenario_c_loss_0", "C-0%"),
        ("scenario_c_loss_5", "C-5%"),
        ("scenario_b_timeout_500", "B-500ms"),
    ]:
        s = load_summary(name)
        if s:
            data.append((label, agg_mean(s, "goodput_bps") / 1e6, agg_mean(s, "retransmission_rate")))

    if len(data) < 2:
        return

    labels = [d[0] for d in data]
    goodput = [d[1] for d in data]
    retrans = [d[2] for d in data]

    x = np.arange(len(labels))
    w = 0.35
    fig, ax1 = plt.subplots(figsize=(8, 4))
    ax1.bar(x - w / 2, goodput, w, label="Goodput (Mbps)", color=PALETTE[0])
    ax1.set_ylabel("Goodput (Mbps)")
    ax2 = ax1.twinx()
    ax2.bar(x + w / 2, retrans, w, label="Retrans. oranı", color=PALETTE[3], alpha=0.8)
    ax2.set_ylabel("Retransmission rate")
    ax1.set_xticks(x)
    ax1.set_xticklabels(labels)
    ax1.set_title("Seçili Senaryolar — Goodput vs Retransmission", fontweight="bold")
    ax1.legend(loc="upper left", fontsize=8)
    ax2.legend(loc="upper right", fontsize=8)
    fig.savefig(ASSETS / "fig10_goodput_retrans.png", dpi=200, bbox_inches="tight")
    plt.close()


def export_results_table_csv() -> None:
    rows = []
    for path in sorted(RESULTS.glob("*_summary.json")):
        with open(path, encoding="utf-8") as f:
            d = json.load(f)
        agg = d.get("aggregate", {})
        cfg = d.get("config", {})
        success = sum(1 for r in d.get("runs", []) if r.get("success"))
        total = len(d.get("runs", []))
        rows.append({
            "senaryo": cfg.get("name", path.stem),
            "aciklama": cfg.get("description", ""),
            "basari": f"{success}/{total}",
            "sure_s": agg.get("completion_time_s", {}).get("mean"),
            "throughput_mbps": (agg.get("throughput_bps", {}).get("mean") or 0) / 1e6,
            "retrans": agg.get("retransmission_rate", {}).get("mean"),
            "rtt_ms": agg.get("avg_rtt_ms", {}).get("mean"),
        })
    out = ASSETS / "deney_sonuclari.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(rows, f, indent=2, ensure_ascii=False)


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    plot_architecture()
    plot_sequence()
    scenario_a_charts()
    scenario_b_charts()
    scenario_c_charts()
    scenario_d_charts()
    plot_summary_comparison()
    plot_metrics_radar_style()
    export_results_table_csv()
    n = len(list(ASSETS.glob("fig*.png")))
    print(f"[assets] {n} figures -> {ASSETS}")


if __name__ == "__main__":
    main()
