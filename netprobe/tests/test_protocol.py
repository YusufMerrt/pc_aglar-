import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from protocol import (  # noqa: E402
    AckPacket,
    DataPacket,
    ErrPacket,
    FinPacket,
    decode_packet,
    encode_ack,
    encode_data,
    encode_err,
    encode_fin,
    verify_checksum,
)


def test_data_roundtrip():
    original = DataPacket(seq=3, total_pkts=10, payload=b"hello-world")
    raw = encode_data(original.seq, original.total_pkts, original.payload)
    decoded = decode_packet(raw)
    assert isinstance(decoded, DataPacket)
    assert decoded.seq == 3
    assert decoded.total_pkts == 10
    assert decoded.payload == b"hello-world"


def test_ack_roundtrip():
    raw = encode_ack(7)
    decoded = decode_packet(raw)
    assert isinstance(decoded, AckPacket)
    assert decoded.ack_num == 7


def test_fin_roundtrip():
    payload = b"\xab" * 32
    raw = encode_fin(9, 10, payload)
    decoded = decode_packet(raw)
    assert isinstance(decoded, FinPacket)
    assert decoded.seq == 9
    assert decoded.payload == payload


def test_err_roundtrip():
    raw = encode_err(2, "max retries exceeded")
    decoded = decode_packet(raw)
    assert isinstance(decoded, ErrPacket)
    assert decoded.seq == 2
    assert "retries" in decoded.message


def test_bad_checksum_rejected():
    raw = bytearray(encode_data(0, 1, b"x"))
    raw[11] ^= 0xFF
    assert decode_packet(bytes(raw)) is None
    assert not verify_checksum(bytes(raw))


def test_corrupted_payload_rejected():
    raw = bytearray(encode_data(0, 1, b"abc"))
    raw[-1] ^= 0x01
    assert decode_packet(bytes(raw)) is None
