# Subagent C — İstemci

## Ne yapıldı
- `sender.py`: Sliding window (varsayılan 8), timeout, max 5 retransmit
- `client.py`: CLI (--host, --port, --file, --chunk-size, --timeout, --window)

## Nasıl yapıldı
- `base` ilk onaylanmamış seq; pencere içi paketler paralel gönderilir
- Timeout sonrası retransmit; 5 denemeden sonra hata
- FIN paketi dosya hash + dosya adı içerir

## Nasıl kullanılır
```bash
export PYTHONPATH=src
python src/client.py --host 127.0.0.1 --port 9001 --file test.bin
```

## Test kanıtı
E2E smoke test.

## Bilinen sınırlar
- Tek yönlü aktarım (client → server)
