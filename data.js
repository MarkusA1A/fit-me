/*
 * Fit-Me · Trainingsdaten
 * Zusammengestellt von deinem virtuellen Fitness-Coach.
 *
 * Ausrüstung: Kettlebells (verschiedene kg), Beinbeuger- & Beinstrecker-Maschine.
 * Ziel: 2× pro Woche, je ca. 30 Minuten.
 *
 * Jede Übung hat:
 *  - name:    Bezeichnung
 *  - work:    Arbeitszeit in Sekunden  (oder reps für Wiederholungen)
 *  - rest:    Pause danach in Sekunden
 *  - detail:  Coaching-Hinweis (Technik, Gewicht, Atmung)
 *  - reps:    optional, statt Zeit → Wiederholungen
 */

const TIPS = {
  warmup: 'Nie kalt starten: 5–8 Minuten Warm-up senken das Verletzungsrisiko und bringen Kraft & Beweglichkeit sofort nach oben.',
  cardio: 'Atme gleichmäßig. Tempo so wählen, dass du noch kurze Sätze sprechen könntest – das ist deine Cardio-Zone.',
  kraft: 'Technik vor Gewicht. Lieber sauber und kontrolliert als schwer und schludrig. Ausatmen in der Anstrengung.',
  hiit: 'Voller Einsatz in der Arbeitsphase, echte Erholung in der Pause. Qualität schlägt Wiederholungen.',
  rudern: 'Kraft kommt aus den Beinen: erst drücken, dann Körper zurück, zuletzt Arme ziehen. Zurück in umgekehrter Reihenfolge. Ruhiger, kräftiger Zug schlägt hektisches Reißen. Die Meter-Angaben (🎯) sind Richtwerte – nutze sie als Orientierung am Display, nicht als Pflicht.',
  cooldown: 'Nach dem Training runterkommen: ruhig dehnen, tief atmen, jede Position sanft halten – nie in den Schmerz ziehen.'
};

