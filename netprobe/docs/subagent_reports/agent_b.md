# Subagent B — Sunucu

## Ne yapıldı
- `receiver.py`: Selective Repeat alıcı, duplicate filtreleme, SHA256 doğrulama
- `server.py`: UDP dinleme, FIN sonrası dosya birleştirme

## Nasıl yapıldı
- Gelen DATA paketleri `chunks` dict’inde seq ile saklanır
- Duplicate seq → ACK tekrar, diske yazılmaz
- FIN payload: 32 byte hash + UTF-8 dosya adı

## Nasıl kullanılır
```bash
export PYTHONPATH=src
python src/server.py --port 9001 --out-dir received/
```

## Test kanıtı
E2E smoke test ile doğrulanır (`scripts/smoke_test.py`).

## Bilinen sınırlar
- Tek dosya oturumu; ardışık transferler FIN sonrası state sıfırlanır
