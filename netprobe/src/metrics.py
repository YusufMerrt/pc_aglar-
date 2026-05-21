"""Performance metrics computation for NetProbe."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from logger import EventLogger

# goodput = successfully delivered file bytes / wall-clock transfer time (seconds)


def compute_metrics(
    logger: EventLogger,
    file_bytes: int,
    start_time: float,
    end_time: float,
) -> dict[str, Any]:
    events = logger.events
    duration = max(end_time - start_time, 1e-9)

    sends = [e for e in events if e["event"] == "send"]
    acks = [e for e in events if e["event"] == "ack_received"]
    timeouts = [e for e in events if e["event"] == "timeout"]
    retransmits = [e for e in events if e["event"] == "retransmit"]

    total_sent = len(sends)
    total_acks = len(acks)
    total_timeouts = len(timeouts)
    total_retransmits = len(retransmits)

    rtts = [e.get("rtt_ms", 0) for e in acks if "rtt_ms" in e]
    avg_rtt_ms = sum(rtts) / len(rtts) if rtts else 0.0

    throughput_bps = (file_bytes * 8) / duration
    goodput_bps = (file_bytes * 8) / duration

    packet_loss_rate = (
        total_timeouts / total_sent if total_sent else 0.0
    )
    retransmission_rate = (
        total_retransmits / total_sent if total_sent else 0.0
    )

    return {
        "file_bytes": file_bytes,
        "completion_time_s": round(duration, 4),
        "throughput_bps": round(throughput_bps, 2),
        "goodput_bps": round(goodput_bps, 2),
        "goodput_definition": "file_bytes * 8 / completion_time_s",
        "packet_loss_rate": round(packet_loss_rate, 4),
        "retransmission_rate": round(retransmission_rate, 4),
        "avg_rtt_ms": round(avg_rtt_ms, 3),
        "packets_sent": total_sent,
        "acks_received": total_acks,
        "timeouts": total_timeouts,
        "retransmits": total_retransmits,
    }


def save_metrics(metrics: dict[str, Any], path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2)
