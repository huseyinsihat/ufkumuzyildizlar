#include "deneyap.h"

// Ufkumuz Yıldızlar — Deneyap Kart 1A tuş firmware'i
// Arduino IDE: Kart olarak "Deneyap Kart 1A" seç.
// Baud: 115200. Tuşlar INPUT_PULLUP; bir ucu pine, diğer ucu GND.

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

void setup() {
  Serial.begin(115200);
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
}
