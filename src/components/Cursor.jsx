import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }
    const onEnter = () => { hovering.current = true }
    const onLeave = () => { hovering.current = false }

    window.addEventListener('mousemove', onMove)

    const selectors = 'a, button, [data-cursor], input, textarea, .card-hover'
    const bindEl = (el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    }
    const observer = new MutationObserver(() => {
      document.querySelectorAll(selectors).forEach(bindEl)
    })
    observer.observe(document.body, { childList: true, subtree: true })
    document.querySelectorAll(selectors).forEach(bindEl)

    let raf
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }
      if (ringRef.current) {
        const size = hovering.current ? 52 : 34
        const offset = size / 2
        ringRef.current.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.borderColor = hovering.current ? 'rgba(253,189,16,0.7)' : 'rgba(253,189,16,0.3)'
        ringRef.current.style.backgroundColor = hovering.current ? 'rgba(253,189,16,0.04)' : 'transparent'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 8, height: 8,
        background: '#fdbd10', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999, willChange: 'transform', mixBlendMode: 'screen'
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, width: 34, height: 34,
        border: '1.5px solid rgba(253,189,16,0.3)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998, willChange: 'transform',
        transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease'
      }} />
    </>
  )
}
