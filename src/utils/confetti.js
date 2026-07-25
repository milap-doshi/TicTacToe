// Lightweight confetti: appends a canvas and runs a particle burst for a short duration.
export default function runConfetti() {
  try {
    const w = window.innerWidth
    const h = window.innerHeight
    const canvas = document.createElement('canvas')
    canvas.style.position = 'fixed'
    canvas.style.left = '0'
    canvas.style.top = '0'
    canvas.style.pointerEvents = 'none'
    canvas.width = w
    canvas.height = h
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const colors = ['#ff6b6b', '#ffd166', '#4be3a5', '#7c5cff', '#00e5ff']
    const particles = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.4,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 6 + 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI
      })
    }

    let t0 = null
    let rafId = null
    function cleanup() {
      if (rafId) cancelAnimationFrame(rafId)
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
    function frame(ts) {
      if (!t0) t0 = ts
      const dt = (ts - t0) / 1000
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12
        p.rot += 0.1
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size)
        ctx.restore()
      })
      if (dt < 2.2) {
        rafId = requestAnimationFrame(frame)
      } else {
        cleanup()
      }
    }
    rafId = requestAnimationFrame(frame)
  } catch (e) {
    // silent failure on environments without DOM
  }
}
