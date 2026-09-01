# Ufkumuz Yıldızlar

**Minik Dahiler** takımının **TEKNOFEST 2026** projesidir.  
Kategori: Astronomi, Uzay Bilimleri ve Havacılık.

Tarayıcıda 3B Güneş Sistemi açılır. Gezegenleri keşfet, Proje Etkinlikleri ile öğren, Güneş’e sor.

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

Uygulama, kart olmadan da çalışır. USB ile Deneyap Kart 1A takılıysa Chrome veya Edge kartı kendiliğinden tanır. İlk kez eşlemek için **Kart → Bağlan**’a bas.

Yazılım: `firmware/deneyapkart/ufkumuz.ino`  
Arduino IDE’de kart: **Deneyap Kart 1A**. Baud: 115200.

| Pin | Tuş |
| --- | --- |
| D0–D8 | Güneş … Neptün |
| D9 | Oynat / Duraklat |
| D10 | Proje Etkinlikleri |
| D11 | Olaylar (açıkken sonraki olay) |
| D12 | Yıldızlar (açıkken sonraki yıldız) |
| D13 | Takım |
| D14 | Ayarlar |
| D15 | Geri (yoksa Güneş Sistemi bakışı) |
| A0 | Hız (1 sn → 1 saat → 1 gün → 1 yıl) |
| A1 | Güneş’e Sor (isteğe bağlı) |
| A2 | Karşılaştır (isteğe bağlı) |
| IMU | Kartı eğin, bakış döner |
