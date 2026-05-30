/*
 * Fit-Me · Übungs-Illustrationen
 * Animierte Strichfiguren (SVG + SMIL), zeigen die Bewegung jeder Übung.
 * Selbst gezeichnet, keine externen Bilder – läuft offline.
 *
 * getExerciseArt(key)        -> SVG-Markup
 * pickExerciseArt(name, cat) -> key (per Schlüsselwort aus dem Übungsnamen)
 */

(function (global) {
  'use strict';

  function L(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>';
  }
  function H(x, y) { return '<circle class="head" cx="' + x + '" cy="' + y + '" r="8"/>'; }
  function B(x, y, r) { return '<circle class="ball" cx="' + x + '" cy="' + y + '" r="' + (r || 6) + '"/>'; }
  function floor(y) { return '<line class="floor" x1="12" y1="' + (y || 104) + '" x2="88" y2="' + (y || 104) + '"/>'; }
  // animateTransform-Helfer
  function AT(type, values, dur, extra) {
    return '<animateTransform attributeName="transform" type="' + type +
      '" values="' + values + '" dur="' + dur + '" repeatCount="indefinite"' + (extra || '') + '/>';
  }
  function G(anim, content) { return '<g>' + anim + content + '</g>'; }
  function svg(inner) {
    return '<svg class="fig" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + inner + '</svg>';
  }

  const ART = {
    /* Kniebeuge / Goblet Squat / Squat Jumps – rauf & runter */
    squat: svg(floor() + G(AT('translate', '0 -4;0 5;0 -4', '1.5s'),
      H(50, 18) + L(50, 26, 50, 52) + L(50, 32, 46, 46) + L(50, 32, 54, 46) + B(50, 48) +
      L(50, 52, 38, 72) + L(38, 72, 38, 101) + L(50, 52, 62, 72) + L(62, 72, 62, 101))),

    /* Ausfallschritt */
    lunge: svg(floor() + G(AT('translate', '0 -3;0 5;0 -3', '1.7s'),
      H(50, 18) + L(50, 26, 50, 52) + L(50, 32, 44, 46) + L(50, 32, 56, 46) +
      L(50, 52, 64, 74) + L(64, 74, 64, 101) + L(50, 52, 38, 76) + L(38, 76, 30, 101))),

    /* Kettlebell Swing – Hüftschwung, Arme pendeln */
    swing: svg(floor() + H(50, 22) + L(50, 30, 48, 52) +
      L(48, 52, 40, 76) + L(40, 76, 40, 101) + L(48, 52, 58, 76) + L(58, 76, 60, 101) +
      G(AT('rotate', '30 50 33;-46 50 33;30 50 33', '1.05s'), L(50, 33, 50, 60) + B(50, 62))),

    /* Kreuzheben / Romanian Deadlift – Hüfte beugen/strecken */
    deadlift: svg(floor() + L(50, 58, 42, 80) + L(42, 80, 42, 101) + L(50, 58, 58, 80) + L(58, 80, 58, 101) +
      G(AT('rotate', '34 50 58;2 50 58;34 50 58', '1.5s'),
        H(50, 18) + L(50, 26, 50, 58) + L(50, 32, 50, 52) + B(50, 54))),

    /* Schulterdrücken / Floor Press / Clean & Press – über Kopf */
    press: svg(floor() + H(50, 22) + L(50, 30, 50, 58) + L(50, 58, 44, 104) + L(50, 58, 56, 104) +
      G(AT('translate', '0 16;0 0;0 16', '1.3s'), L(50, 33, 45, 14) + L(50, 33, 55, 14) + B(50, 10))),

    /* Kettlebell Rudern – Arm zieht zurück */
    row: svg(floor() + H(40, 30) + L(44, 34, 66, 54) +
      L(66, 54, 62, 80) + L(62, 80, 60, 104) + L(66, 54, 74, 80) + L(74, 80, 76, 104) +
      G(AT('rotate', '-6 50 40;-42 50 40;-6 50 40', '1.1s'), L(50, 40, 58, 64) + B(58, 66, 5))),

    /* Marschieren / Gehen / Knie-Lift – Knie wechseln */
    march: svg(floor() + H(50, 18) + L(50, 26, 50, 60) + L(50, 34, 42, 52) + L(50, 34, 58, 52) +
      G(AT('rotate', '0 50 60;-34 50 60;0 50 60', '1.2s'), L(50, 60, 46, 82) + L(46, 82, 46, 102)) +
      G(AT('rotate', '0 50 60;-34 50 60;0 50 60', '1.2s', ' begin="-0.6s"'), L(50, 60, 54, 82) + L(54, 82, 54, 102))),

    /* High Knees / Joggen – schnell, hohe Knie */
    run: svg(floor() + H(50, 18) + L(50, 26, 50, 60) + L(50, 34, 42, 50) + L(50, 34, 58, 50) +
      G(AT('rotate', '2 50 60;-60 50 60;2 50 60', '0.7s'), L(50, 60, 46, 82) + L(46, 82, 46, 102)) +
      G(AT('rotate', '2 50 60;-60 50 60;2 50 60', '0.7s', ' begin="-0.35s"'), L(50, 60, 54, 82) + L(54, 82, 54, 102))),

    /* Jumping Jacks / Step-Jacks – Arme & Beine auf/zu */
    jumpingjacks: svg(floor() + H(50, 16) + L(50, 24, 50, 54) +
      G(AT('rotate', '0 50 28;78 50 28;0 50 28', '0.8s'), L(50, 28, 32, 44)) +
      G(AT('rotate', '0 50 28;-78 50 28;0 50 28', '0.8s'), L(50, 28, 68, 44)) +
      G(AT('rotate', '0 50 54;16 50 54;0 50 54', '0.8s'), L(50, 54, 44, 80) + L(44, 80, 40, 102)) +
      G(AT('rotate', '0 50 54;-16 50 54;0 50 54', '0.8s'), L(50, 54, 56, 80) + L(56, 80, 60, 102))),

    /* Step-Touch – seitlich */
    steptouch: svg(floor() + G(AT('translate', '-9 0;9 0;-9 0', '1s'),
      H(50, 18) + L(50, 26, 50, 58) + L(50, 34, 34, 46) + L(50, 34, 66, 46) + L(50, 58, 44, 100) + L(50, 58, 56, 100))),

    /* Boxen – Fäuste abwechselnd */
    boxing: svg(floor() + H(50, 18) + L(50, 26, 50, 58) + L(50, 58, 44, 100) + L(50, 58, 56, 100) +
      G(AT('translate', '0 0;12 0;0 0', '0.5s'), L(50, 34, 64, 40) + B(66, 40, 4)) +
      G(AT('translate', '0 0;12 0;0 0', '0.5s', ' begin="-0.25s"'), L(50, 36, 64, 46) + B(66, 46, 4))),

    /* Arm-Kreisen */
    armcircle: svg(floor() + H(50, 18) + L(50, 26, 50, 58) + L(50, 58, 44, 100) + L(50, 58, 56, 100) +
      G(AT('rotate', '0 50 30;360 50 30', '1.6s'), L(50, 30, 46, 8) + L(50, 30, 54, 8))),

    /* Hüftkreisen */
    hipcircle: svg(floor() + L(50, 64, 44, 102) + L(50, 64, 56, 102) +
      G(AT('rotate', '-15 50 64;15 50 64;-15 50 64', '1.2s'),
        H(50, 20) + L(50, 28, 50, 64) + L(50, 34, 40, 48) + L(50, 34, 60, 48))),

    /* Standwaage-Pendel / Beinschwung */
    legswing: svg(floor() + H(50, 18) + L(50, 26, 50, 60) + L(50, 34, 34, 40) + L(50, 34, 66, 40) + L(50, 60, 50, 100) +
      G(AT('rotate', '30 50 60;-34 50 60;30 50 60', '1.1s'), L(50, 60, 50, 98))),

    /* Cat-Cow – Wirbelsäule wölben */
    catcow: svg(floor(100) + G(AT('rotate', '-5 50 78;6 50 78;-5 50 78', '1.8s'),
      H(26, 70) + L(30, 72, 70, 68) + L(32, 72, 32, 98) + L(68, 68, 68, 98))),

    /* Kettlebell Halo – Kugel um den Kopf */
    halo: svg(floor() + H(50, 30) + L(50, 38, 50, 66) + L(50, 42, 40, 56) + L(50, 42, 60, 56) +
      L(50, 66, 44, 102) + L(50, 66, 56, 102) +
      G(AT('rotate', '0 50 30;360 50 30', '2.4s'), B(50, 14, 5))),

    /* Wadenheben – auf die Zehen */
    calf: svg(floor() + G(AT('translate', '0 0;0 -7;0 0', '1s'),
      H(50, 18) + L(50, 26, 50, 60) + L(50, 34, 42, 50) + L(50, 34, 58, 50) + L(50, 60, 46, 98) + L(50, 60, 54, 98))),

    /* Beinstrecker (Maschine) – Unterschenkel nach vorn strecken */
    legext: svg(floor(108) + L(30, 86, 72, 86) + L(34, 86, 34, 106) + L(68, 86, 68, 106) +
      H(30, 52) + L(34, 58, 34, 82) + L(34, 82, 60, 82) + L(34, 62, 28, 76) +
      G(AT('rotate', '0 60 82;-72 60 82;0 60 82', '1.3s'), L(60, 82, 60, 104) + B(60, 106, 4))),

    /* Beinbeuger (Maschine) – Unterschenkel nach hinten beugen */
    legcurl: svg(floor(108) + L(30, 86, 72, 86) + L(34, 86, 34, 106) + L(68, 86, 68, 106) +
      H(30, 52) + L(34, 58, 34, 82) + L(34, 82, 60, 82) + L(34, 62, 28, 76) +
      G(AT('rotate', '0 60 82;72 60 82;0 60 82', '1.3s'), L(60, 82, 60, 104) + B(60, 106, 4))),

    /* Plank / Unterarmstütz – halten */
    plank: svg(floor(100) + G(AT('translate', '0 0;0 2;0 0', '2.4s'),
      H(26, 74) + L(30, 76, 72, 66) + L(30, 76, 30, 96) + L(30, 96, 40, 96) + L(72, 66, 86, 96))),

    /* Russian Twist – Rumpf rotieren */
    twist: svg(floor(100) + L(50, 86, 40, 74) + L(40, 74, 34, 88) + L(50, 86, 60, 74) + L(60, 74, 66, 88) +
      G(AT('rotate', '-24 50 74;24 50 74;-24 50 74', '1.1s'),
        H(50, 54) + L(50, 60, 50, 74) + L(50, 62, 60, 68) + L(50, 62, 40, 68) + B(50, 70, 5))),

    /* Mountain Climbers – Knie zur Brust */
    climber: svg(floor(100) + H(26, 74) + L(30, 76, 70, 70) + L(30, 76, 30, 96) + L(30, 96, 40, 96) + L(70, 70, 86, 96) +
      G(AT('translate', '0 0;-14 0;0 0', '0.5s'), L(70, 70, 60, 84) + L(60, 84, 60, 96))),

    /* Burpees – runter & hoch */
    burpee: svg(floor() + G(AT('translate', '0 0;0 30;0 0', '1.3s'),
      H(50, 16) + L(50, 24, 50, 56) + L(50, 30, 44, 12) + L(50, 30, 56, 12) + L(50, 56, 44, 100) + L(50, 56, 56, 100))),

    /* Waterrower – sitzend gleiten & ziehen */
    rowmachine: svg(floor(98) + L(82, 84, 82, 98) +
      G(AT('translate', '8 0;-10 0;8 0', '1.4s'),
        H(46, 58) + L(48, 64, 50, 88) + L(44, 88, 58, 88) + L(52, 88, 78, 90) + L(78, 90, 82, 86) + L(50, 68, 72, 86) + B(72, 86, 4))),

    /* Dehnen – seitlich neigen, ein Arm über Kopf */
    stretch: svg(floor() + L(50, 58, 44, 100) + L(50, 58, 56, 100) +
      G(AT('rotate', '-9 50 58;10 50 58;-9 50 58', '2.2s'),
        H(50, 18) + L(50, 26, 50, 58) + L(50, 30, 62, 10) + L(50, 34, 42, 48))),

    /* Atmen / ruhige Erholung – Arme heben sanft */
    breathe: svg(floor() + H(50, 18) + L(50, 26, 50, 58) + L(50, 58, 44, 100) + L(50, 58, 56, 100) +
      G(AT('translate', '0 0;0 -3;0 0', '2.6s'), L(50, 32, 38, 44) + L(50, 32, 62, 44))),

    /* Bereit machen – leichtes Wippen */
    ready: svg(floor() + G(AT('translate', '0 0;0 -4;0 0', '1s'),
      H(50, 18) + L(50, 26, 50, 58) + L(50, 34, 40, 50) + L(50, 34, 60, 50) + L(50, 58, 44, 100) + L(50, 58, 56, 100))),

    /* Pause – sitzend durchatmen */
    rest: svg(floor(100) + H(50, 40) + L(50, 48, 50, 72) + L(50, 72, 74, 78) + L(74, 78, 74, 100) +
      G(AT('translate', '0 0;0 -2;0 0', '3s'), L(50, 52, 40, 62) + L(50, 52, 60, 62)))
  };
  ART.generic = ART.breathe;

  /* Schlüsselwort-Regeln: erste Übereinstimmung gewinnt */
  const RULES = [
    [/beinstrecker/, 'legext'],
    [/beinbeuger/, 'legcurl'],
    [/dehn|vorbeuge/, 'stretch'],
    [/atmen|atem/, 'breathe'],
    [/wadenheben/, 'calf'],
    [/halo/, 'halo'],
    [/swing/, 'swing'],
    [/deadlift|romanian/, 'deadlift'],
    [/clean|drücken|press/, 'press'],
    [/rudern/, 'row'],
    [/russian|twist/, 'twist'],
    [/unterarmstütz|plank/, 'plank'],
    [/mountain/, 'climber'],
    [/burpee/, 'burpee'],
    [/jumping|step-jacks/, 'jumpingjacks'],
    [/step-touch/, 'steptouch'],
    [/boxen/, 'boxing'],
    [/arm-?kreis|arm kreis/, 'armcircle'],
    [/hüft-?kreis/, 'hipcircle'],
    [/cat-cow|katzen/, 'catcow'],
    [/pendel|beinschwung|standwaage|schwung/, 'legswing'],
    [/joggen|jogg|high knees|knie hoch/, 'run'],
    [/squat|kniebeug/, 'squat'],
    [/ausfallschritt|lunge/, 'lunge'],
    [/marsch|gehen|stepper|knie-lift|knie lift|step/, 'march']
  ];

  function pickExerciseArt(name, cat) {
    const lower = (name || '').toLowerCase();
    // Rudergerät-Kategorie: alles ohne Kettlebell/Goblet ist Rudern an der Maschine
    if (cat === 'rudern' && !/kettlebell|goblet|swing/.test(lower)) return 'rowmachine';
    for (let i = 0; i < RULES.length; i++) {
      if (RULES[i][0].test(lower)) return RULES[i][1];
    }
    return 'breathe';
  }

  function getExerciseArt(key) {
    return ART[key] || ART.generic;
  }

  global.pickExerciseArt = pickExerciseArt;
  global.getExerciseArt = getExerciseArt;
})(window);
