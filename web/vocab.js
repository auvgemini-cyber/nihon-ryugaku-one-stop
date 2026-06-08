const MODE_LABELS = {
  browse: "浏览单词",
  listen: "听音选假名",
  kana2zh: "看假名选中文",
  spell: "看中文拼假名",
  listenKanji: "听音选汉字",
  kana2kanji: "看假名选汉字",
  kanji2kana: "看汉字选假名"
}

const state = {
  mode: "browse",
  unitId: "intro",
  lessonId: "intro",
  deck: [],
  deckIndex: 0,
  current: null,
  options: [],
  completed: false,
  selectedAnswer: "",
  wrongSelections: new Set(),
  spellChars: [],
  stats: { answered: 0, correct: 0 }
}

const $ = id => document.getElementById(id)
const els = {
  correctCount: $("correctCount"),
  answeredCount: $("answeredCount"),
  bookSelect: $("bookSelect"),
  unitSelect: $("unitSelect"),
  lessonSelect: $("lessonSelect"),
  modeTabs: Array.from(document.querySelectorAll(".vocab-mode-tab")),
  practiceArea: $("practiceArea")
}

let audioCtx = null

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n)
}

function getUnit() {
  return VOCAB_DATA.units.find(u => u.id === state.unitId)
}

function getLesson() {
  const unit = getUnit()
  if (!unit) return null
  return unit.lessons.find(l => l.id === state.lessonId)
}

function getWords() {
  const lesson = getLesson()
  return lesson ? lesson.words : []
}

function updateStats() {
  els.correctCount.textContent = String(state.stats.correct)
  els.answeredCount.textContent = "/" + String(state.stats.answered)
}

function fillSelectors() {
  els.bookSelect.innerHTML = ""
  const opt = document.createElement("option")
  opt.value = VOCAB_DATA.bookId
  opt.textContent = "七年级"
  els.bookSelect.appendChild(opt)

  els.unitSelect.innerHTML = ""
  VOCAB_DATA.units.forEach(u => {
    const o = document.createElement("option")
    o.value = u.id
    o.textContent = u.title
    o.selected = u.id === state.unitId
    els.unitSelect.appendChild(o)
  })

  updateLessonSelect()
}

function updateLessonSelect() {
  els.lessonSelect.innerHTML = ""
  const unit = getUnit()
  if (!unit) return
  unit.lessons.forEach(l => {
    const o = document.createElement("option")
    o.value = l.id
    o.textContent = l.title + " (" + l.words.length + "词)"
    o.selected = l.id === state.lessonId
    els.lessonSelect.appendChild(o)
  })
}

function renderModeTabs() {
  els.modeTabs.forEach(tab => {
    tab.classList.toggle("is-active", tab.dataset.vocabMode === state.mode)
  })
}

function getKanjiModes() {
  return ["listenKanji", "kana2kanji", "kanji2kana"]
}

function getDeckWords() {
  const words = getWords()
  if (getKanjiModes().includes(state.mode)) {
    return words.filter(w => w.kanji)
  }
  return words
}

function startSession() {
  const words = getDeckWords()
  if (!words.length) {
    els.practiceArea.innerHTML = "<p style='text-align:center;padding:40px;color:var(--muted);font-weight:800;'>该课程暂无词汇数据" + (getKanjiModes().includes(state.mode) ? "（此模式需要单词有汉字表记）" : "") + "</p>"
    return
  }
  state.deck = shuffle(words)
  state.deckIndex = 0
  state.stats = { answered: 0, correct: 0 }
  state.completed = false
  state.selectedAnswer = ""
  state.wrongSelections = new Set()
  state.spellChars = []
  state.current = null
  renderCard()
}

function renderCard() {
  renderModeTabs()
  updateStats()

  if (!state.deck.length || state.deckIndex >= state.deck.length) {
    renderComplete()
    return
  }

  state.current = state.deck[state.deckIndex]
  state.completed = false
  state.selectedAnswer = ""
  state.wrongSelections = new Set()
  state.spellChars = []

  const mode = state.mode
  const area = els.practiceArea

  if (mode === "browse") renderBrowse(area)
  else if (mode === "listen") renderListen(area)
  else if (mode === "kana2zh") renderKana2Zh(area)
  else if (mode === "spell") renderSpell(area)
  else if (mode === "listenKanji") renderListenKanji(area)
  else if (mode === "kana2kanji") renderKana2Kanji(area)
  else if (mode === "kanji2kana") renderKanji2Kana(area)
}

