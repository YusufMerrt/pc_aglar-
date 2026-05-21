# Subagent A — Protokol ve Çekirdek

## Ne yapıldı
- `src/protocol.py`: DATA, ACK, FIN, ERR paket encode/decode, CRC32 checksum
- `src/config.py`: PORT, CHUNK_SIZE, TIMEOUT_MS, MAX_RETRIES=5, WINDOW_SIZE=8
- `tests/test_protocol.py`: round-trip ve bozuk checksum testleri
- `docs/protocol.md`: byte layout ve akış

## Nasıl yapıldı
- Binary header `struct` ile paketlenir; checksum alanı sıfırlanarak hesaplanır.
- `decode_packet()` geçersiz checksum veya kısa paketi reddeder.

## Nasıl kullanılır
```python
from protocol import encode_data, decode_packet
raw = encode_data(0, 10, b"chunk")
pkt = decode_packet(raw)
```

## Test kanıtı
```bash
cd netprobe && python -m pytest tests/test_protocol.py -v
```

## Bilinen sınırlar
- Tek yönlü aktarım (client → server); metadata paketi yok, dosya adı client argümanından gelir.
