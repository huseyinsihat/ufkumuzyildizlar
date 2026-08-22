# Ufkumuz Yıldızlar — Seslendirme paketi

Bu dosya, uygulamadaki kısa sesleri kaydetmek içindir. Okumakta zorlanan arkadaşlarımız gezegeni veya etkinliği **kulağıyla** anlasın diye yazıldı.

Arayüz Türkçe kalır. Ses Türkçe veya İngilizce olabilir. Her kartta iki dil vardır; **ikisini de** kaydet.

Toplam **39 metin × 2 dil = 78 kayıt**. Her kayıt 1–2 cümle, yaklaşık 4–10 saniye.

---

## Nasıl kaydedilir

1. Sessiz bir oda seç. Televizyon, vantilatör, kardeş sesi olmasın.
2. Telefonu masaya koy, ağza 20–30 cm uzak tut.
3. Önce bir kez sessiz oku, sonra kaydet.
4. Yavaş ve net konuş. Bağırma. Fısıldama.
5. Cümlenin başında bir saniye bekle, bitince bir saniye bekle. Kesme.
6. Yanlış olursa sil, yeniden çek. Gülme, öksürük, “eee” olmasın.
7. Dosya adını **tam** yaz. Büyük-küçük harf önemli.

Telefon çoğu zaman `m4a` veya `aac` kaydeder. Olur. Teslimden sonra `mp3` yapılır. Şimdilik ad doğru olsun yeter.

## Dosya kuralı

Kayıtlar uygulamada şöyle duracak:

- Türkçe: `tr-KOD.mp3`
- İngilizce: `en-KOD.mp3`

Örnek: Dünya kartı → `tr-body-earth.mp3` ve `en-body-earth.mp3`

Klasör: `public/audio/`

Bir kayıt yoksa uygulama susar. Parça parça teslim edilebilir.

## Kim ne okur

Takım: Minik Dahiler. Herkes hem Türkçe hem İngilizce okur.

| Kim | Kodlar | Kayıt sayısı |
| --- | --- | --- |
| Hadiye Tombuloğlu | `intro-welcome`, `intro-lead`, `intro-lab`, `intro-explore`, `intro-team`, `mode-explore`, `mode-lab` | 7 × 2 = 14 |
| Reyyan Aksen | `body-mercury`, `body-venus`, `body-earth`, `body-moon`, `ui-planets`, `ui-overview` | 6 × 2 = 12 |
| Hamza Büyükkaya | `body-sun`, `body-mars`, `body-jupiter`, `ui-stars`, `ui-facts` | 5 × 2 = 10 |
| Neva Özdemir | `body-saturn`, `body-uranus`, `body-neptune`, `body-pluto`, `ui-compare`, `ui-team` | 6 × 2 = 12 |
| Nisa Altun | `lab-predict`, `lab-watch`, `lab-why`, `lab-done`, `room-motion`, `room-earth`, `room-gravity` | 7 × 2 = 14 |
| Çınar Efe Çetin | `room-scale`, `room-build`, `room-sky`, `activity-arrange-orbits`, `activity-moon-phases`, `activity-closest-hottest`, `activity-drop-ball`, `activity-who-faster` | 8 × 2 = 16 |

İngilizce adlar: Mercury, Venus, Earth, Moon, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto.

Türkçe adlar: Merkür, Venüs, Dünya, Ay, Mars, Jüpiter, Satürn, Uranüs, Neptün, Plüton.

---

## Metin kartları

### Açılış ve tanıtım

#### intro-welcome

Dosya: `tr-intro-welcome.mp3` / `en-intro-welcome.mp3`  
Ne zaman: Uygulama açılınca, ilk dokunuştan sonra

TR: Hoş geldin. Burası Ufkumuz Yıldızlar. Minik Dahiler’in Güneş Sistemi projesi.

EN: Welcome. This is Our Horizon, the Stars. The Little Geniuses’ Solar System project.

#### intro-lead

Dosya: `tr-intro-lead.mp3` / `en-intro-lead.mp3`  
Ne zaman: Hoş geldinden hemen sonra, hâlâ ana ekrandaysan

TR: Güneş Sistemini canlı izle. Döndür, hızlandır, nedenini gör.

EN: Watch the Solar System move. Turn it, speed it up, and see why.

#### intro-lab