function renderComplete() {
  const area = els.practiceArea
  const total = state.stats.answered
  const correct = state.stats.correct
  const pct = total > 0 ? Math.round(correct / total * 100) : 0

  area.innerHTML = `
    <div style="text-align:center;padding:40px;">
      <div style="font-size:72px;font-weight:900;color:var(--green);">✓</div>
      <h2 style="margin:12px 0 0;">练习完成</h2>
      <p style="color:var(--muted);font-size:18px;font-weight:700;">
        答对 ${correct}/${total} · 正确率 ${pct}%
      </p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:20px;">
        <button class="secondary-button" onclick="startSession()">重新开始</button>
        <button class="primary-button" onclick="resetStats()">换组练习</button>
      </div>
    </div>
  `
}

function resetStats() {
  state.deck = shuffle(getWords())
  state.deckIndex = 0
  state.stats = { answered: 0, correct: 0 }
  renderCard()
}

function displayKana(item) {
  return item.kana
}

function displayKanji(item) {
  return item.kanji || ""
}

function playTone(freqs, dur) {
  if (!audioCtx) {
    const C = window.AudioContext || window.webkitAudioContext
    if (!C) return
    audioCtx = new C()
  }
  if (audioCtx.state === "suspended") audioCtx.resume().catch(() => {})
  const t = audioCtx.currentTime
  freqs.forEach((f, i) => {
    const osc = audioCtx.createOscillator()
    const g = audioCtx.createGain()
    osc.type = "sine"
    osc.frequency.setValueAtTime(f, t + i * 0.09)
    g.gain.setValueAtTime(0.0001, t + i * 0.09)
    g.gain.exponentialRampToValueAtTime(0.12, t + i * 0.09 + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.09 + (dur || 0.28))
    osc.connect(g)
    g.connect(audioCtx.destination)
    osc.start(t + i * 0.09)
    osc.stop(t + i * 0.09 + (dur || 0.28) + 0.03)
  })
}

function playCorrect() {
  playTone([880, 1174.66, 1567.98], 0.28)
}

function playWrong() {
  playTone([196, 146.83], 0.18)
}

function speakWord(text) {
  if (!window.speechSynthesis) return
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = "ja-JP"
  utter.rate = 0.85
  speechSynthesis.cancel()
  speechSynthesis.speak(utter)
}

// ============ BROWSE MODE ============
function renderBrowse(area) {
  const words = state.deck
  let html = `<div class="word-count">共 ${words.length} 个单词</div><div class="browse-list">`
  words.forEach(w => {
    const kj = w.kanji ? `<span class="kanji-hint">${w.kanji}</span>` : ""
    const m = w.meaning || ""
    html += `<div class="browse-item">
      <div><span class="ja">${w.kana}</span> ${kj}</div>
      <div class="zh">${m}</div>
    </div>`
  })
  html += `</div>
    <div class="nav-buttons" style="margin-top:16px;">
      <button class="secondary-button" onclick="resetStats()">重新开始</button>
      <button class="primary-button" onclick="setMode('listen')">开始练习 →</button>
    </div>`
  area.innerHTML = html
}

// ============ LISTEN MODE ============
function renderListen(area) {
  const w = state.current
  const options = shuffle([
    w,
    ...pickRandom(getWords().filter(x => x.kana !== w.kana), 3)
  ])

  area.innerHTML = `
    <div class="word-display" style="cursor:pointer;" onclick="speakWord('${w.kana}')">
      <span class="hint">点击听读音</span>
      <span style="font-size:20px;margin-top:8px;color:var(--muted);">🔊</span>
    </div>
    <div class="options-grid" id="listenOptions"></div>
    <div class="feedback-area" id="feedbackArea"></div>
    <div class="word-count">${state.deckIndex + 1} / ${state.deck.length}</div>
    <div class="nav-buttons">
      <button class="secondary-button" onclick="startSession()">重练本组</button>
      <button class="primary-button" id="nextBtn" disabled onclick="nextCard()">下一题</button>
    </div>
  `

  const grid = $("listenOptions")
  options.forEach(opt => {
    const btn = document.createElement("button")
    btn.className = "option-btn"
    btn.textContent = displayKana(opt)
    btn.disabled = state.completed
    btn.addEventListener("click", () => {
      if (state.completed) return
      const correct = opt.kana === w.kana
      if (correct) {
        state.completed = true
        state.stats.answered += 1
        state.stats.correct += 1
        btn.classList.add("is-correct")
        playCorrect()
        showFeedback(true, w)
        $("nextBtn").disabled = false
      } else {
        state.stats.answered += 1
        btn.classList.add("is-wrong")
        playWrong()
        showFeedback(false, w)
        setTimeout(() => { btn.classList.remove("is-wrong") }, 400)
      }
      updateStats()
    })
    grid.appendChild(btn)
  })

  setTimeout(() => speakWord(w.kana), 300)
}

