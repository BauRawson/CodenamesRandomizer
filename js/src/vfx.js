export function animateReveal(el) {
  el.animate(
    [
      { transform: 'scale(0.88)', opacity: 0.6 },
      { transform: 'scale(1.06)', opacity: 1 },
      { transform: 'scale(1)',    opacity: 1 },
    ],
    { duration: 240, easing: 'ease-out', fill: 'none' }
  )
}

export function showConfetti(teamColor) {
  const canvas = document.createElement('canvas')
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  canvas.width  = window.innerWidth
  canvas.height = window.innerHeight

  const COUNT = 120
  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * 80,
    vx: (Math.random() - 0.5) * 4,
    vy: 2 + Math.random() * 4,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.2,
    w: 8 + Math.random() * 8,
    h: 5 + Math.random() * 5,
    color: Math.random() < 0.6 ? teamColor : '#fbb954',
    alpha: 1,
  }))

  let frame
  const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let alive = false
    for (const p of particles) {
      p.x   += p.vx
      p.y   += p.vy
      p.vy  += 0.08
      p.rot += p.vrot
      if (p.y > canvas.height * 0.85) p.alpha -= 0.03
      if (p.alpha <= 0) continue
      alive = true
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      ctx.restore()
    }
    if (alive) frame = requestAnimationFrame(tick)
    else canvas.remove()
  }
  frame = requestAnimationFrame(tick)
  setTimeout(() => { cancelAnimationFrame(frame); canvas.remove() }, 4000)
}