Dosya: `tr-intro-lab.mp3` / `en-intro-lab.mp3`  
Ne zaman: Ana ekranda Proje Etkinlikleri’ne basınca

TR: Proje Etkinlikleri. Tahmin et, izle, nedenini gör.

EN: Project Activities. Guess, watch, then see why.

#### intro-explore

Dosya: `tr-intro-explore.mp3` / `en-intro-explore.mp3`  
Ne zaman: Ana ekranda Güneş Sistemini gez’e basınca

TR: Güneş Sistemini gez. Gezegenlere dokun, yaklaş, bak.

EN: Explore the Solar System. Tap a planet, fly closer, and look.

#### intro-team

Dosya: `tr-intro-team.mp3` / `en-intro-team.mp3`  
Ne zaman: Ana ekranda Takım’a basınca

TR: Takım. Bizi Minik Dahiler yaptı. TEKNOFEST iki bin yirmi altı.

EN: The team. We are the Little Geniuses. TEKNOFEST two thousand twenty-six.

### Gezinme

#### mode-explore

Dosya: `tr-mode-explore.mp3` / `en-mode-explore.mp3`  
Ne zaman: Etkinliklerden keşfe dönünce

TR: Keşif. Gezegenlere bak. Aşağıdaki düğmeler sana yol gösterir.

EN: Explore. Look at the planets. The buttons below will help you.

#### mode-lab

Dosya: `tr-mode-lab.mp3` / `en-mode-lab.mp3`  
Ne zaman: Keşiften Proje Etkinlikleri’ne girince

TR: Proje Etkinlikleri. Bir oda seç, ya da hızlı başla ile dene.

EN: Project Activities. Pick a room, or start with a quick challenge.

#### ui-planets

Dosya: `tr-ui-planets.mp3` / `en-ui-planets.mp3`  
Ne zaman: Gezegenler listesi açılınca

TR: Gezegenler. Birinin adına dokun, kamera oraya gider.

EN: Planets. Tap a name and the camera flies there.

#### ui-stars

Dosya: `tr-ui-stars.mp3` / `en-ui-stars.mp3`  
Ne zaman: Yıldızlar listesi açılınca

TR: Yıldızlar. Güneş’ten başka yıldızlar da var. Birine dokun.

EN: Stars. There are other stars besides the Sun. Tap one.

#### ui-facts

Dosya: `tr-ui-facts.mp3` / `en-ui-facts.mp3`  
Ne zaman: Bilgiler paneli açılınca

TR: Bilgiler. Kısa kartlar. Okumak zor gelirse bir gezegene dokun, ses anlatır.

EN: Facts. Short cards. If reading is hard, tap a planet and the voice will tell you.

#### ui-compare

Dosya: `tr-ui-compare.mp3` / `en-ui-compare.mp3`  
Ne zaman: Karşılaştır paneli açılınca

TR: Karşılaştır. İki gezegeni yan yana gör: büyük mü, ağır mı, yılı uzun mu?

EN: Compare. Put two planets side by side. Who is bigger, heavier, or slower around the Sun?

#### ui-team

Dosya: `tr-ui-team.mp3` / `en-ui-team.mp3`  
Ne zaman: Takım paneli açılınca

TR: Takımımız Minik Dahiler. Danışmanımız Hüseyin Sıhat.

EN: Our team is the Little Geniuses. Our advisor is Hüseyin Sıhat.

#### ui-overview

Dosya: `tr-ui-overview.mp3` / `en-ui-overview.mp3`  
Ne zaman: Güneş Sistemi genel bakışına dönünce

TR: Güneş Sistemi. Ortada Güneş, çevresinde gezegenler dolanır.

EN: The Solar System. The Sun is in the middle. The planets go around it.

### Gezegenler

Sayı okuma. Bir ad, bir cümle.

#### body-sun

Dosya: `tr-body-sun.mp3` / `en-body-sun.mp3`  
Ne zaman: Güneş seçilince

TR: Güneş. O bir gezegen değil, bir yıldızdır. Kendi ışığını üretir.

EN: The Sun. It is not a planet. It is a star, and it makes its own light.

#### body-mercury

Dosya: `tr-body-mercury.mp3` / `en-body-mercury.mp3`  
Ne zaman: Merkür seçilince

