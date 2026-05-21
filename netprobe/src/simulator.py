#!/usr/bin/env python3
"""UDP proxy simulator with configurable loss and delay."""

from __future__ import annotations

import argparse
import random
import select
import socket
import sys
import time

import config


class UdpSimulator:
    def __init__(
        self,
        listen_port: int,
        forward_host: str,
        forward_port: int,
        loss_rate: float = 0.0,
        delay_ms: int = 0,
        drop_ack: bool = False,
        seed: int | None = None,
    ):
        self.listen_port = listen_port
        self.forward_addr = (forward_host, forward_port)
        self.loss_rate = loss_rate
        self.delay_ms = delay_ms / 1000.0
        self.drop_ack = drop_ack
        if seed is not None:
            random.seed(seed)

        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.sock.bind(("0.0.0.0", listen_port))
        self.client_addr: tuple[str, int] | None = None
        self.stats = {"forwarded": 0, "dropped": 0, "delayed": 0}

    def _should_drop(self, from_client: bool) -> bool:
        if from_client and random.random() < self.loss_rate:
            return True
        if not from_client and self.drop_ack and random.random() < self.loss_rate:
            return True
        return False

    def run(self) -> None:
        print(
            f"[simulator] listen={self.listen_port} -> {self.forward_addr[0]}:{self.forward_addr[1]} "
            f"loss={self.loss_rate:.2%} delay={self.delay_ms * 1000:.0f}ms drop_ack={self.drop_ack}"
        )
        try:
            while True:
                readable, _, _ = select.select([self.sock], [], [], 1.0)
                if not readable:
                    continue

                data, addr = self.sock.recvfrom(config.BUFFER_SIZE)
                from_client = self.client_addr is None or addr == self.client_addr

                if from_client:
                    self.client_addr = addr

                if self._should_drop(from_client):
                    self.stats["dropped"] += 1
                    continue

                if self.delay_ms > 0:
                    time.sleep(self.delay_ms)
                    self.stats["delayed"] += 1

                if from_client:
                    self.sock.sendto(data, self.forward_addr)
                elif self.client_addr:
                    self.sock.sendto(data, self.client_addr)

                self.stats["forwarded"] += 1

        except KeyboardInterrupt:
            print(f"\n[simulator] Stats: {self.stats}")


def main() -> None:
    parser = argparse.ArgumentParser(description="NetProbe UDP loss/delay simulator")
    parser.add_argument("--listen", type=int, default=9000)
    parser.add_argument("--forward-host", default="127.0.0.1")
    parser.add_argument("--forward", type=int, default=9001)
    parser.add_argument("--loss-rate", type=float, default=0.0)
    parser.add_argument("--delay-ms", type=int, default=0)
    parser.add_argument("--drop-ack", action="store_true")
    parser.add_argument("--seed", type=int, default=None)
    args = parser.parse_args()

    sim = UdpSimulator(
        listen_port=args.listen,
        forward_host=args.forward_host,
        forward_port=args.forward,
        loss_rate=args.loss_rate,
        delay_ms=args.delay_ms,
        drop_ack=args.drop_ack,
        seed=args.seed,
    )
    sim.run()


if __name__ == "__main__":
    main()
