import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import logo from '../assets/Logo.png'

function HexCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const hexagonsRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      buildHexagons()
    }

    const buildHexagons = () => {
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      const size = 38
      const hx = size * 2
      const hy = size * Math.sqrt(3)
      const hexes = []
      for (let row = -1; row < H / hy + 2; row++) {
        for (let col = -1; col < W / hx + 2; col++) {
          const offsetX = row % 2 === 0 ? 0 : size
          hexes.push({
            x: col * hx + offsetX, y: row * hy * 0.86, size,
            baseOpacity: Math.random() * 0.25 + 0.05,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.004 + Math.random() * 0.006,
          })
        }
      }
      hexagonsRef.current = hexes
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const hexPath = (x, y, r) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const px = x + r * Math.cos(angle)
        const py = y + r * Math.sin(angle)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
    }

    const draw = () => {
      const W = canvas.offsetWidth, H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      const mx = mouseRef.current.x, my = mouseRef.current.y
      const influenceRadius = 180

      hexagonsRef.current.forEach(h => {
        h.pulse += h.pulseSpeed
        const pulseFactor = 0.5 + 0.5 * Math.sin(h.pulse)
        const dx = h.x - mx, dy = h.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - dist / influenceRadius)
        const finalOpacity = h.baseOpacity * pulseFactor + proximity * 0.55
        const strokeOpacity = h.baseOpacity * 0.6 * pulseFactor + proximity * 0.7

        if (proximity > 0) {
          ctx.fillStyle = `rgba(253,189,16,${finalOpacity * 0.18})`
          hexPath(h.x, h.y, h.size - 2)
          ctx.fill()
        }
        ctx.strokeStyle = proximity > 0.3 ? `rgba(253,189,16,${strokeOpacity * 0.8})` : `rgba(40,42,114,${strokeOpacity * 1.2})`
        ctx.lineWidth = proximity > 0.3 ? 1.2 : 0.7
        hexPath(h.x, h.y, h.size - 2)
        ctx.stroke()
      })
      rafRef.current = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)
    resize(); draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9 }} />
}

function HeroBackground({ mouseX, mouseY }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
      <div style={{
        position: 'absolute', top: '-20%', left: '-10%', width: '80%', height: '120%',
        background: 'radial-gradient(ellipse at 30% 40%, rgba(40,42,114,0.5) 0%, transparent 65%)',
        animation: 'bgBreathe 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '-5%', right: '-5%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(253,189,16,0.15) 0%, transparent 60%)',
        filter: 'blur(60px)', animation: 'bgFloat 13s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(900px circle at ${mouseX}px ${mouseY}px, rgba(253,189,16,0.12), transparent 70%)`,
        transition: 'background 0.15s ease',
      }} />
      <style>{`
        @keyframes bgBreathe { 0%,100%{opacity:.8;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
        @keyframes bgFloat { from{transform:translate(0,0)} to{transform:translate(-25px,30px)} }
      `}</style>
    </div>
  )
}