TR: Merkür. Güneş’e en yakın gezegen. Küçüktür, uydusu yoktur.

EN: Mercury. The planet closest to the Sun. It is small and has no moon.

#### body-venus

Dosya: `tr-body-venus.mp3` / `en-body-venus.mp3`  
Ne zaman: Venüs seçilince

TR: Venüs. Güneş Sistemi’nin en sıcak gezegeni. Merkür’den uzak olsa da daha sıcaktır.

EN: Venus. The hottest planet. It is farther than Mercury, but still hotter.

#### body-earth

Dosya: `tr-body-earth.mp3` / `en-body-earth.mp3`  
Ne zaman: Dünya seçilince

TR: Dünya. Bizim evimiz. Gece ve gündüz, Dünya kendi etrafında döndüğü için olur.

EN: Earth. Our home. Night and day happen because Earth spins.

#### body-moon

Dosya: `tr-body-moon.mp3` / `en-body-moon.mp3`  
Ne zaman: Ay seçilince

TR: Ay. Dünya’nın uydusu. Kendi ışığını üretmez; Güneş ışığını yansıtır.

EN: The Moon. Earth’s moon. It does not make light. It shines with sunlight.

#### body-mars

Dosya: `tr-body-mars.mp3` / `en-body-mars.mp3`  
Ne zaman: Mars seçilince

TR: Mars. Kızıl Gezegen. Rengi yüzeyindeki paslı topraktan gelir.

EN: Mars. The Red Planet. Its color comes from rusty dust on the ground.

#### body-jupiter

Dosya: `tr-body-jupiter.mp3` / `en-body-jupiter.mp3`  
Ne zaman: Jüpiter seçilince

TR: Jüpiter. En büyük gezegen. Gaz devidir; üzerinde yürünecek katı yer yoktur.

EN: Jupiter. The biggest planet. It is a gas giant. You cannot stand on it.

#### body-saturn

Dosya: `tr-body-saturn.mp3` / `en-body-saturn.mp3`  
Ne zaman: Satürn seçilince

TR: Satürn. Halkaları vardır. Halka bir tabak değil; buz ve kaya parçalarıdır.

EN: Saturn. It has rings. The rings are not a solid plate. They are ice and rock.

#### body-uranus

Dosya: `tr-body-uranus.mp3` / `en-body-uranus.mp3`  
Ne zaman: Uranüs seçilince

TR: Uranüs. Neredeyse yan yatarak döner. Bu yüzden mevsimleri çok gariptir.

EN: Uranus. It spins almost on its side. That makes its seasons very strange.

#### body-neptune

Dosya: `tr-body-neptune.mp3` / `en-body-neptune.mp3`  
Ne zaman: Neptün seçilince

TR: Neptün. Güneş’ten en uzak gezegen. Rüzgârları çok güçlüdür.

EN: Neptune. The farthest planet from the Sun. Its winds are very strong.

#### body-pluto

Dosya: `tr-body-pluto.mp3` / `en-body-pluto.mp3`  
Ne zaman: Plüton seçilince

TR: Plüton. Cüce gezegendir. Çok küçük ve çok soğuktur.

EN: Pluto. It is a dwarf planet. It is very small and very cold.

### Etkinlik akışı

#### lab-predict

Dosya: `tr-lab-predict.mp3` / `en-lab-predict.mp3`  
Ne zaman: Etkinlikte önce tahmin istenirken

TR: Önce sen düşün. Hangisi doğru? Seç, sonra izle.

EN: Think first. Which one is right? Choose, then watch.

#### lab-watch

Dosya: `tr-lab-watch.mp3` / `en-lab-watch.mp3`  
Ne zaman: Tahminden sonra simülasyon izlenirken

TR: Şimdi izle. Gözünle gör, kulağınla dinle.

EN: Now watch. See it with your eyes. Hear it with your ears.

#### lab-why

Dosya: `tr-lab-why.mp3` / `en-lab-why.mp3`  
Ne zaman: Nedenini gör adımına geçince

TR: İşte nedeni. Az önce gördüğün şeyin açıklaması bu.

EN: Here is why. This is the reason for what you just saw.

#### lab-done

Dosya: `tr-lab-done.mp3` / `en-lab-done.mp3`  
Ne zaman: Etkinlik bitip listeye dönünce