// ============ KANA → ZH MODE ============
function renderKana2Zh(area) {
  const w = state.current
  const allWords = getWords()
  const otherMeanings = allWords
    .filter(x => x.kana !== w.kana && x.meaning)
    .map(x => x.meaning)

  const wrongOptions = pickRandom(otherMeanings, 3)
  if (wrongOptions.length < 3) {
    const fallback = ["你好", "学校", "老师", "学生", "苹果", "书"].filter(m => m !== w.meaning)
    while (wrongOptions.length < 3 && fallback.length) {
      const f = fallback.pop()
      if (f !== w.meaning) wrongOptions.push(f)
    }
  }

  const options = shuffle([w.meaning || "", ...wrongOptions])

  area.innerHTML = `
    <div class="word-display">
      ${displayKana(w)}
      ${w.kanji ? `<span class="sub">${w.kanji}</span>` : ""}
    </div>
    <div class="options-grid" id="zhOptions"></div>
    <div class="feedback-area" id="feedbackArea"></div>
    <div class="word-count">${state.deckIndex + 1} / ${state.deck.length}</div>
    <div class="nav-buttons">
      <button class="secondary-button" onclick="startSession()">重练本组</button>
      <button class="primary-button" id="nextBtn" disabled onclick="nextCard()">下一题</button>
    </div>
  `

  const grid = $("zhOptions")
  options.forEach(m => {
    if (!m) return
    const btn = document.createElement("button")
    btn.className = "option-btn"
    btn.textContent = m
    btn.style.fontSize = "20px"
    btn.disabled = state.completed
    btn.addEventListener("click", () => {
      if (state.completed) return
      const correct = m === w.meaning
      if (correct) {
        state.completed = true
        state.stats.answered += 1
        state.stats.correct += 1
        btn.classList.add("is-correct")
        playCorrect()
        showFeedback(true, w)
        $("nextBtn").disabled = false
      } else {
        state.stats.answered += 1
        btn.classList.add("is-wrong")
        playWrong()
        showFeedback(false, w)
        setTimeout(() => { btn.classList.remove("is-wrong") }, 400)
      }
      updateStats()
    })
    grid.appendChild(btn)
  })
}

// ============ SPELL MODE ============
function renderSpell(area) {
  const w = state.current
  const target = w.kana
  state.spellChars = []

  area.innerHTML = `
    <div class="word-display" style="font-size:36px;">
      ${w.meaning || "（无释义）"}
      ${w.kanji ? `<span class="sub">${w.kanji}</span>` : ""}
      <span class="sub" style="margin-top:4px;font-size:15px;color:var(--muted);">请用下方假名拼出读音</span>
    </div>
    <div class="spell-area" id="spellArea">
      <span class="cursor"></span>
    </div>
    <div class="kana-picker" id="kanaPicker"></div>
    <div class="spell-actions">
      <button onclick="spellBackspace()">← 退格</button>
      <button onclick="spellClear()">清除</button>
      <button class="submit-btn" onclick="spellSubmit()">确认</button>
    </div>
    <div class="feedback-area" id="feedbackArea"></div>
    <div class="word-count">${state.deckIndex + 1} / ${state.deck.length}</div>
    <div class="nav-buttons">
      <button class="secondary-button" onclick="startSession()">重练本组</button>
      <button class="primary-button" id="nextBtn" disabled onclick="nextCard()">下一题</button>
    </div>
  `

  const picker = $("kanaPicker")
  kanaGrid.forEach(group => {
    const div = document.createElement("div")
    div.className = "kana-group"
    group.forEach(k => {
      const btn = document.createElement("button")
      btn.className = "kana-pick-btn"
      btn.textContent = k
      btn.dataset.kana = k
      btn.addEventListener("click", () => spellAdd(k))
      div.appendChild(btn)
    })
    picker.appendChild(div)
  })
}

