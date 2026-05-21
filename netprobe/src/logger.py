"""JSONL event logger for NetProbe transfers."""

from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any, Optional


class EventLogger:
    def __init__(self, log_path: Optional[Path] = None):
        self.log_path = Path(log_path) if log_path else None
        self.events: list[dict[str, Any]] = []
        if self.log_path:
            self.log_path.parent.mkdir(parents=True, exist_ok=True)

    def log(self, event: str, **fields: Any) -> None:
        record = {"t": time.time(), "event": event, **fields}
        self.events.append(record)
        if self.log_path:
            with open(self.log_path, "a", encoding="utf-8") as f:
                f.write(json.dumps(record) + "\n")

    def send(self, seq: int, bytes_count: int) -> None:
        self.log("send", seq=seq, bytes=bytes_count)

    def ack_received(self, seq: int, rtt_ms: float) -> None:
        self.log("ack_received", seq=seq, rtt_ms=round(rtt_ms, 3))

    def timeout(self, seq: int) -> None:
        self.log("timeout", seq=seq)

    def retransmit(self, seq: int, attempt: int) -> None:
        self.log("retransmit", seq=seq, attempt=attempt)

    def transfer_complete(self, **fields: Any) -> None:
        self.log("transfer_complete", **fields)

    def error(self, message: str, **fields: Any) -> None:
        self.log("error", message=message, **fields)
