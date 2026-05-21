# ITN v7 · Modül 1-9 Vize Soru Bankası

Bu site, **Introduction to Networks v7 (ITN)** dersi Modül 1'den 9'a kadar olan
tüm slaytlardan üretilmiş **çoktan seçmeli**, **boşluk doldurma** ve
**doğru/yanlış** sorularından oluşan bir etkileşimli soru bankasıdır.

## Özellikler
- 9 modülün (1-9) tüm alt konularından 400+ Türkçe soru.
- Konuya, türe göre filtreleme.
- İstenen konu / tür / soru sayısından **özel sınav oluşturma**.
- Yanıtları anında kontrol etme; açıklamalı çözüm.
- `localStorage` ile ilerleme kaydı.
- **Yanlışları gözden geçir** modu: daha önce yanlış yaptıklarınızı tekrar çözün.
- Açık, modern ve responsive arayüz.

## Çalıştırma
```bash
cd site
python3 -m http.server 8765
# Ardından tarayıcıda açın:
# http://localhost:8765/
```

## Kaynak
Tüm sorular yalnızca slayt içeriğine dayanır:
- Module 1: Networking Today
- Module 2: Basic Switch & End Device Configuration
- Module 3: Protocols and Models
- Module 4: Physical Layer
- Module 5: Number Systems
- Module 6: Data Link Layer
- Module 7: Ethernet Switching
- Module 8: Network Layer
- Module 9: Address Resolution

## Dosyalar
- `index.html` — Arayüz iskeleti
- `style.css` — Açık tema, responsive tasarım
- `questions.js` — Soru bankası (TOPICS, QUESTIONS, TOPIC_MODULE)
- `app.js` — Uygulama mantığı (filtre, sınav, skor, kalıcılık)