window.spellAdd = function(k) {
  if (state.completed) return
  state.spellChars.push(k)
  updateSpellArea()
}

window.spellBackspace = function() {
  if (state.completed) return
  state.spellChars.pop()
  updateSpellArea()
}

window.spellClear = function() {
  if (state.completed) return
  state.spellChars = []
  updateSpellArea()
}

window.spellSubmit = function() {
  if (state.completed) return
  const w = state.current
  const typed = state.spellChars.join("")
  const target = w.kana
  const correct = typed === target

  if (correct) {
    state.completed = true
    state.stats.answered += 1
    state.stats.correct += 1
    playCorrect()
    showFeedback(true, w)
    $("nextBtn").disabled = false
  } else {
    state.stats.answered += 1
    playWrong()
    showFeedback(false, w)
    // Show correct answer
    const area = $("spellArea")
    area.innerHTML = `<span style="color:var(--red-dark);">✗ ${typed}</span> <span style="color:var(--green);font-weight:900;">→ ${target}</span>`
    $("nextBtn").disabled = false
    state.completed = true
  }
  updateStats()
}

function updateSpellArea() {
  const area = $("spellArea")
  if (!area) return
  let html = ""
  state.spellChars.forEach(c => {
    html += `<span class="slot filled">${c}</span>`
  })
  if (!state.completed) {
    html += `<span class="cursor"></span>`
  }
  area.innerHTML = html
}

// ============ LISTEN → KANJI MODE ============
function renderListenKanji(area) {
  const w = state.current
  const deck = getDeckWords()
  const options = shuffle([
    w,
    ...pickRandom(deck.filter(x => x.kana !== w.kana), 3)
  ])

  area.innerHTML = `
    <div class="word-display" style="cursor:pointer;" onclick="speakWord('${w.kana}')">
      <span class="hint">点击听读音</span>
      <span style="font-size:20px;margin-top:8px;color:var(--muted);">🔊</span>
    </div>
    <div class="options-grid" id="kanjiOptions"></div>
    <div class="feedback-area" id="feedbackArea"></div>
    <div class="word-count">${state.deckIndex + 1} / ${state.deck.length}</div>
    <div class="nav-buttons">
      <button class="secondary-button" onclick="startSession()">重练本组</button>
      <button class="primary-button" id="nextBtn" disabled onclick="nextCard()">下一题</button>
    </div>
  `

  const grid = $("kanjiOptions")
  options.forEach(opt => {
    const btn = document.createElement("button")
    btn.className = "option-btn"
    btn.textContent = opt.kanji || opt.kana
    btn.style.fontSize = "28px"
    btn.disabled = state.completed
    btn.addEventListener("click", () => {
      if (state.completed) return
      const correct = opt.kana === w.kana
      if (correct) {
        state.completed = true
        state.stats.answered += 1
        state.stats.correct += 1
        btn.classList.add("is-correct")
        playCorrect()
        showFeedback(true, w)
        $("nextBtn").disabled = false
      } else {
        state.stats.answered += 1
        btn.classList.add("is-wrong")
        playWrong()
        showFeedback(false, w)
        setTimeout(() => { btn.classList.remove("is-wrong") }, 400)
      }
      updateStats()
    })
    grid.appendChild(btn)
  })

  setTimeout(() => speakWord(w.kana), 300)
}

