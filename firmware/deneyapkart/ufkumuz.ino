#include "deneyap.h"

// Ufkumuz Yıldızlar — Deneyap Kart 1A
// Arduino IDE: Kart olarak "Deneyap Kart 1A" seç.
// Baud: 115200. Tuşlar INPUT_PULLUP; bir ucu pine, diğer ucu GND.
// A0: potansiyometre (zaman). İsteğe bağlı RGB: tarayıcı L:rrggbb yazar.

struct Binding {
  uint8_t pin;
  const char* line;
};

const Binding BINDINGS[] = {
  {D0, "P:sun"},
  {D1, "P:mercury"},
  {D2, "P:venus"},
  {D3, "P:earth"},
  {D4, "P:mars"},
  {D5, "P:jupiter"},
  {D6, "P:saturn"},
  {D7, "P:uranus"},
  {D8, "P:neptune"},
  {D9, "F:play"},
  {D10, "F:day"},
  {D11, "F:year"},
  {D12, "F:now"},
  {D13, "F:overview"},
  {D14, "F:orbits"},
};

const uint8_t COUNT = sizeof(BINDINGS) / sizeof(BINDINGS[0]);
const unsigned long DEBOUNCE_MS = 40;
bool lastStable[COUNT];
bool lastRead[COUNT];
unsigned long lastChange[COUNT];
int lastPotSent = -1;
unsigned long lastPotMs = 0;
String incoming;

void applyLed(const String& hex) {
  if (hex.length() < 6) return;
  char buf[8];
  hex.substring(0, 6).toCharArray(buf, sizeof(buf));
  long color = strtol(buf, NULL, 16);
  uint8_t r = (color >> 16) & 255;
  uint8_t g = (color >> 8) & 255;
  uint8_t b = color & 255;
#ifdef LEDR
  analogWrite(LEDR, r);
  analogWrite(LEDG, g);
  analogWrite(LEDB, b);
#else
  (void)r;
  (void)g;
  (void)b;
#endif
}

void setup() {
  Serial.begin(115200);
  pinMode(A0, INPUT);
  for (uint8_t i = 0; i < COUNT; i++) {
    pinMode(BINDINGS[i].pin, INPUT_PULLUP);
    const bool up = digitalRead(BINDINGS[i].pin) == HIGH;
    lastStable[i] = up;
    lastRead[i] = up;
    lastChange[i] = 0;
  }
}

void loop() {
  const unsigned long now = millis();
  for (uint8_t i = 0; i < COUNT; i++) {
    const bool up = digitalRead(BINDINGS[i].pin) == HIGH;
    if (up != lastRead[i]) {
      lastChange[i] = now;
      lastRead[i] = up;
    }
    if ((now - lastChange[i]) > DEBOUNCE_MS && up != lastStable[i]) {
      lastStable[i] = up;
      if (!up) {
        Serial.println(BINDINGS[i].line);
      }
    }
  }

  if (now - lastPotMs > 80) {
    lastPotMs = now;
    int raw = analogRead(A0);
    int scaled = raw / 41;
    if (scaled < 0) scaled = 0;
    if (scaled > 100) scaled = 100;
    if (lastPotSent < 0 || abs(scaled - lastPotSent) >= 2) {
      lastPotSent = scaled;
      Serial.print("T:");
      Serial.println(scaled / 100.0, 2);
    }
  }

  while (Serial.available()) {
    char c = (char)Serial.read();
    if (c == '\n' || c == '\r') {
      incoming.trim();
      if (incoming.startsWith("L:") || incoming.startsWith("l:")) {
        applyLed(incoming.substring(2));
      }
      incoming = "";
    } else if (incoming.length() < 24) {
      incoming += c;
    }
  }
}