const WORKOUTS = {
  /* ---------------------------------------------------------------- WARM-UP */
  warmup: [
    {
      id: 'warmup-mobility',
      title: 'Mobility & Aktivierung',
      level: 'Sanft',
      minutes: 7,
      focus: 'Ganzkörper · vor jedem Training',
      desc: 'Bringt Gelenke, Kreislauf und Muskulatur in Schwung. Ideal direkt vor Cardio, Kraft oder HIIT.',
      exercises: [
        { name: 'Lockeres Marschieren auf der Stelle', work: 45, rest: 0, detail: 'Arme aktiv mitschwingen, Puls sanft hochfahren.' },
        { name: 'Arm-Kreisen vor/zurück', work: 40, rest: 0, detail: '20 Sek. vorwärts, 20 Sek. rückwärts. Schultern lösen.' },
        { name: 'Hüftkreisen', work: 40, rest: 0, detail: 'Hände in die Hüfte, große ruhige Kreise – Seite wechseln.' },
        { name: 'Standwaage-Pendel (Beinschwung)', work: 40, rest: 0, detail: 'Bein locker vor und zurück schwingen, je 20 Sek. pro Seite.' },
        { name: 'Ausfallschritt mit Rotation', work: 50, rest: 0, detail: 'In den Lunge gehen, Oberkörper zur vorderen Seite drehen. Seiten wechseln.' },
        { name: 'Kniebeugen ohne Gewicht', work: 45, rest: 0, detail: 'Langsam, tief, Knie folgen den Zehen. Beinmuskulatur aufwecken.' },
        { name: 'Cat-Cow (Katzenbuckel)', work: 40, rest: 0, detail: 'Im Vierfüßler Wirbelsäule rund und lang machen. Ruhig atmen.' },
        { name: 'Leichte Kettlebell Halo', work: 40, rest: 0, detail: 'Leichteste Kugel langsam um den Kopf kreisen. Schultern mobilisieren.' }
      ]
    },
    {
      id: 'warmup-leg-prep',
      title: 'Bein-Spezial Warm-up',
      level: 'Sanft',
      minutes: 6,
      focus: 'Knie & Oberschenkel · vor Beinbeuger/-strecker',
      desc: 'Bereitet Knie und Oberschenkel gezielt auf die Beinmaschine vor. Erst aktivieren, dann belasten.',
      exercises: [
        { name: 'Schnelles Gehen / Stepper', work: 60, rest: 0, detail: 'Kreislauf hoch, Beine durchbluten.' },
        { name: 'Knie-Lift im Stand', work: 40, rest: 0, detail: 'Abwechselnd Knie hoch zur Hüfte. Bauch leicht angespannt.' },
        { name: 'Wadenheben', work: 40, rest: 0, detail: 'Auf die Zehenspitzen, langsam senken. 15–20 Wiederholungen.' },
        { name: 'Beinstrecker – Aufwärmsatz leicht', work: 45, rest: 15, detail: 'Sehr leichtes Gewicht, 15 saubere Wiederholungen. Nur aktivieren.' },
        { name: 'Beinbeuger – Aufwärmsatz leicht', work: 45, rest: 15, detail: 'Sehr leichtes Gewicht, 15 kontrollierte Wiederholungen.' },
        { name: 'Quadrizeps-Dehnung im Stand', work: 40, rest: 0, detail: 'Fuß zum Po ziehen, je 20 Sek. pro Seite. Sanft halten.' }
      ]
    }
  ],

  /* ----------------------------------------------------------------- CARDIO */
  cardio: [
    {
      id: 'cardio-kb-flow',
      title: 'Kettlebell Cardio-Flow',
      level: 'Mittel',
      minutes: 30,
      focus: 'Ausdauer & Fettverbrennung',
      desc: 'Durchgehender Puls mit der Kettlebell. 4 Runden im Fluss – moderates Gewicht wählen, Tempo halten.',
      rounds: 4,
      exercises: [
        { name: 'Kettlebell Swings', work: 40, rest: 20, detail: 'Hüfte explosiv nach vorn, Kugel bis Brusthöhe. Mittleres Gewicht.' },
        { name: 'Marsch mit Goblet-Halt', work: 40, rest: 20, detail: 'Kugel vor der Brust, zügig auf der Stelle marschieren.' },
        { name: 'Kettlebell Deadlift', work: 40, rest: 20, detail: 'Gerader Rücken, Kraft aus den Beinen. Flüssiger Rhythmus.' },
        { name: 'High Knees (Knie hoch)', work: 30, rest: 30, detail: 'Ohne Gewicht, Tempo machen. Arme aktiv mit.' }
      ]
    },
    {
      id: 'cardio-low-impact',
      title: 'Low-Impact Cardio',
      level: 'Einsteiger',
      minutes: 28,
      focus: 'Gelenkschonend · Kreislauf',
      desc: 'Schwungvoll, aber knieschonend. Perfekt an Tagen, an denen die Gelenke Ruhe brauchen.',
      rounds: 4,
      exercises: [
        { name: 'Step-Touch seitlich', work: 45, rest: 15, detail: 'Seitschritte mit Armeinsatz. Dynamisch, aber kontrolliert.' },
        { name: 'Boxen in die Luft', work: 45, rest: 15, detail: 'Schnelle gerade Schläge, Bauch fest, leicht in den Knien.' },
        { name: 'Kettlebell Goblet Squat (leicht)', work: 40, rest: 20, detail: 'Leichte Kugel, ruhiges Tempo, tiefe saubere Kniebeuge.' },
        { name: 'Standwaage-Pendel', work: 40, rest: 20, detail: 'Beinschwung im Wechsel, ruhig atmen, Balance halten.' }
      ]
    },
    {
      id: 'cardio-intervall',
      title: 'Cardio-Intervalle',
      level: 'Fortgeschritten',
      minutes: 30,
      focus: 'Tempo-Wechsel · Kondition',
      desc: 'Wechsel aus zügigen und ruhigen Phasen treibt deine Ausdauer effizient nach oben.',
      rounds: 5,
      exercises: [
        { name: 'Schnelles Marschieren / Joggen am Platz', work: 50, rest: 10, detail: 'Zügig, gleichmäßige Atmung. Das ist deine Tempophase.' },
        { name: 'Kettlebell Swings', work: 30, rest: 15, detail: 'Kräftiger Hüftstoß, kontrollierter Pendelweg.' },
        { name: 'Jumping Jacks (oder Step-Jacks)', work: 30, rest: 15, detail: 'Knieschonende Variante ohne Sprung möglich.' },
        { name: 'Aktive Erholung – Gehen', work: 40, rest: 0, detail: 'Puls bewusst herunterfahren, tief atmen.' }
      ]
    }
  ],

  /* ------------------------------------------------------------------ KRAFT */
  kraft: [
    {
      id: 'kraft-ganzkoerper',
      title: 'Ganzkörper-Kraft',
      level: 'Mittel',
      minutes: 32,
      focus: 'Kettlebells · alle großen Muskelgruppen',
      desc: '3 Runden Ganzkörper. Wähle ein Gewicht, bei dem die letzten 2–3 Wiederholungen fordernd sind.',
      rounds: 3,
      exercises: [
        { name: 'Goblet Squat', reps: '12 Wdh.', work: 50, rest: 25, detail: 'Kugel vor der Brust, tief und kontrolliert. Beine & Po.' },
        { name: 'Kettlebell Rudern (je Seite)', reps: '10 je Seite', work: 50, rest: 25, detail: 'Rücken gerade, Ellbogen eng am Körper nach hinten ziehen.' },
        { name: 'Kettlebell Schulterdrücken', reps: '10 je Seite', work: 50, rest: 25, detail: 'Aus den Schultern nach oben drücken, Bauch fest.' },
        { name: 'Romanian Deadlift', reps: '12 Wdh.', work: 50, rest: 25, detail: 'Hüfte nach hinten, leichte Kniebeugung, Rückseite spüren.' },
        { name: 'Kettlebell Ausfallschritt (je Seite)', reps: '10 je Seite', work: 50, rest: 25, detail: 'Kugel im Goblet-Halt, Knie sauber absenken.' }
      ]
    },
    {
      id: 'kraft-beinmaschine',
      title: 'Bein-Fokus an der Maschine',
      level: 'Mittel',
      minutes: 30,
      focus: 'Beinbeuger & Beinstrecker · plus Kettlebell',
      desc: 'Voller Fokus auf die Oberschenkel. Beinstrecker (vorne) und Beinbeuger (hinten) im Wechsel mit Kettlebell-Übungen.',
      rounds: 3,
      exercises: [
        { name: 'Beinstrecker (Quadrizeps)', reps: '12 Wdh.', work: 55, rest: 30, detail: 'Oben kurz halten, langsam ablassen. Knie nicht durchschlagen.' },
        { name: 'Beinbeuger (Beinrückseite)', reps: '12 Wdh.', work: 55, rest: 30, detail: 'Kontrolliert anziehen, betont langsam zurückführen.' },
        { name: 'Goblet Squat', reps: '12 Wdh.', work: 50, rest: 25, detail: 'Kettlebell vor der Brust, tiefe saubere Kniebeuge.' },
        { name: 'Wadenheben mit Kettlebell', reps: '15 Wdh.', work: 45, rest: 25, detail: 'Voller Bewegungsumfang, oben kurz halten.' }
      ]
    },
    {
      id: 'kraft-oberkoerper',
      title: 'Oberkörper & Core',
      level: 'Mittel',
      minutes: 30,
      focus: 'Rücken, Schultern, Rumpf',
      desc: 'Kettlebell-Training für einen starken, aufrechten Oberkörper und einen stabilen Rumpf.',
      rounds: 3,
      exercises: [
        { name: 'Kettlebell Rudern (je Seite)', reps: '10 je Seite', work: 50, rest: 25, detail: 'Breiter Rücken, Schulterblatt nach hinten-unten ziehen.' },
        { name: 'Kettlebell Floor Press', reps: '12 Wdh.', work: 50, rest: 25, detail: 'Auf dem Rücken, Kugel(n) über der Brust nach oben drücken.' },
        { name: 'Kettlebell Halo', reps: '8 je Richtung', work: 45, rest: 20, detail: 'Langsam um den Kopf kreisen, Rumpf bleibt stabil.' },
        { name: 'Russian Twist mit Kettlebell', reps: '16 Wdh.', work: 45, rest: 20, detail: 'Sitzend rotieren, Kugel von Seite zu Seite. Bauch fest.' },
        { name: 'Unterarmstütz (Plank)', work: 40, rest: 25, detail: 'Gerade Linie von Kopf bis Ferse. Po anspannen, ruhig atmen.' }
      ]
    }
  ],

  /* ------------------------------------------------------------------- HIIT */
  hiit: [
    {
      id: 'hiit-kettlebell',
      title: 'Kettlebell HIIT',
      level: 'Intensiv',
      minutes: 28,
      focus: 'High Intensity · Ganzkörper',
      desc: '40 Sek. Vollgas, 20 Sek. Pause. 4 Runden – gib in jeder Arbeitsphase alles, erhole dich bewusst.',
      rounds: 4,
      exercises: [
        { name: 'Kettlebell Swings', work: 40, rest: 20, detail: 'Explosiver Hüftstoß. Das ist dein Motor – Tempo halten.' },
        { name: 'Goblet Squat → Press', work: 40, rest: 20, detail: 'Aus der Hocke direkt über Kopf drücken. Ein Fluss.' },
        { name: 'High Knees', work: 40, rest: 20, detail: 'Knie hoch, schnelle Beine, Arme treiben mit.' },
        { name: 'Kettlebell Deadlift', work: 40, rest: 20, detail: 'Kraftvoll aus den Beinen, Rücken gerade.' }
      ]
    },
    {
      id: 'hiit-tabata',
      title: 'Tabata-Brenner',
      level: 'Sehr intensiv',
      minutes: 24,
      focus: '20/10 · maximale Intensität',
      desc: 'Klassisches Tabata: 20 Sek. Vollgas, 10 Sek. Pause. 3 Blöcke à 8 Runden. Kurz, knackig, effektiv.',
      rounds: 8,
      exercises: [
        { name: 'Kettlebell Swings', work: 20, rest: 10, detail: 'Maximale Power in jedem Swing. Block 1.' },
        { name: 'Squat Jumps (oder schnelle Squats)', work: 20, rest: 10, detail: 'Explosiv hoch, weich landen. Knieschonend: ohne Sprung.' },
        { name: 'Mountain Climbers', work: 20, rest: 10, detail: 'Schnelle Knie zur Brust, Hüfte tief. Block 3.' }
      ]
    },
    {
      id: 'hiit-emom',
      title: 'EMOM Power',
      level: 'Intensiv',
      minutes: 25,
      focus: 'Kraft-Ausdauer · Beine & Ganzkörper',
      desc: 'Jede Runde fordert Kraft und Kondition zugleich. Kettlebell und Beinmaschine kombiniert.',
      rounds: 4,
      exercises: [
        { name: 'Kettlebell Clean & Press (je Seite)', work: 45, rest: 15, detail: 'Sauber zur Schulter, dann über Kopf. Je Seite abwechseln.' },
        { name: 'Beinstrecker explosiv', work: 40, rest: 20, detail: 'Zügig strecken, langsam zurück. Mittleres Gewicht.' },
        { name: 'Beinbeuger kontrolliert', work: 40, rest: 20, detail: 'Kraftvoll beugen, betont langsam ablassen.' },
        { name: 'Burpees (oder Step-Backs)', work: 35, rest: 25, detail: 'Volle Bewegung. Knieschonend: ohne Sprung, Schritt zurück.' }
      ]
    }
  ],

  /* ------------------------------------------------------------------ RUDERN */
  rudern: [
    {
      id: 'rudern-steady',
      title: 'Steady-State Rudern',
      level: 'Einsteiger',
      minutes: 28,
      focus: 'Waterrower · gleichmäßige Ausdauer',
      desc: 'Ruhiges Dauer-Rudern in konstantem Tempo. Baut Grundlagenausdauer auf und schult einen sauberen Ruderschlag.',
      rounds: 3,
      exercises: [
        { name: 'Locker einrudern', work: 120, rest: 30, goal: '~350 m', detail: 'Ruhiges Tempo (ca. 20–22 Schläge/Min). In den Rhythmus finden, gleichmäßig atmen.' },
        { name: 'Steady-State Block', work: 180, rest: 40, goal: '~600 m', detail: 'Konstantes, angenehm forderndes Tempo. Sauberer Zug: Beine → Rumpf → Arme.' },
        { name: 'Kontroll-Block (Technik)', work: 120, rest: 30, goal: '~350 m', detail: 'Bewusst auf saubere Reihenfolge achten. Langer Gleit-Weg, ruhige Erholungsphase.' }
      ]
    },
    {
      id: 'rudern-intervall',
      title: 'Ruder-Intervalle',
      level: 'Mittel',
      minutes: 30,
      focus: 'Waterrower · Tempo-Wechsel',
      desc: 'Wechsel aus kräftigen und ruhigen Phasen treibt Kondition und Watt-Leistung. Push hart, erhol dich aktiv.',
      rounds: 5,
      exercises: [
        { name: 'Aktiv rudern (zügig)', work: 60, rest: 0, goal: '~225 m', detail: 'Erhöhtes Tempo (ca. 26–28 Schläge/Min), kräftiger Beindruck.' },
        { name: 'Locker rudern (Erholung)', work: 60, rest: 0, goal: '~160 m', detail: 'Tempo deutlich rausnehmen, Puls bewusst senken. Weiter gleichmäßig ziehen.' },
        { name: 'Sprint-Push', work: 30, rest: 30, goal: '~130 m', detail: 'Kurz alles geben – starker, schneller Zug. Danach komplett ausrudern.' }
      ]
    },
    {
      id: 'rudern-hiit',
      title: 'Ruder-HIIT (500 m Power)',
      level: 'Intensiv',
      minutes: 26,
      focus: 'Waterrower · High Intensity',
      desc: 'Intensive Intervalle am Wasserwiderstand. Kurze, harte Belastungen mit echter Erholung – ideal als HIIT-Einheit.',
      rounds: 6,
      exercises: [
        { name: 'Power-Intervall (hart)', work: 40, rest: 20, goal: '~160 m', detail: 'Vollgas: explosiver Beindruck, kräftiger Zug. Hoher Wasserwiderstand spürbar.' },
        { name: 'Aktive Erholung am Gerät', work: 40, rest: 0, goal: '~100 m', detail: 'Ganz locker weiterrudern, tief atmen, Puls runterfahren.' }
      ]
    },
    {
      id: 'rudern-kombi',
      title: 'Rudern + Kettlebell Kombi',
      level: 'Fortgeschritten',
      minutes: 30,
      focus: 'Waterrower & Kettlebell · Ganzkörper',
      desc: 'Cardio am Ruderer im Wechsel mit Kraft an der Kettlebell. Hält den Puls oben und fordert den ganzen Körper.',
      rounds: 4,
      exercises: [
        { name: 'Rudern zügig', work: 90, rest: 15, goal: '~320 m', detail: 'Gleichmäßig kräftiges Tempo am Waterrower. Sauberer Durchzug.' },
        { name: 'Kettlebell Swings', work: 40, rest: 20, detail: 'Vom Ruderer absteigen, explosiver Hüftstoß. Mittleres Gewicht.' },
        { name: 'Goblet Squat', work: 40, rest: 25, detail: 'Kugel vor der Brust, tiefe kontrollierte Kniebeuge.' }
      ]
    }
  ],

  /* --------------------------------------------------------------- COOL-DOWN */
  cooldown: [
    {
      id: 'cooldown-stretch',
      title: 'Stretching & Runterkommen',
      level: 'Sanft',
      minutes: 7,
      focus: 'Ganzkörper · nach jedem Training',
      desc: 'Bringt Puls und Atmung zur Ruhe und dehnt die wichtigsten Muskelgruppen. Jede Position ruhig halten, nie reißen.',
      exercises: [
        { name: 'Locker ausgehen / lockeres Marschieren', work: 45, rest: 0, detail: 'Puls bewusst herunterfahren, tief in den Bauch atmen.' },
        { name: 'Schulter-Nacken-Dehnung', work: 40, rest: 0, detail: 'Kopf sanft zur Seite neigen, je 20 Sek. pro Seite. Schultern locker.' },
        { name: 'Brust-Dehnung an der Wand', work: 40, rest: 0, detail: 'Unterarm an die Wand, Oberkörper leicht wegdrehen. Seiten wechseln.' },
        { name: 'Stehende Vorbeuge', work: 40, rest: 0, detail: 'Knie leicht gebeugt, Oberkörper locker hängen lassen, Rücken & Beinrückseite.' },
        { name: 'Quadrizeps-Dehnung im Stand', work: 40, rest: 0, detail: 'Fuß zum Po, Knie nach hinten. Je 20 Sek. pro Seite, ruhig halten.' },
        { name: 'Hüftbeuger-Dehnung (Ausfallschritt)', work: 50, rest: 0, detail: 'Tiefer Ausfallschritt, Hüfte nach vorn schieben. Seiten wechseln.' },
        { name: 'Tiefes Atmen im Sitzen', work: 45, rest: 0, detail: '4 Sek. ein, 6 Sek. aus. Bewusst entspannen – Einheit ausklingen lassen.' }
      ]
    },
    {
      id: 'cooldown-legs',
      title: 'Bein-Cool-down',
      level: 'Sanft',
      minutes: 6,
      focus: 'Beine · nach Kraft- & Bein-Training',
      desc: 'Gezieltes Dehnen für Oberschenkel und Waden nach der Beinmaschine oder Kettlebell-Beinarbeit.',
      exercises: [
        { name: 'Quadrizeps-Dehnung (vorne)', work: 50, rest: 0, detail: 'Fuß zum Po ziehen, je 25 Sek. pro Seite. Knie zeigt nach unten.' },
        { name: 'Beinrückseiten-Dehnung', work: 50, rest: 0, detail: 'Ferse auf eine Erhöhung, Oberkörper sanft Richtung Fuß. Seiten wechseln.' },
        { name: 'Waden-Dehnung an der Wand', work: 50, rest: 0, detail: 'Hinteres Bein gestreckt, Ferse am Boden. Je 25 Sek. pro Seite.' },
        { name: 'Adduktoren-Dehnung (breiter Stand)', work: 45, rest: 0, detail: 'Breiter Stand, Gewicht auf eine Seite verlagern. Innenseite dehnen.' },
        { name: 'Gesäß-Dehnung im Sitzen', work: 50, rest: 0, detail: 'Knöchel aufs andere Knie, leicht vorbeugen. Je 25 Sek. pro Seite.' }
      ]
    }
  ]
};

const CATEGORY_META = {
  warmup: { label: 'Warm-up', emoji: '🔥', color: '#ff8a3d', sub: 'Immer zuerst – 5–8 Minuten vorbereiten' },
  cardio: { label: 'Cardio', emoji: '🏃', color: '#3ddc97', sub: 'Ausdauer & Kreislauf' },
  kraft:  { label: 'Kraft', emoji: '🏋️', color: '#5b8cff', sub: 'Kettlebells & Beinmaschine' },
  hiit:   { label: 'HIIT', emoji: '⚡', color: '#ff5d73', sub: 'High Intensity Intervalle' },
  rudern: { label: 'Rudern', emoji: '🚣', color: '#34c3d6', sub: 'Waterrower · Cardio & HIIT' },
  cooldown: { label: 'Cool-down', emoji: '🧘', color: '#9d7bff', sub: 'Dehnen & runterkommen – zum Schluss' }
};
