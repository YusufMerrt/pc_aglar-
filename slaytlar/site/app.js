// Soru bankası uygulama mantığı
(function () {
  'use strict';

  const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  const STORAGE_KEY = 'itn-quiz-v1';

  const TYPE_NAMES = {
    mcq: 'Çoktan seçmeli',
    fill: 'Boşluk doldurma',
    tf: 'Doğru / Yanlış'
  };

  // ----- State -----
  const state = {
    filter: { type: 'all', topic: 'all' },
    list: [],          // Şu anda gösterilen soru kimliklerinin listesi
    index: 0,
    answered: {},      // { id: { correct: bool, given: any } }
    reviewMode: false, // Yanlışları gözden geçirme modu
    examMode: false,   // Özel sınav modu
    examList: null,    // Sınav sorularının id listesi
    currentAnswer: null
  };

  // ----- LocalStorage -----
  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && typeof data === 'object') {
        state.answered = data.answered || {};
      }
    } catch (e) { /* ignore */ }
  }
  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answered: state.answered }));
    } catch (e) { /* ignore */ }
  }

  // ----- DOM -----
  const els = {
    card: document.getElementById('card'),
    feedback: document.getElementById('feedback'),
    statCorrect: document.getElementById('stat-correct'),
    statWrong: document.getElementById('stat-wrong'),
    statAnswered: document.getElementById('stat-answered'),
    counterCur: document.getElementById('counter-cur'),
    counterTotal: document.getElementById('counter-total'),
    typeTabs: document.getElementById('type-tabs'),
    topicFilter: document.getElementById('topic-filter'),
    examTopic: document.getElementById('exam-topic'),
    examType: document.getElementById('exam-type'),
    examCount: document.getElementById('exam-count'),
    examBanner: document.getElementById('exam-banner'),
    btnStartExam: document.getElementById('btn-start-exam'),
    btnStopExam: document.getElementById('btn-stop-exam'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    btnCheck: document.getElementById('btn-check'),
    btnReset: document.getElementById('btn-reset'),
    btnReview: document.getElementById('btn-review'),
    viewQuiz: document.getElementById('view-quiz'),
    viewNotes: document.getElementById('view-notes'),
    btnViewQuiz: document.getElementById('btn-view-quiz'),
    btnViewNotes: document.getElementById('btn-view-notes'),
    notesNav: document.getElementById('notes-nav'),
    notesContent: document.getElementById('notes-content')
  };

  // ----- Init topic filter -----
  function initTopicOptions() {
    const opts = [{ v: 'all', t: 'Tüm konular' }];
    Object.keys(TOPICS).forEach(k => opts.push({ v: k, t: TOPICS[k] }));
    [els.topicFilter, els.examTopic].forEach(sel => {
      sel.innerHTML = '';
      opts.forEach(o => {
        const option = document.createElement('option');
        option.value = o.v;
        option.textContent = o.t;
        sel.appendChild(option);
      });
    });
  }

  // ----- Filtering -----
  function applyFilter() {
    state.list = QUESTIONS
      .filter(q => state.filter.type === 'all' || q.type === state.filter.type)
      .filter(q => state.filter.topic === 'all' || q.topic === state.filter.topic)
      .map(q => q.id);
    state.index = 0;
    state.reviewMode = false;
    state.examMode = false;
    els.examBanner.style.display = 'none';
    els.btnStopExam.style.display = 'none';
    els.btnStartExam.style.display = '';
    render();
  }

  function getActiveList() {
    if (state.reviewMode) return state.list;
    if (state.examMode && state.examList) return state.examList;
    return state.list;
  }

  function getCurrentQuestion() {
    const list = getActiveList();
    const id = list[state.index];
    return QUESTIONS.find(q => q.id === id);
  }

  // ----- Render -----
  function render() {
    const list = getActiveList();
    const q = getCurrentQuestion();
    els.counterTotal.textContent = list.length;
    els.counterCur.textContent = list.length === 0 ? 0 : (state.index + 1);

    updateStats();

    if (!q) {
      if (state.reviewMode) {
        els.card.innerHTML = `
          <div class="review-empty">
            <h3 style="margin:6px 0 8px">Henüz yanlış yaptığınız soru yok</h3>
            <p>Soruları çözmeye başlayın ve yanlışlar burada birikecek.</p>
          </div>`;
      } else {
        els.card.innerHTML = `
          <div class="review-empty">
            <h3 style="margin:6px 0 8px">Eşleşen soru bulunamadı</h3>
            <p>Filtreyi değiştirmeyi deneyin.</p>
          </div>`;
      }
      els.feedback.style.display = 'none';
      els.btnCheck.disabled = true;
      els.btnNext.disabled = true;
      els.btnPrev.disabled = true;
      return;
    }

    state.currentAnswer = null;
    els.feedback.style.display = 'none';

    const topic = TOPICS[q.topic] || q.topic;
    const typeLabel = TYPE_NAMES[q.type] || q.type;

    let bodyHtml = '';
    if (q.type === 'mcq') bodyHtml = renderMcq(q);
    else if (q.type === 'fill') bodyHtml = renderFill(q);
    else if (q.type === 'tf') bodyHtml = renderTf(q);

    els.card.innerHTML = `
      <div class="qmeta">
        <span class="badge type-${q.type}">${typeLabel}</span>
        <span class="badge module">${topic}</span>
        <span class="badge">Soru #${q.id}</span>
      </div>
      <div class="qtitle">${escapeHtml(q.q)}</div>
      ${bodyHtml}
    `;

    bindInputs(q);

    els.btnPrev.disabled = state.index === 0;
    els.btnNext.disabled = state.index >= list.length - 1;
    els.btnCheck.disabled = false;
    els.btnCheck.textContent = 'Cevabı kontrol et';

    // Kullanıcı daha önce cevapladıysa, durumu geri göster
    const prev = state.answered[q.id];
    if (prev) {
      replayAnswer(q, prev);
    }
  }

  function renderMcq(q) {
    return `
      <div class="options" data-qid="${q.id}">
        ${q.options.map((opt, i) => `
          <label class="opt" data-i="${i}">
            <input type="radio" name="opt-${q.id}" value="${i}" />
            <span class="letter">${LETTERS[i]}</span>
            <span class="otext">${escapeHtml(opt)}</span>
          </label>
        `).join('')}
      </div>
    `;
  }

  function renderFill(q) {
    return `
      <input class="fill-input" type="text" id="fill-${q.id}"
        placeholder="Cevabınızı yazın..." autocomplete="off" />
      <p style="color:var(--muted); font-size:12.5px; margin-top:8px">
        İpucu: büyük/küçük harf ve Türkçe karakter duyarsız eşleştirme kullanılır.
      </p>
    `;
  }

  function renderTf(q) {
    return `
      <div class="tf-grid">
        <button type="button" class="tf-btn" data-val="true">Doğru</button>
        <button type="button" class="tf-btn" data-val="false">Yanlış</button>
      </div>
    `;
  }

  function bindInputs(q) {
    if (q.type === 'mcq') {
      const opts = els.card.querySelectorAll('.opt');
      opts.forEach(opt => {
        opt.addEventListener('click', (e) => {
          if (e.target && e.target.tagName === 'INPUT') {
            // radio zaten kendi davranışını yapacak
          }
          opts.forEach(o => {
            o.classList.remove('selected');
            o.classList.remove('correct');
            o.classList.remove('wrong');
          });
          opt.classList.add('selected');
          const radio = opt.querySelector('input');
          if (radio) radio.checked = true;
          state.currentAnswer = parseInt(opt.dataset.i, 10);
          els.btnCheck.disabled = false;
          els.btnCheck.textContent = 'Cevabı kontrol et';
          els.feedback.style.display = 'none';
        });
      });
    } else if (q.type === 'fill') {
      const input = document.getElementById(`fill-${q.id}`);
      if (input) {
        input.addEventListener('input', () => {
          state.currentAnswer = input.value;
          input.style.borderColor = '';
          input.style.background = '';
          els.btnCheck.disabled = false;
          els.btnCheck.textContent = 'Cevabı kontrol et';
          els.feedback.style.display = 'none';
        });
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            checkAnswer();
          }
        });
      }
    } else if (q.type === 'tf') {
      const btns = els.card.querySelectorAll('.tf-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = e.currentTarget;
          btns.forEach(b => {
            b.classList.remove('selected');
            b.classList.remove('correct');
            b.classList.remove('wrong');
          });
          target.classList.add('selected');
          state.currentAnswer = target.dataset.val === 'true';
          els.btnCheck.disabled = false;
          els.btnCheck.textContent = 'Cevabı kontrol et';
          els.feedback.style.display = 'none';
        });
      });
    }
  }

  // ----- Answer checking -----
  function normalizeText(s) {
    if (s == null) return '';
    return String(s)
      .toLocaleLowerCase('tr-TR')
      .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u')
      .replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function checkCorrect(q, given) {
    if (q.type === 'mcq') {
      return given === q.answer;
    } else if (q.type === 'tf') {
      return given === q.answer;
    } else if (q.type === 'fill') {
      const g = normalizeText(given);
      if (!g) return false;
      return q.answer.some(a => normalizeText(a) === g);
    }
    return false;
  }

  function checkAnswer() {
    const q = getCurrentQuestion();
    if (!q) return;

    // Kullanıcı cevap vermediyse
    if (state.currentAnswer == null ||
        (q.type === 'fill' && String(state.currentAnswer).trim() === '')) {
      flashFeedback('Lütfen bir cevap seçin ya da yazın.');
      return;
    }

    const correct = checkCorrect(q, state.currentAnswer);

    state.answered[q.id] = {
      correct,
      given: state.currentAnswer,
      ts: Date.now()
    };
    saveStorage();

    showAnswerFeedback(q, correct);
    updateStats();

    els.btnCheck.disabled = true;
    els.btnCheck.textContent = correct ? 'Doğru ✓' : 'Yanlış ✗';
  }

  function showAnswerFeedback(q, correct) {
    // Görselleştirme
    if (q.type === 'mcq') {
      els.card.querySelectorAll('.opt').forEach(opt => {
        const i = parseInt(opt.dataset.i, 10);
        if (i === q.answer) opt.classList.add('correct');
        if (i === state.currentAnswer && !correct) opt.classList.add('wrong');
      });
    } else if (q.type === 'tf') {
      els.card.querySelectorAll('.tf-btn').forEach(btn => {
        const val = btn.dataset.val === 'true';
        if (val === q.answer) btn.classList.add('correct');
        if (val === state.currentAnswer && !correct) btn.classList.add('wrong');
      });
    } else if (q.type === 'fill') {
      const input = document.getElementById(`fill-${q.id}`);
      if (input) {
        input.style.borderColor = correct ? 'var(--good)' : 'var(--bad)';
        input.style.background = correct ? 'var(--good-50)' : 'var(--bad-50)';
      }
    }

    // Açıklama kutusu
    els.feedback.style.display = '';
    els.feedback.className = 'feedback ' + (correct ? 'good' : 'bad');
    let correctAnswerText = '';
    if (q.type === 'mcq') correctAnswerText = `${LETTERS[q.answer]}) ${q.options[q.answer]}`;
    else if (q.type === 'tf') correctAnswerText = q.answer ? 'Doğru' : 'Yanlış';
    else if (q.type === 'fill') correctAnswerText = q.answer[0];

    els.feedback.innerHTML = `
      <h4>${correct ? '✓ Doğru cevap!' : '✗ Yanlış cevap'}</h4>
      ${correct ? '' : `<div><strong>Doğru cevap:</strong> ${escapeHtml(correctAnswerText)}</div>`}
      <div class="why">${escapeHtml(q.explain || '')}</div>
    `;
  }

  function replayAnswer(q, prev) {
    state.currentAnswer = prev.given;
    if (q.type === 'mcq') {
      const opt = els.card.querySelector(`.opt[data-i="${prev.given}"]`);
      if (opt) opt.classList.add('selected');
      const radio = opt?.querySelector('input');
      if (radio) radio.checked = true;
    } else if (q.type === 'tf') {
      const btn = els.card.querySelector(`.tf-btn[data-val="${prev.given}"]`);
      if (btn) btn.classList.add('selected');
    } else if (q.type === 'fill') {
      const input = document.getElementById(`fill-${q.id}`);
      if (input) input.value = prev.given || '';
    }
    // Kullanıcının görmesi için geri gösterim
    showAnswerFeedback(q, prev.correct);
    els.btnCheck.disabled = true;
    els.btnCheck.textContent = prev.correct ? 'Doğru ✓' : 'Yanlış ✗';
  }

  function flashFeedback(msg) {
    els.feedback.style.display = '';
    els.feedback.className = 'feedback';
    els.feedback.innerHTML = `<div>${escapeHtml(msg)}</div>`;
  }

  // ----- Stats -----
  function updateStats() {
    const vals = Object.values(state.answered);
    const correct = vals.filter(v => v.correct).length;
    const wrong = vals.filter(v => !v.correct).length;
    els.statCorrect.textContent = correct;
    els.statWrong.textContent = wrong;
    els.statAnswered.textContent = vals.length;
  }

  // ----- Navigation -----
  function go(delta) {
    const list = getActiveList();
    const ni = state.index + delta;
    if (ni < 0 || ni >= list.length) return;
    state.index = ni;
    render();
  }

  // ----- Review mode -----
  function enterReview() {
    const wrongIds = Object.entries(state.answered)
      .filter(([, v]) => !v.correct)
      .map(([id]) => parseInt(id, 10));
    if (wrongIds.length === 0) {
      state.reviewMode = true;
      state.list = [];
      state.index = 0;
      render();
      return;
    }
    state.reviewMode = true;
    state.examMode = false;
    state.list = wrongIds;
    state.index = 0;
    els.examBanner.style.display = '';
    els.examBanner.innerHTML = `
      <strong>Yanlışları gözden geçir</strong> · ${wrongIds.length} soru.
      <a href="#" id="exit-review" style="color:var(--primary)">Normal moda dön</a>
    `;
    document.getElementById('exit-review').addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter();
    });
    els.btnStopExam.style.display = 'none';
    els.btnStartExam.style.display = '';
    render();
  }

  // ----- Exam mode -----
  function startExam() {
    const topic = els.examTopic.value;
    const type = els.examType.value;
    const count = Math.max(1, parseInt(els.examCount.value, 10) || 20);

    const pool = QUESTIONS
      .filter(q => topic === 'all' || q.topic === topic)
      .filter(q => type === 'all' || q.type === type);

    if (pool.length === 0) {
      alert('Seçilen filtreye uygun soru bulunamadı.');
      return;
    }

    // Shuffle
    const shuffled = pool.slice().sort(() => Math.random() - 0.5);
    const n = Math.min(count, shuffled.length);
    const picked = shuffled.slice(0, n).map(q => q.id);

    state.examMode = true;
    state.reviewMode = false;
    state.examList = picked;
    state.index = 0;

    els.examBanner.style.display = '';
    els.examBanner.innerHTML = `
      <strong>Sınav modu</strong> ·
      ${topic === 'all' ? 'Tüm konular' : TOPICS[topic]} ·
      ${type === 'all' ? 'Tüm türler' : TYPE_NAMES[type]} ·
      ${n} soru.
    `;
    els.btnStopExam.style.display = '';
    els.btnStartExam.style.display = 'none';
    render();
  }

  function stopExam() {
    state.examMode = false;
    state.examList = null;
    applyFilter();
  }

  // ----- Reset -----
  function resetAll() {
    if (!confirm('Tüm ilerlemeyi sıfırlamak istiyor musunuz? (doğru/yanlış istatistikleri silinecek)')) return;
    state.answered = {};
    saveStorage();
    state.index = 0;
    render();
  }

  // ----- Helpers -----
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ----- Notes view -----
  function initNotes() {
    if (typeof NOTES === 'undefined' || !Array.isArray(NOTES)) return;
    els.notesNav.innerHTML = NOTES.map(m =>
      `<a href="#${m.id}" class="notes-nav-link" data-id="${m.id}">${escapeHtml(m.title)}</a>`
    ).join('');

    els.notesContent.innerHTML = NOTES.map(m => `
      <section class="notes-module" id="${m.id}">
        <h2 class="notes-module-title">${escapeHtml(m.title)}</h2>
        ${m.sections.map(s => `
          <div class="notes-section">
            <h3 class="notes-section-title">${escapeHtml(s.h)}</h3>
            <div class="notes-body">${s.body}</div>
          </div>
        `).join('')}
      </section>
    `).join('');

    els.notesNav.addEventListener('click', (e) => {
      const link = e.target.closest('.notes-nav-link');
      if (!link) return;
      e.preventDefault();
      const id = link.dataset.id;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      els.notesNav.querySelectorAll('.notes-nav-link').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  }

  function switchView(view) {
    if (view === 'notes') {
      els.viewQuiz.style.display = 'none';
      els.viewNotes.style.display = '';
      els.btnViewQuiz.classList.remove('active');
      els.btnViewNotes.classList.add('active');
    } else {
      els.viewQuiz.style.display = '';
      els.viewNotes.style.display = 'none';
      els.btnViewQuiz.classList.add('active');
      els.btnViewNotes.classList.remove('active');
    }
  }

  // ----- Wire up events -----
  function initEvents() {
    els.typeTabs.addEventListener('click', (e) => {
      const t = e.target.closest('.tab');
      if (!t) return;
      els.typeTabs.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      t.classList.add('active');
      state.filter.type = t.dataset.type;
      applyFilter();
    });

    els.topicFilter.addEventListener('change', () => {
      state.filter.topic = els.topicFilter.value;
      applyFilter();
    });

    els.btnPrev.addEventListener('click', () => go(-1));
    els.btnNext.addEventListener('click', () => go(+1));
    els.btnCheck.addEventListener('click', () => {
      // Eğer zaten cevaplanmışsa, "Cevabı kontrol et" tuşu sonraki soruya götürür
      if (els.btnCheck.disabled) return;
      checkAnswer();
    });

    els.btnReset.addEventListener('click', resetAll);
    els.btnReview.addEventListener('click', enterReview);
    els.btnStartExam.addEventListener('click', startExam);
    els.btnStopExam.addEventListener('click', stopExam);

    if (els.btnViewQuiz) els.btnViewQuiz.addEventListener('click', () => switchView('quiz'));
    if (els.btnViewNotes) els.btnViewNotes.addEventListener('click', () => switchView('notes'));

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') go(+1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Enter') checkAnswer();
    });
  }

  // ----- Boot -----
  function boot() {
    loadStorage();
    initTopicOptions();
    initNotes();
    initEvents();
    applyFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