function Counter({ target, suffix, label, delay = 0 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const done = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true
        const dur = 2000, start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 4)
          setVal(Math.floor(ease * target))
          if (p < 1) requestAnimationFrame(tick)
          else setVal(target)
        }
        setTimeout(() => requestAnimationFrame(tick), delay)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, delay])
  return (
    <div ref={ref} style={{ flex: 1 }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        color: '#fdbd10', lineHeight: 1, letterSpacing: '-1px', textShadow: '0 0 20px rgba(253,189,16,0.3)',
      }}>{val}{suffix}</div>
      <div style={{
        fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#eeeaf8',
        marginTop: '0.35rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
      }}>{label}</div>
    </div>
  )
}

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const fn = (e) => {
      if (!heroRef.current) return
      const r = heroRef.current.getBoundingClientRect()
      setMouse({ x: e.clientX - r.left, y: e.clientY - r.top })
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section ref={heroRef} style={{
      position: 'relative', minHeight: '100vh',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      alignItems: 'center', overflow: 'hidden',
      padding: '0 3rem 0 4rem', gap: '3rem',
    }}>
      <HeroBackground mouseX={mouse.x} mouseY={mouse.y} />

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } } }}
        initial="hidden" animate="show"
        style={{ position: 'relative', zIndex: 2, paddingTop: '6rem', paddingBottom: '5rem' }}
      >
        <motion.div variants={item} style={{ marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
            background: 'rgba(253,189,16,0.1)', border: '1px solid rgba(253,189,16,0.3)',
            color: '#fdbd10', padding: '0.45rem 1.2rem', borderRadius: 100,
            fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            boxShadow: '0 0 20px rgba(253,189,16,0.15)',
          }}>
            <span style={{ width: 6, height: 6, background: '#fdbd10', borderRadius: '50%', boxShadow: '0 0 12px #fdbd10', animation: 'pulse 2.2s ease-in-out infinite' }} />
            Mobile-First Product Studio · Est. 2023
          </span>
        </motion.div>

        <motion.h1 variants={item} style={{
          fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.8rem, 4.5vw, 5rem)',
          lineHeight: 1.06, letterSpacing: '-1.5px', color: '#fff', marginBottom: '1.5rem',
        }}>
          We build apps<br />that reach<br />
          <span style={{ color: '#fdbd10', textShadow: '0 0 60px rgba(253,189,16,0.4), 0 0 30px rgba(253,189,16,0.2)' }}>millions.</span>
        </motion.h1>

        <motion.p variants={item} style={{
          fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '1.1rem', color: '#d4d0e0',
          maxWidth: 440, lineHeight: 1.85, marginBottom: '2.8rem',
        }}>
          Trisol Technologies ships production-grade Flutter apps powered by AI. From first commit to 5 million users — we've done it 50 times.
        </motion.p>

        <motion.div variants={item} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#partnership" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            background: '#fdbd10', color: '#1a1c4e',
            padding: '0.95rem 2.2rem', borderRadius: 10, fontFamily: 'var(--font-body)',
            fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none', cursor: 'none',
            boxShadow: '0 0 32px rgba(253,189,16,0.35)', transition: 'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ffc929'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fdbd10'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Start a Project <ArrowRight size={16} />
          </a>
          <a href="#about" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(40,42,114,0.25)', border: '1.5px solid rgba(253,189,16,0.25)',
            color: '#eeeaf8', padding: '0.95rem 2.2rem', borderRadius: 10,
            fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
            textDecoration: 'none', cursor: 'none', backdropFilter: 'blur(12px)', transition: 'transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Our Story
          </a>
        </motion.div>

        <motion.div variants={item} style={{
          display: 'flex', gap: '3rem', marginTop: '4rem', paddingTop: '2.5rem',
          borderTop: '1px solid rgba(253,189,16,0.12)',
        }}>
          <Counter target={50} suffix="+" label="Apps Shipped" delay={0} />
          <Counter target={5} suffix="M+" label="Users Worldwide" delay={120} />
          <Counter target={15} suffix="+" label="Successful Exits" delay={240} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', height: '100vh', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
        }}>
          <HexCanvas />
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <motion.div
            animate={{ y: [0, -24, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 340, height: 340, background: 'rgba(7,8,24,0.7)', backdropFilter: 'blur(20px)',
              borderRadius: 28, border: '1px solid rgba(253,189,16,0.25)',
              boxShadow: '0 0 80px rgba(253,189,16,0.15), 0 0 120px rgba(40,42,114,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
            }}
          >
            <img
              src={logo}
              alt="Trisol" style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </motion.div>

          {[1, 2, 3].map(i => (
            <div key={i} style={{
              position: 'absolute', width: 140 + i * 72, height: 140 + i * 72,
              border: `1px solid rgba(253,189,16,${0.25 - i * 0.08})`, borderRadius: 28 + i * 14,
              animation: `ringPulse ${2.5 + i * 0.8}s ease-in-out ${i * 0.5}s infinite`, pointerEvents: 'none',
            }} />
          ))}
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
          background: 'linear-gradient(to top, var(--bg), transparent)', zIndex: 3, pointerEvents: 'none',
        }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        style={{
          position: 'absolute', bottom: '2.2rem', left: '4rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          color: '#eeeaf8', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          fontFamily: 'var(--font-body)', fontWeight: 500,
        }}
      >
        <ChevronDown size={14} style={{ animation: 'bounceDown 2s ease-in-out infinite' }} />
        Scroll to explore
      </motion.div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 6px #fdbd10;transform:scale(1)} 50%{box-shadow:0 0 18px #fdbd10;transform:scale(1.4)} }
        @keyframes ringPulse{ 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.15;transform:scale(1.05)} }
        @keyframes bounceDown{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; padding: 0 1.5rem !important; }
          section[style*="grid-template-columns: 1fr 1fr"] > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  )
}