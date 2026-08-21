# Ufkumuz Yıldızlar

Minik Dahiler takımının **TEKNOFEST 2026** tarayıcı tabanlı 3B Güneş Sistemi öğrenme projesi.

Canlı yayın: https://huseyinsihat.github.io/ufkumuzyildizlar/

## Yerelde çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda **http://localhost:5173/** adresini aç. `index.html` dosyasını doğrudan açma.

```bash
npm test
npm run build
```

## Teknoloji

React, TypeScript, Vite, Three.js, Zustand, astronomy-engine.

Gezegen verileri NASA Planetary Fact Sheet kaynaklıdır.

## DeneyapKart

Kart takılı değilken proje aynı çalışır. USB ile bağlamak için **Takım** panelindeki **DeneyapKart Bağlantı Bilgileri** bölümünü kullan (Chrome veya Edge).

Firmware: `firmware/deneyapkart/ufkumuz.ino` — Arduino IDE’de kart olarak Deneyap Kart 1A seç, 115200 baud. Tuşlar `INPUT_PULLUP`; bir uç pine, diğer uç GND.

Satır protokolü: `P:earth`, `F:play`, `F:day`, `F:year`, `F:now`, `F:overview`, `F:orbits`.

## Dokular

Dünya / Ay yüzey görselleri three.js örnek dokularından; diğer gezegen haritaları threex.planets; gece ışıkları three-globe örneğindendir. Dosyalar yüklenemezse prosedürel yedek kullanılır.
