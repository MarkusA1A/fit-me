/* Fit-Me · App-Logik (Vanilla JS, optimiert für iPad/Safari) */

(function () {
  'use strict';

  const view = document.getElementById('view');
  const tabsEl = document.getElementById('tabs');

  /* ----------------------------------------------------- Verlauf / Fortschritt */
  const HISTORY_KEY = 'fitme-history';

  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function saveHistory(arr) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(0, 200))); } catch (e) {}
  }

  function recordWorkout(entry) {
    const hist = loadHistory();
    hist.unshift(entry); // neueste zuerst
    saveHistory(hist);
  }

  function startOfWeek(d) {
    const x = new Date(d);
    const day = (x.getDay() + 6) % 7; // Montag = 0
    x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - day);
    return x;
  }

  function weekStats() {
    const hist = loadHistory();
    const monday = startOfWeek(new Date()).getTime();
    let sessions = 0, minutes = 0;
    hist.forEach(function (h) {
      if (h.ts >= monday) { sessions++; minutes += (h.minutes || 0); }
    });
    return { sessions: sessions, minutes: minutes, total: hist.length };
  }

  function relativeDay(ts) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = new Date(ts); d.setHours(0, 0, 0, 0);
    const diff = Math.round((today - d) / 86400000);
    if (diff === 0) return 'Heute';
    if (diff === 1) return 'Gestern';
    if (diff < 7) return 'vor ' + diff + ' Tagen';
    return new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' });
  }

  /* ---------------------------------------------------------- Datum-Header */
  (function setToday() {
    const el = document.getElementById('todayInfo');
    const d = new Date();
    const day = d.toLocaleDateString('de-DE', { weekday: 'long' });
    const date = d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long' });
    el.innerHTML = '<strong>' + day + '</strong>' + date;
  })();

  /* ------------------------------------------------------------- Rendering */
  function fmtAmount(ex) {
    if (ex.reps) return ex.reps;
    return ex.work + 's';
  }

  function renderHome() {
    const tiles = ['warmup', 'cardio', 'kraft', 'hiit', 'cooldown'].map(function (key) {
      const m = CATEGORY_META[key];
      return (
        '<div class="cat-tile" data-goto="' + key + '">' +
          '<div class="cat-emoji">' + m.emoji + '</div>' +
          '<h4>' + m.label + '</h4>' +
          '<p>' + m.sub + '</p>' +
        '</div>'
      );
    }).join('');

    // Fortschritt diese Woche + Verlauf
    const st = weekStats();
    const goal = 2; // 2× pro Woche
    const progressPct = Math.min(100, Math.round((st.sessions / goal) * 100));
    const progressHtml =
      '<div class="home-progress">' +
        '<div class="progress-head">' +
          '<h4>Diese Woche</h4>' +
          '<span class="progress-goal">' + st.sessions + ' / ' + goal + ' Einheiten</span>' +
        '</div>' +
        '<div class="progress-bar"><span style="width:' + progressPct + '%"></span></div>' +
        '<div class="progress-stats">' +
          '<span>🔥 ' + st.minutes + ' Min diese Woche</span>' +
          '<span>🏅 ' + st.total + ' Einheiten gesamt</span>' +
        '</div>' +
        (st.sessions >= goal ? '<p class="progress-cheer">🎉 Wochenziel erreicht – stark!</p>' : '') +
      '</div>';

    const hist = loadHistory().slice(0, 6);
    let historyHtml;
    if (hist.length === 0) {
      historyHtml =
        '<div class="home-history">' +
          '<h4>Dein Verlauf</h4>' +
          '<p class="history-empty">Noch keine Einheit abgeschlossen. Starte dein erstes Training – es wird hier automatisch festgehalten. 💪</p>' +
        '</div>';
    } else {
      const items = hist.map(function (h) {
        const m = CATEGORY_META[h.cat] || { emoji: '✅', label: h.cat };
        return (
          '<li class="history-item">' +
            '<span class="hist-emoji" style="background:' + ((CATEGORY_META[h.cat] || {}).color || '#5b8cff') + '22">' + m.emoji + '</span>' +
            '<span class="hist-main"><strong>' + h.title + '</strong><em>' + m.label + ' · ' + h.minutes + ' Min</em></span>' +
            '<span class="hist-day">' + relativeDay(h.ts) + '</span>' +
          '</li>'
        );
      }).join('');
      historyHtml =
        '<div class="home-history">' +
          '<div class="progress-head"><h4>Dein Verlauf</h4>' +
            '<button class="history-clear" data-clear-history>Zurücksetzen</button></div>' +
          '<ul class="history-list">' + items + '</ul>' +
        '</div>';
    }

    view.innerHTML =
      '<section class="home-hero">' +
        '<h2>Willkommen zurück! 👋</h2>' +
        '<p>Ich bin dein virtueller Coach. Wir trainieren 2× pro Woche je ca. 30 Minuten. ' +
        'Starte <strong>immer</strong> mit einem Warm-up, wähle dann Cardio, Kraft oder HIIT – ' +
        'und beende die Einheit mit einem Cool-down.</p>' +
      '</section>' +

      progressHtml +

      '<div class="plan-week">' +
        '<div class="plan-day">' +
          '<span class="day-tag">Einheit 1</span>' +
          '<h4>Kraft-Tag</h4>' +
          '<p>Warm-up → Kraft (Kettlebells & Beinmaschine)</p>' +
        '</div>' +
        '<div class="plan-day">' +
          '<span class="day-tag">Einheit 2</span>' +
          '<h4>Cardio / HIIT-Tag</h4>' +
          '<p>Warm-up → Cardio oder HIIT im Wechsel</p>' +
        '</div>' +
      '</div>' +

      '<h3 style="margin:8px 4px 12px;font-size:18px;">Trainingsbereiche</h3>' +
      '<div class="cat-row">' + tiles + '</div>' +

      '<div class="home-equip">' +
        '<h4>Deine Ausrüstung im Büro</h4>' +
        '<div class="equip-tags">' +
          '<span class="equip-tag">🔔 Kettlebells (versch. kg)</span>' +
          '<span class="equip-tag">🦵 Beinbeuger</span>' +
          '<span class="equip-tag">🦿 Beinstrecker</span>' +
          '<span class="equip-tag">🧍 Eigengewicht</span>' +
        '</div>' +
      '</div>' +

      historyHtml;
  }

  function renderCategory(key) {
    const meta = CATEGORY_META[key];
    const list = WORKOUTS[key] || [];

    const cards = list.map(function (w) {
      const exPreview = w.exercises.slice(0, 5).map(function (ex) {
        return '<li><span>' + ex.name + '</span><span class="ex-amt">' + fmtAmount(ex) + '</span></li>';
      }).join('');
      const more = w.exercises.length > 5
        ? '<li><span style="color:var(--muted)">+ ' + (w.exercises.length - 5) + ' weitere</span><span></span></li>'
        : '';
      const roundTxt = w.rounds ? w.rounds + ' Runden' : 'Durchlauf';

      return (
        '<article class="card" data-start="' + w.id + '" data-cat="' + key + '">' +
          '<span class="card-accent" style="background:' + meta.color + '"></span>' +
          '<div class="card-top">' +
            '<div>' +
              '<h3>' + w.title + '</h3>' +
              '<p class="card-focus">' + w.focus + '</p>' +
            '</div>' +
            '<span class="badge">' + w.level + '</span>' +
          '</div>' +
          '<p class="card-desc">' + w.desc + '</p>' +
          '<div class="card-meta">' +
            '<span class="meta-item">⏱ <strong>' + w.minutes + '</strong> Min</span>' +
            '<span class="meta-item">🔁 <strong>' + roundTxt + '</strong></span>' +
            '<span class="meta-item">📋 <strong>' + w.exercises.length + '</strong> Übungen</span>' +
          '</div>' +
          '<ul class="ex-list">' + exPreview + more + '</ul>' +
          '<button class="card-cta" data-start="' + w.id + '" data-cat="' + key + '">▶ Training starten</button>' +
        '</article>'
      );
    }).join('');

    view.innerHTML =
      '<section class="section-intro">' +
        '<h2>' + meta.emoji + ' ' + meta.label + '</h2>' +
        '<p>' + meta.sub + '</p>' +
        '<div class="tip">💡 ' + TIPS[key] + '</div>' +
      '</section>' +
      '<div class="grid">' + cards + '</div>';
  }

  function render(tab) {
    if (tab === 'home') renderHome();
    else renderCategory(tab);
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------------------ Tab-Wechsel */
  function setTab(tab) {
    Array.prototype.forEach.call(tabsEl.children, function (btn) {
      btn.classList.toggle('is-active', btn.dataset.tab === tab);
    });
    render(tab);
  }

  tabsEl.addEventListener('click', function (e) {
    const btn = e.target.closest('.tab');
    if (btn) setTab(btn.dataset.tab);
  });

  view.addEventListener('click', function (e) {
    const clear = e.target.closest('[data-clear-history]');
    if (clear) {
      if (window.confirm('Trainings-Verlauf wirklich löschen?')) {
        saveHistory([]);
        renderHome();
      }
      return;
    }
    const goto = e.target.closest('[data-goto]');
    if (goto) { setTab(goto.dataset.goto); return; }
    const start = e.target.closest('[data-start]');
    if (start) {
      e.stopPropagation();
      startWorkout(start.dataset.cat, start.dataset.start);
    }
  });

  /* ============================================================ PLAYER ===== */
  const player = {
    el: document.getElementById('player'),
    title: document.getElementById('playerTitle'),
    stepCount: document.getElementById('playerStepCount'),
    stage: document.getElementById('playerStage'),
    phase: document.getElementById('playerPhase'),
    exercise: document.getElementById('playerExercise'),
    detail: document.getElementById('playerDetail'),
    next: document.getElementById('playerNext'),
    time: document.getElementById('playerTime'),
    ring: document.getElementById('ringFg'),
    ringWrap: document.querySelector('.timer-ring'),
    btnPlay: document.getElementById('btnPlay'),
    btnPrev: document.getElementById('btnPrev'),
    btnSkip: document.getElementById('btnSkip')
  };

  const RING_LEN = 2 * Math.PI * 54; // 339.292
  let steps = [];        // flache Liste aller Phasen
  let idx = 0;
  let remaining = 0;
  let total = 0;
  let ticking = false;
  let timer = null;
  let audioCtx = null;
  let currentWorkout = null; // für den Verlauf
  let currentSaved = false;

  function beep(freq, dur) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.frequency.value = freq;
      o.type = 'sine';
      o.connect(g); g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.001, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.4, audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
      o.start();
      o.stop(audioCtx.currentTime + dur);
    } catch (err) { /* Audio nicht verfügbar – egal */ }
  }

  /* Baut die flache Phasenliste aus einem Workout (inkl. Runden) */
  function buildSteps(workout) {
    const out = [];
    const rounds = workout.rounds || 1;
    out.push({ type: 'ready', name: 'Bereit machen', detail: workout.title, dur: 10 });

    for (let r = 0; r < rounds; r++) {
      workout.exercises.forEach(function (ex) {
        out.push({
          type: 'work',
          name: ex.name,
          detail: ex.detail || '',
          amount: ex.reps || (ex.work + ' Sekunden'),
          dur: ex.work || 40,
          round: rounds > 1 ? (r + 1) : 0,
          totalRounds: rounds
        });
        if (ex.rest && ex.rest > 0) {
          out.push({ type: 'rest', name: 'Pause', detail: 'Durchatmen & locker bleiben', dur: ex.rest });
        }
      });
    }
    out.push({ type: 'done', name: 'Geschafft!', detail: workout.title, dur: 0 });
    return out;
  }

  function startWorkout(cat, id) {
    const workout = (WORKOUTS[cat] || []).find(function (w) { return w.id === id; });
    if (!workout) return;
    steps = buildSteps(workout);
    idx = 0;
    currentWorkout = { cat: cat, title: workout.title, minutes: workout.minutes };
    currentSaved = false;
    player.title.textContent = workout.title;
    player.el.hidden = false;
    document.body.style.overflow = 'hidden';
    // Audio bei User-Geste freischalten
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch (err) {}
    loadStep(0, false);
  }

  function workSteps() {
    return steps.filter(function (s) { return s.type === 'work'; }).length;
  }

  function loadStep(i, autostart) {
    stopTick();
    idx = i;
    const s = steps[i];

    if (s.type === 'done') { showDone(); return; }

    // Phase-Label
    let phaseLabel = 'Übung';
    player.ringWrap.classList.remove('is-rest', 'is-ready');
    player.phase.classList.remove('is-rest', 'is-ready');
    if (s.type === 'rest') {
      phaseLabel = 'Pause';
      player.ringWrap.classList.add('is-rest');
      player.phase.classList.add('is-rest');
    } else if (s.type === 'ready') {
      phaseLabel = 'Los geht\'s';
      player.ringWrap.classList.add('is-ready');
      player.phase.classList.add('is-ready');
    }
    if (s.round) phaseLabel += ' · Runde ' + s.round + '/' + s.totalRounds;
    player.phase.textContent = phaseLabel;

    player.exercise.textContent = s.name;
    player.detail.textContent = s.detail;
    player.stepCount.textContent = 'Schritt ' + (i + 1) + ' / ' + (steps.length - 1);

    // Nächste Übung anzeigen
    const nxt = steps[i + 1];
    if (nxt && nxt.type !== 'done') {
      player.next.textContent = 'Als Nächstes: ' + nxt.name;
    } else if (nxt && nxt.type === 'done') {
      player.next.textContent = 'Letzte Übung – durchziehen! 💪';
    } else {
      player.next.textContent = '';
    }

    // Bei Übungen mit Wiederholungen statt Zeit den amount mit zeigen
    if (s.type === 'work' && s.amount && /Wdh|Seite/.test(s.amount)) {
      player.detail.textContent = '🎯 ' + s.amount + '  ·  ' + s.detail;
    }

    total = s.dur;
    remaining = s.dur;
    updateTime();
    updateRing();

    if (autostart) startTick();
    else { ticking = false; player.btnPlay.textContent = 'Start'; player.btnPlay.classList.remove('is-paused'); }
  }

  function updateTime() {
    const m = Math.floor(remaining / 60);
    const sec = remaining % 60;
    player.time.textContent = (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function updateRing() {
    const frac = total > 0 ? remaining / total : 0;
    player.ring.style.strokeDasharray = RING_LEN;
    player.ring.style.strokeDashoffset = RING_LEN * (1 - frac);
  }

  function tick() {
    if (remaining <= 0) {
      beep(880, 0.18);
      next(true);
      return;
    }
    remaining--;
    updateTime();
    updateRing();
    if (remaining <= 3 && remaining > 0) beep(620, 0.12);
  }

  function startTick() {
    if (timer) clearInterval(timer);
    ticking = true;
    player.btnPlay.textContent = 'Pause';
    player.btnPlay.classList.add('is-paused');
    timer = setInterval(tick, 1000);
  }

  function stopTick() {
    if (timer) { clearInterval(timer); timer = null; }
    ticking = false;
    player.btnPlay.textContent = 'Start';
    player.btnPlay.classList.remove('is-paused');
  }

  function togglePlay() {
    if (steps[idx] && steps[idx].type === 'done') return;
    if (ticking) stopTick();
    else {
      try { if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume(); } catch (e) {}
      startTick();
    }
  }

  function next(auto) {
    if (idx < steps.length - 1) loadStep(idx + 1, auto === true);
  }
  function prev() {
    if (idx > 0) loadStep(idx - 1, false);
  }

  function showDone() {
    stopTick();
    // Einheit im Verlauf festhalten (nur einmal)
    if (currentWorkout && !currentSaved) {
      recordWorkout({
        ts: Date.now(),
        cat: currentWorkout.cat,
        title: currentWorkout.title,
        minutes: currentWorkout.minutes
      });
      currentSaved = true;
    }
    beep(660, 0.15);
    setTimeout(function () { beep(880, 0.25); }, 160);
    player.stage.innerHTML =
      '<div class="player-done">' +
        '<div class="done-emoji">🎉</div>' +
        '<h2>Geschafft!</h2>' +
        '<p>Starke Einheit. Vergiss das Cool-down nicht: 2–3 Minuten locker dehnen.</p>' +
      '</div>';
    player.btnPrev.style.visibility = 'hidden';
    player.btnSkip.style.visibility = 'hidden';
    player.btnPlay.textContent = 'Fertig';
    player.btnPlay.classList.remove('is-paused');
  }

  function closePlayer() {
    stopTick();
    player.el.hidden = true;
    document.body.style.overflow = '';
    // Stage zurücksetzen (Done-Ansicht ersetzt das Markup)
    restoreStage();
    // Aktive Ansicht neu rendern, damit ein frischer Verlauf sichtbar wird
    const active = tabsEl.querySelector('.tab.is-active');
    if (active) render(active.dataset.tab);
  }

  // Original-Stage-Markup sichern, um nach "Done" zurückzusetzen
  const stageOriginal = player.stage.innerHTML;
  function restoreStage() {
    player.stage.innerHTML = stageOriginal;
    // Referenzen neu binden
    player.phase = document.getElementById('playerPhase');
    player.exercise = document.getElementById('playerExercise');
    player.detail = document.getElementById('playerDetail');
    player.next = document.getElementById('playerNext');
    player.time = document.getElementById('playerTime');
    player.ring = document.getElementById('ringFg');
    player.ringWrap = document.querySelector('.timer-ring');
    player.btnPrev.style.visibility = 'visible';
    player.btnSkip.style.visibility = 'visible';
  }

  player.btnPlay.addEventListener('click', function () {
    if (steps[idx] && steps[idx].type === 'done') { closePlayer(); return; }
    togglePlay();
  });
  player.btnSkip.addEventListener('click', function () { next(false); });
  player.btnPrev.addEventListener('click', prev);
  document.getElementById('playerClose').addEventListener('click', closePlayer);

  /* Bildschirm wach halten (sofern unterstützt) */
  let wakeLock = null;
  async function requestWake() {
    try {
      if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
    } catch (e) {}
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && !player.el.hidden) requestWake();
  });
  player.btnPlay.addEventListener('click', requestWake, { once: true });

  /* ---------------------------------------------------------------- Start */
  setTab('home');
})();
