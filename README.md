# Ufkumuz Yıldızlar

**Minik Dahiler** takımının **TEKNOFEST 2026** projesidir.  
Kategori: Astronomi, Uzay Bilimleri ve Havacılık.

Tarayıcıda 3B Güneş Sistemi açılır. Gezegenleri gez, Proje Etkinlikleri ile öğren, Güneş’e sor.

Canlı site: https://huseyinsihat.github.io/ufkumuzyildizlar/

Bilgisayar, tablet ve telefonda aynı adresten açılır.

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:5173/ adresini aç.

```bash
npm test
npm run build
```

## Deneyap Kart

Sahne, kart olmadan da çalışır. USB ile Deneyap Kart 1A takılıysa Chrome veya Edge kartı kendiliğinden tanır. İlk kez eşlemek için **Takım**’a bir kez bas.

Yazılım: `firmware/deneyapkart/ufkumuz.ino`  
Arduino IDE’de kart: **Deneyap Kart 1A**. Baud: 115200.

| Pin | Tuş |
| --- | --- |
| D0–D8 | Güneş … Neptün |
| D9 | Oynat / Duraklat |
| D10 | Proje Etkinlikleri |
| D11 | Karşılaştır |
| D12 | Gezegenler |
| D13 | Yıldızlar |
| D14 | Bilgiler |
| A0 | Hız (1 saniye → 1 yıl) |
| IMU | Kartı eğin, bakış döner |
