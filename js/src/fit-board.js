// Sizes a 5×5 board to the largest 4:3 rectangle that fits the available area
// between the two team banners. Done in JS (explicit px) instead of relying on
// CSS aspect-ratio, which older Samsung TV browsers handle inconsistently —
// that mismatch is what made the MAPA / CÓDIGO SECRETO cards look "weird".

const RATIO = 4 / 3
const MARGIN = 6 // small breathing room (px) so the board never touches edges

export function fitBoard(boardEl) {
  if (!boardEl) return
  const scene = boardEl.closest('.board-scene')
  if (!scene) return

  let bannerH = 0
  scene.querySelectorAll('.team-banner').forEach((b) => { bannerH += b.offsetHeight })

  // Use window dimensions for reliable sizing on older browsers (e.g. Samsung Tizen)
  // where the scene element's clientWidth/clientHeight may not reflect the full viewport.
  const availW = window.innerWidth - MARGIN * 2
  const availH = window.innerHeight - bannerH - MARGIN * 2
  if (availW <= 0 || availH <= 0) return

  // Largest 4:3 box that fits within both dimensions.
  let w = availW
  let h = w / RATIO
  if (h > availH) { h = availH; w = h * RATIO }

  boardEl.style.width = `${Math.floor(w)}px`
  boardEl.style.height = `${Math.floor(h)}px`
}

// Keeps whichever board is currently on screen (#board) sized on resize /
// orientation change. Re-querying each time means a single listener survives
// re-renders without needing to be detached.
let bound = false
export function watchBoardResize() {
  if (bound) return
  bound = true
  const refit = () => fitBoard(document.getElementById('board'))
  window.addEventListener('resize', refit)
  window.addEventListener('orientationchange', refit)
}
