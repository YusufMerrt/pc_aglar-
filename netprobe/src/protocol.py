"""NetProbe application-layer protocol over UDP."""

from __future__ import annotations

import struct
import zlib
from dataclasses import dataclass
from typing import Optional, Union

PACKET_TYPE_DATA = 1
PACKET_TYPE_ACK = 2
PACKET_TYPE_FIN = 3
PACKET_TYPE_ERR = 4

DATA_HEADER_SIZE = 16
ACK_HEADER_SIZE = 9

Packet = Union["DataPacket", "AckPacket", "FinPacket", "ErrPacket"]


@dataclass
class DataPacket:
    seq: int
    total_pkts: int
    payload: bytes


@dataclass
class AckPacket:
    ack_num: int


@dataclass
class FinPacket:
    seq: int
    total_pkts: int
    payload: bytes


@dataclass
class ErrPacket:
    seq: int
    message: str


def compute_checksum(data: bytes) -> int:
    return zlib.crc32(data) & 0xFFFFFFFF


def _encode_data_like(
    ptype: int, seq: int, total_pkts: int, payload: bytes
) -> bytes:
    base = struct.pack("!BIIH", ptype, seq, total_pkts, len(payload))
    body_for_cksum = base + struct.pack("!I", 0) + b"\x00" + payload
    cksum = compute_checksum(body_for_cksum)
    return base + struct.pack("!I", cksum) + b"\x00" + payload


def encode_data(seq: int, total_pkts: int, payload: bytes) -> bytes:
    return _encode_data_like(PACKET_TYPE_DATA, seq, total_pkts, payload)


def encode_fin(seq: int, total_pkts: int, payload: bytes) -> bytes:
    return _encode_data_like(PACKET_TYPE_FIN, seq, total_pkts, payload)


def encode_err(seq: int, message: str) -> bytes:
    return _encode_data_like(PACKET_TYPE_ERR, seq, 0, message.encode("utf-8")[:512])


def encode_ack(ack_num: int) -> bytes:
    base = struct.pack("!BI", PACKET_TYPE_ACK, ack_num)
    cksum = compute_checksum(base + struct.pack("!I", 0))
    return base + struct.pack("!I", cksum)


def _verify_data_like(packet: bytes) -> bool:
    if len(packet) < DATA_HEADER_SIZE:
        return False
    payload_len = struct.unpack("!H", packet[9:11])[0]
    if len(packet) < DATA_HEADER_SIZE + payload_len:
        return False
    stored = struct.unpack("!I", packet[11:15])[0]
    rebuilt = packet[:11] + struct.pack("!I", 0) + b"\x00" + packet[DATA_HEADER_SIZE:]
    return stored == compute_checksum(rebuilt)


def verify_checksum(packet: bytes) -> bool:
    if len(packet) < 1:
        return False
    ptype = packet[0]
    if ptype == PACKET_TYPE_ACK:
        if len(packet) < ACK_HEADER_SIZE:
            return False
        base = packet[:5]
        stored = struct.unpack("!I", packet[5:9])[0]
        return stored == compute_checksum(base + struct.pack("!I", 0))
    return _verify_data_like(packet)


def decode_packet(data: bytes) -> Optional[Packet]:
    if len(data) < 1:
        return None

    ptype = data[0]

    if ptype == PACKET_TYPE_ACK:
        if len(data) < ACK_HEADER_SIZE or not verify_checksum(data):
            return None
        ack_num = struct.unpack("!I", data[1:5])[0]
        return AckPacket(ack_num=ack_num)

    if not _verify_data_like(data):
        return None

    _, seq, total_pkts, payload_len = struct.unpack("!BIIH", data[:11])
    payload = data[DATA_HEADER_SIZE : DATA_HEADER_SIZE + payload_len]

    if ptype == PACKET_TYPE_DATA:
        return DataPacket(seq=seq, total_pkts=total_pkts, payload=payload)
    if ptype == PACKET_TYPE_FIN:
        return FinPacket(seq=seq, total_pkts=total_pkts, payload=payload)
    if ptype == PACKET_TYPE_ERR:
        return ErrPacket(seq=seq, message=payload.decode("utf-8", errors="replace"))

    return None
