# NetProbe Protokol Spesifikasyonu

UDP üzerinde uygulama katmanı güvenilir dosya aktarım protokolü.

## Paket Türleri

| Tür | Kod | Açıklama |
|-----|-----|----------|
| DATA | 1 | Dosya parçası |
| ACK | 2 | Onay |
| FIN | 3 | Aktarım sonu (dosya hash) |
| ERR | 4 | Hata bildirimi |

## DATA / FIN / ERR Başlığı (16 byte)

| Alan | Boyut | Açıklama |
|------|-------|----------|
| type | 1 | Paket türü |
| seq | 4 | Sıra numarası (unsigned) |
| total_pkts | 4 | Toplam paket sayısı |
| payload_len | 2 | Payload uzunluğu |
| checksum | 4 | CRC32 |
| reserved | 1 | 0 |

Checksum: `base (11 byte) + checksum(0) + reserved(0) + payload` üzerinden CRC32.

## ACK Başlığı (9 byte)

| Alan | Boyut |
|------|-------|
| type | 1 |
| ack_num | 4 |
| checksum | 4 |

## Akış

1. Client DATA paketlerini sliding window ile gönderir.
2. Server her geçerli DATA için ACK döner; duplicate'te tekrar ACK, diske yazmaz.
3. Tüm parçalar gelince server dosyayı birleştirir.
4. Client FIN ile SHA256 hash gönderir; server doğrular.

## Varsayılan Parametreler

- `MAX_RETRIES`: 5
- `WINDOW_SIZE`: 8
- `CHUNK_SIZE`: 1024 byte
- `TIMEOUT_MS`: 1000 ms
