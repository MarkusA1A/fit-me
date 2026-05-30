# 💪 Fit-Me · Dein virtueller Fitness-Coach

Eine schlanke Web-App, die als virtueller Coach **Cardio-, Kraft- und HIIT-Trainings**
zusammenstellt – jede Einheit ca. **30 Minuten**, ausgelegt auf **2× pro Woche**.
Läuft direkt im Browser und ist für das **iPad (Safari)** optimiert.

## Was die App kann

- **🔥 Warm-up als eigene Sektion** – immer zuerst, 5–8 Minuten. Inklusive
  einem speziellen Bein-Warm-up vor der Beinmaschine.
- **🏃 Cardio** – Ausdauer & Kreislauf, von gelenkschonend bis Intervalle.
- **🏋️ Kraft** – Kettlebells + Beinbeuger/Beinstrecker, Ganzkörper & Bein-Fokus.
- **⚡ HIIT** – High-Intensity-Intervalle (Tabata, EMOM, Kettlebell-HIIT).
- **⏱ Geführter Workout-Player** mit Timer-Ring, Arbeits-/Pausenphasen,
  Runden, Audio-Signalen und Übungs-Hinweisen.
- **📲 Installierbar** auf dem iPad-Homescreen (PWA, läuft im Vollbild).

## Deine Ausrüstung (im Büro)

- 🔔 Kettlebells in verschiedenen kg
- 🦵 Beinbeuger-Maschine
- 🦿 Beinstrecker-Maschine
- 🧍 Eigengewicht

## Auf dem iPad nutzen

1. Repository öffnen und `index.html` im **Safari** aufrufen
   (lokal oder über einen kleinen Webserver, z. B. `python3 -m http.server`).
2. Über **Teilen → Zum Home-Bildschirm** als App hinzufügen.
3. Tippe auf eine Kachel, starte das Training und folge dem Timer.

> Tipp: Beginne jede Einheit mit dem **Warm-up**, wähle danach Cardio, Kraft
> oder HIIT. Cool-down nach dem Training nicht vergessen.

## Trainings anpassen

Alle Workouts stehen in **`data.js`** – Übungen, Zeiten, Pausen, Runden und
Coaching-Hinweise lassen sich dort einfach ändern oder erweitern.

## Aufbau

| Datei | Inhalt |
|-------|--------|
| `index.html` | Grundgerüst & Workout-Player |
| `styles.css` | Design (Dark, touch-freundlich) |
| `data.js` | Alle Trainingspläne & Übungen |
| `app.js` | App-Logik & Timer |
| `manifest.webmanifest` / `icon.svg` | PWA / Homescreen-Icon |

---

*Kein Ersatz für medizinische Beratung. Bei Beschwerden oder Vorerkrankungen
vorab ärztlich abklären und auf saubere Technik achten.*
