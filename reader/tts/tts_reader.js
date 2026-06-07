const BOOKS = {
  "grade-7-tts": {
    label: "七年级教材点读",
    url: "reader/books/grade-7-tts/book.json",
    mode: "tts",
    statusText: "点击红框试听 TTS 朗读文本"
  },
  "grade-8": {
    label: "八年级教材点读",
    url: "reader/books/grade-8/book.json",
    mode: "audio",
    statusText: "点击红框播放对应课文音频片段"
  }
}

const params = new URLSearchParams(window.location.search)
const requestedBook = params.get("book") || "grade-7-tts"
const activeBookMeta = BOOKS[requestedBook] || BOOKS["grade-7-tts"]

const state = {
  book: null,
  bookBase: "",
  bookMode: activeBookMeta.mode,
  pageIndex: 0,
  activeHotspotId: "",
  voices: []
}

const elements = {
  bookTitle: document.getElementById("bookTitle"),
  bookSubtitle: document.getElementById("bookSubtitle"),
  prevButton: document.getElementById("prevButton"),
  nextHotspotButton: document.getElementById("nextHotspotButton"),
  nextButton: document.getElementById("nextButton"),
  pageInput: document.getElementById("pageInput"),
  pageStatus: document.getElementById("pageStatus"),
  hotspotStatus: document.getElementById("hotspotStatus"),
  bookStage: document.getElementById("bookStage"),
  audioPlayer: document.getElementById("audioPlayer"),
  readerFooter: document.querySelector(".reader-footer")
}

function isTwoPageMode() {
  return window.matchMedia("(orientation: landscape) and (min-width: 900px)").matches
}

function pageStep() {
  return isTwoPageMode() ? 2 : 1
}

function visiblePages() {
  if (!state.book) return []
  return state.book.pages.slice(state.pageIndex, state.pageIndex + pageStep())
}

function hotspotsForPage(readerPage) {
  return state.book.hotspots.filter((hotspot) => hotspot.readerPage === readerPage)
}

function firstHotspotPageIndex(fromIndex = 0) {
  if (!state.book || !state.book.hotspots.length) return 0
  const hotspotPages = new Set(state.book.hotspots.map((hotspot) => hotspot.readerPage))
  for (let index = fromIndex; index < state.book.pages.length; index += 1) {
    if (hotspotPages.has(state.book.pages[index].readerPage)) return index
  }
  return state.book.pages.findIndex((page) => hotspotPages.has(page.readerPage))
}

function setPageIndex(nextIndex) {
  if (!state.book) return
  const maxIndex = Math.max(0, state.book.pages.length - 1)
  state.pageIndex = Math.max(0, Math.min(nextIndex, maxIndex))
  render()
}

function chooseJapaneseVoice() {
  return (
    state.voices.find((voice) => voice.lang === "ja-JP") ||
    state.voices.find((voice) => voice.lang.toLowerCase().startsWith("ja")) ||
    null
  )
}

function speak(text) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
    elements.hotspotStatus.textContent = `浏览器不支持 speechSynthesis：${text}`
    return
  }

  elements.audioPlayer.pause()
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = "ja-JP"
  utterance.rate = 0.86
  utterance.pitch = 1
  const voice = chooseJapaneseVoice()
  if (voice) utterance.voice = voice
  window.speechSynthesis.speak(utterance)
}

function playAudioClip(hotspot) {
  if (!hotspot.audio) {
    elements.hotspotStatus.textContent = `没有音频片段：${hotspot.text}`
    return
  }

  window.speechSynthesis?.cancel()
  elements.audioPlayer.src = `${state.bookBase}/${hotspot.audio}`
  elements.audioPlayer.play().catch(() => {
    elements.hotspotStatus.textContent = `音频播放失败：${hotspot.text}`
  })
}

function playHotspot(hotspot) {
  state.activeHotspotId = hotspot.id

  if (state.bookMode === "audio") {
    playAudioClip(hotspot)
    const range = Number.isFinite(hotspot.start) && Number.isFinite(hotspot.end)
      ? ` · ${hotspot.start.toFixed(2)}s-${hotspot.end.toFixed(2)}s`
      : ""
    elements.hotspotStatus.textContent = `${hotspot.type || "line"} · ${hotspot.text}${range}`
  } else {
    const text = hotspot.speakText || hotspot.text
    speak(text)
    elements.hotspotStatus.textContent = `${hotspot.kind || hotspot.type || "text"} · ${text}`
  }

  renderActiveHotspot()
}

function renderActiveHotspot() {
  document.querySelectorAll(".hotspot").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.hotspotId === state.activeHotspotId)
  })
}

