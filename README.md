# Ufkumuz Yıldızlar

Minik Dahiler takımının TEKNOFEST 2026 projesidir.

Tarayıcıda 3B Güneş Sistemi açılır. Gezegenlere bakılır, Proje Etkinlikleri ile tahmin edilip izlenir.

Canlı yayın: https://huseyinsihat.github.io/ufkumuzyildizlar/

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:5173/ adresini aç. `index.html` dosyasını doğrudan açma.

```bash
npm test
npm run build
```

React, TypeScript, Vite, Three.js. Gezegen verileri NASA Planetary Fact Sheet kaynaklıdır.

DeneyapKart isteğe bağlıdır. Kart yokken proje aynı çalışır. USB için Chrome veya Edge ve Takım panelindeki bağlantı yeter. Firmware: `firmware/deneyapkart/ufkumuz.ino`.