TR: Bitti. Başka bir etkinlik seç, ya da keşfe dön.

EN: Done. Pick another activity, or go back to explore.

### Odalar

#### room-motion

Dosya: `tr-room-motion.mp3` / `en-room-motion.mp3`  
Ne zaman: Hareket odası açılınca

TR: Hareket. Dönmek ayrıdır, Güneş’in etrafında dolanmak ayrıdır.

EN: Motion. Spinning is one thing. Going around the Sun is another.

#### room-earth

Dosya: `tr-room-earth.mp3` / `en-room-earth.mp3`  
Ne zaman: Dünya odası açılınca

TR: Dünya odası. Gece, gündüz ve mevsimler burada.

EN: Earth room. Night, day, and seasons live here.

#### room-gravity

Dosya: `tr-room-gravity.mp3` / `en-room-gravity.mp3`  
Ne zaman: Yerçekimi odası açılınca

TR: Yerçekimi. Aynı top başka dünyada farklı düşer, farklı zıplar.

EN: Gravity. The same ball falls and jumps differently on other worlds.

#### room-scale

Dosya: `tr-room-scale.mp3` / `en-room-scale.mp3`  
Ne zaman: Ölçek odası açılınca

TR: Ölçek. Uzay çok büyüktür. Gezegenler aslında çok küçük görünür.

EN: Scale. Space is huge. Planets look tiny when the sizes are true.

#### room-build

Dosya: `tr-room-build.mp3` / `en-room-build.mp3`  
Ne zaman: Kur + Ay odası açılınca

TR: Kur ve Ay. Gezegenleri diz, dolunayı sen oluştur.

EN: Build and the Moon. Line up the planets. Make a full moon yourself.

#### room-sky

Dosya: `tr-room-sky.mp3` / `en-room-sky.mp3`  
Ne zaman: Gökyüzü odası açılınca

TR: Gökyüzü. Yıldızlar mı kayıyor, Dünya mı dönüyor? Bakalım.

EN: Sky. Do the stars move, or does Earth spin? Let’s see.

### Hızlı başla etkinlikleri

#### activity-arrange-orbits

Dosya: `tr-activity-arrange-orbits.mp3` / `en-activity-arrange-orbits.mp3`  
Ne zaman: Gezegenleri kendin diz başlayınca

TR: Gezegenleri Güneş’e uzaklık sırasına diz. En yakın Merkür, sonra Venüs, sonra Dünya.

EN: Put the planets in order from the Sun. Mercury first, then Venus, then Earth.

#### activity-moon-phases

Dosya: `tr-activity-moon-phases.mp3` / `en-activity-moon-phases.mp3`  
Ne zaman: Dolunay’ı sen oluştur başlayınca

TR: Dolunay için Ay’ı, Dünya’nın Güneş’e bakmayan tarafına götür.

EN: For a full moon, drag the Moon to the night side of Earth.

#### activity-closest-hottest

Dosya: `tr-activity-closest-hottest.mp3` / `en-activity-closest-hottest.mp3`  
Ne zaman: En sıcak kim başlayınca

TR: Merkür Güneş’e en yakın. Ama en sıcak yüzey Venüs’tedir. Atmosfer ısıyı tutar.

EN: Mercury is closest to the Sun. But Venus has the hottest ground. Its air traps heat.

#### activity-drop-ball

Dosya: `tr-activity-drop-ball.mp3` / `en-activity-drop-ball.mp3`  
Ne zaman: Kim önce düşer başlayınca

TR: Aynı topu bırak. Yerçekimi büyükse top daha çabuk düşer.

EN: Drop the same ball. Where gravity is stronger, it hits the ground first.

#### activity-who-faster

Dosya: `tr-activity-who-faster.mp3` / `en-activity-who-faster.mp3`  
Ne zaman: Yıl yarışı başlayınca

TR: Merkür mü Dünya mı Güneş çevresinde önce tur atar? Yakın olan daha kısa yol yürür.

EN: Who laps the Sun first, Mercury or Earth? The closer planet has a shorter path.

---

## Teslim listesi

Her öğrenci kendi kodlarını hem `tr-` hem `en-` olarak verir. Danışman dosyaları `public/audio/` klasörüne koyar. Uygulamada **Ayarlar → Seslendirme** açık olmalı. Dil oradan seçilir.