// ============ KANA → KANJI MODE ============
function renderKana2Kanji(area) {
  const w = state.current
  const deck = getDeckWords()
  const options = shuffle([
    w,
    ...pickRandom(deck.filter(x => x.kana !== w.kana), 3)
  ])

  area.innerHTML = `
    <div class="word-display">
      ${displayKana(w)}
      <span class="sub" style="font-size:15px;color:var(--muted);">选择对应的汉字</span>
    </div>
    <div class="options-grid" id="kanjiOptions"></div>
    <div class="feedback-area" id="feedbackArea"></div>
    <div class="word-count">${state.deckIndex + 1} / ${state.deck.length}</div>
    <div class="nav-buttons">
      <button class="secondary-button" onclick="startSession()">重练本组</button>
      <button class="primary-button" id="nextBtn" disabled onclick="nextCard()">下一题</button>
    </div>
  `

  const grid = $("kanjiOptions")
  options.forEach(opt => {
    const btn = document.createElement("button")
    btn.className = "option-btn"
    btn.textContent = opt.kanji || opt.kana
    btn.style.fontSize = "28px"
    btn.disabled = state.completed
    btn.addEventListener("click", () => {
      if (state.completed) return
      const correct = opt.kana === w.kana
      if (correct) {
        state.completed = true
        state.stats.answered += 1
        state.stats.correct += 1
        btn.classList.add("is-correct")
        playCorrect()
        showFeedback(true, w)
        $("nextBtn").disabled = false
      } else {
        state.stats.answered += 1
        btn.classList.add("is-wrong")
        playWrong()
        showFeedback(false, w)
        setTimeout(() => { btn.classList.remove("is-wrong") }, 400)
      }
      updateStats()
    })
    grid.appendChild(btn)
  })
}

// ============ KANJI → KANA MODE ============
function renderKanji2Kana(area) {
  const w = state.current
  const deck = getDeckWords()
  const options = shuffle([
    w,
    ...pickRandom(deck.filter(x => x.kana !== w.kana), 3)
  ])

  area.innerHTML = `
    <div class="word-display" style="font-size:42px;">
      ${w.kanji || displayKana(w)}
      <span class="sub" style="font-size:15px;color:var(--muted);">选择对应的假名读音</span>
    </div>
    <div class="options-grid" id="kanaOptions"></div>
    <div class="feedback-area" id="feedbackArea"></div>
    <div class="word-count">${state.deckIndex + 1} / ${state.deck.length}</div>
    <div class="nav-buttons">
      <button class="secondary-button" onclick="startSession()">重练本组</button>
      <button class="primary-button" id="nextBtn" disabled onclick="nextCard()">下一题</button>
    </div>
  `

  const grid = $("kanaOptions")
  options.forEach(opt => {
    const btn = document.createElement("button")
    btn.className = "option-btn"
    btn.textContent = displayKana(opt)
    btn.style.fontSize = "24px"
    btn.disabled = state.completed
    btn.addEventListener("click", () => {
      if (state.completed) return
      const correct = opt.kana === w.kana
      if (correct) {
        state.completed = true
        state.stats.answered += 1
        state.stats.correct += 1
        btn.classList.add("is-correct")
        playCorrect()
        showFeedback(true, w)
        $("nextBtn").disabled = false
      } else {
        state.stats.answered += 1
        btn.classList.add("is-wrong")
        playWrong()
        showFeedback(false, w)
        setTimeout(() => { btn.classList.remove("is-wrong") }, 400)
      }
      updateStats()
    })
    grid.appendChild(btn)
  })
}

// ============ SHARED ============
function showFeedback(correct, word) {
  const fb = $("feedbackArea")
  if (!fb) return
  if (correct) {
    fb.textContent = `✓ 正确！${word.kana}`
    fb.className = "feedback-area correct"
  } else {
    fb.textContent = `✗ 正确答案：${word.kana}`
    fb.className = "feedback-area wrong"
  }
}

function nextCard() {
  if (!state.completed) return
  const next = state.deckIndex + 1
  if (next >= state.deck.length) {
    renderComplete()
    return
  }
  state.deckIndex = next
  renderCard()
}

function setMode(mode) {
  state.mode = mode
  startSession()
}

// ============ EVENTS ============
els.modeTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const m = tab.dataset.vocabMode
    if (m === state.mode) return
    state.mode = m
    startSession()
  })
})

els.unitSelect.addEventListener("change", () => {
  state.unitId = els.unitSelect.value
  updateLessonSelect()
  state.lessonId = getUnit().lessons[0].id
  startSession()
})

els.lessonSelect.addEventListener("change", () => {
  state.lessonId = els.lessonSelect.value
  startSession()
})

// ============ INIT ============
fillSelectors()
startSession()