function renderHotspotBox(hotspot, bbox, index) {
  const button = document.createElement("button")
  button.className = "hotspot"
  button.type = "button"
  button.dataset.hotspotId = hotspot.id
  button.dataset.hotspotBox = String(index)
  button.dataset.kind = hotspot.kind || hotspot.type || "text"
  const speakText = hotspot.speakText || hotspot.text
  button.title = state.bookMode === "audio" ? hotspot.text : `${speakText}\n原文：${hotspot.text}`
  button.setAttribute("aria-label", state.bookMode === "audio" ? `播放：${hotspot.text}` : `朗读：${speakText}`)

  const [x0, y0, x1, y1] = bbox
  button.style.left = `${x0 * 100}%`
  button.style.top = `${y0 * 100}%`
  button.style.width = `${(x1 - x0) * 100}%`
  button.style.height = `${(y1 - y0) * 100}%`
  button.addEventListener("click", () => playHotspot(hotspot))
  return button
}

function renderHotspots(hotspot) {
  const boxes = Array.isArray(hotspot.boxes) && hotspot.boxes.length ? hotspot.boxes : [hotspot.bbox]
  return boxes.filter(Boolean).map((bbox, index) => renderHotspotBox(hotspot, bbox, index))
}

function renderPage(page) {
  const card = document.createElement("article")
  card.className = "page-card"
  card.dataset.readerPage = String(page.readerPage)
  card.dataset.label = `阅读页 ${page.readerPage} · PDF ${page.pdfPage}`

  const image = document.createElement("img")
  image.className = "page-image"
  image.src = `${state.bookBase}/${page.image}`
  image.alt = `${state.book.title} ${page.label}`
  image.draggable = false
  card.appendChild(image)

  hotspotsForPage(page.readerPage).forEach((hotspot) => {
    card.append(...renderHotspots(hotspot))
  })

  return card
}

function hotspotCountForVisiblePages(pages) {
  const visible = new Set(pages.map((page) => page.readerPage))
  return state.book.hotspots.filter((hotspot) => visible.has(hotspot.readerPage)).length
}

function render() {
  if (!state.book) return

  elements.bookTitle.textContent = state.book.title
  elements.bookSubtitle.textContent = `${state.book.subtitle || activeBookMeta.label} · 共 ${state.book.hotspots.length} 个红框候选`
  elements.readerFooter.classList.toggle("is-hidden", state.bookMode !== "audio")

  const pages = visiblePages()
  elements.bookStage.replaceChildren(...pages.map(renderPage))

  const first = pages[0]
  const last = pages[pages.length - 1]
  const visibleHotspots = hotspotCountForVisiblePages(pages)
  elements.pageStatus.textContent = first && last
    ? `阅读页 ${first.readerPage}${last.readerPage !== first.readerPage ? `-${last.readerPage}` : ""} / ${state.book.pages.length} · 本屏 ${visibleHotspots} 个红框`
    : "-"

  elements.prevButton.disabled = state.pageIndex <= 0
  elements.nextButton.disabled = state.pageIndex + pageStep() >= state.book.pages.length
  elements.nextHotspotButton.disabled = !state.book.hotspots.length
  elements.pageInput.max = String(state.book.pages.length)
  elements.pageInput.value = first ? String(first.readerPage) : ""
  renderActiveHotspot()
}

async function loadBook() {
  const response = await fetch(activeBookMeta.url)
  if (!response.ok) throw new Error(`无法加载教材数据：${activeBookMeta.url}`)
  state.book = await response.json()
  state.bookBase = activeBookMeta.url.slice(0, activeBookMeta.url.lastIndexOf("/"))
  state.bookMode = activeBookMeta.mode
  state.pageIndex = firstHotspotPageIndex(0)
  state.activeHotspotId = ""
  elements.hotspotStatus.textContent = activeBookMeta.statusText
  elements.audioPlayer.removeAttribute("src")
  render()
}

function jumpToNextHotspotPage() {
  const next = firstHotspotPageIndex(state.pageIndex + pageStep())
  if (next >= 0) setPageIndex(next)
}

function jumpToPageFromInput() {
  if (!state.book) return
  const readerPage = Number(elements.pageInput.value)
  if (!Number.isFinite(readerPage)) return
  const index = state.book.pages.findIndex((page) => page.readerPage === readerPage)
  if (index >= 0) setPageIndex(index)
}

function initVoices() {
  if (!("speechSynthesis" in window)) return
  const update = () => {
    state.voices = window.speechSynthesis.getVoices()
  }
  update()
  window.speechSynthesis.addEventListener("voiceschanged", update)
}

function initEvents() {
  elements.prevButton.addEventListener("click", () => setPageIndex(state.pageIndex - pageStep()))
  elements.nextButton.addEventListener("click", () => setPageIndex(state.pageIndex + pageStep()))
  elements.nextHotspotButton.addEventListener("click", jumpToNextHotspotPage)
  elements.pageInput.addEventListener("change", jumpToPageFromInput)
  elements.pageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") jumpToPageFromInput()
  })
  window.addEventListener("resize", render)
  window.addEventListener("orientationchange", render)
}

initVoices()
initEvents()
loadBook().catch((error) => {
  elements.bookTitle.textContent = "加载失败"
  elements.bookSubtitle.textContent = error.message
  elements.readerFooter.classList.add("is-hidden")
  console.error(error)
})
