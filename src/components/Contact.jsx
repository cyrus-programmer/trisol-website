import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Send } from 'lucide-react'

function FadeIn({ children, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const info = [
  { icon: Phone, label: 'Phone', value: '0333-5380115' },
  { icon: Mail, label: 'Email', value: 'trisoltechnologies786@gmail.com' },
  { icon: MapPin, label: 'Office', value: 'Office 4, Floor 2, Plaza 123, Spring North, Phase 7 Bahria Town, Rawalpindi' },
]

function InfoCard({ item, delay }) {
  const Icon = item.icon
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <FadeIn delay={delay}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="info-card"
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'rgba(40,42,114,0.08)',
          border: '1px solid rgba(40,42,114,0.28)',
          borderRadius: 16, padding: '1.3rem',
          backdropFilter: 'blur(12px)',
          display: 'flex', gap: '0.9rem', alignItems: 'flex-start',
          cursor: 'none', transition: 'border-color 0.3s, transform 0.3s'
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 16, pointerEvents: 'none',
          background: 'radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), rgba(253,189,16,0.06), transparent 70%)'
        }} />
        <div style={{
          width: 38, height: 38, minWidth: 38, borderRadius: 9,
          background: 'rgba(253,189,16,0.1)', border: '1px solid rgba(253,189,16,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 2
        }}>
          <Icon size={16} color="#fdbd10" strokeWidth={1.8} />
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fdbd10', marginBottom: '0.2rem' }}>{item.label}</div>
          <div style={{ fontSize: '0.86rem', color: 'rgba(240,238,248,0.8)' }}>{item.value}</div>
        </div>
      </div>
      <style>{`.info-card:hover { border-color: rgba(253,189,16,0.28) !important; transform: translateX(4px); }`}</style>
    </FadeIn>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ first: '', last: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ first: '', last: '', email: '', subject: '', message: '' })
  }

  const inputStyle = {
    background: 'rgba(40,42,114,0.1)', border: '1px solid rgba(40,42,114,0.3)',
    borderRadius: 10, padding: '0.8rem 1rem', color: '#f0eef8',
    fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none',
    width: '100%', transition: 'border-color 0.25s'
  }

  const onFocus = (e) => { e.target.style.borderColor = 'rgba(253,189,16,0.4)' }
  const onBlur = (e) => { e.target.style.borderColor = 'rgba(40,42,114,0.3)' }

  return (
    <section id="contact" style={{
      padding: '7rem 3rem',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fdbd10', marginBottom: '0.7rem' }}>
              Contact
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, letterSpacing: '-1px', color: '#fff', lineHeight: 1.1, marginBottom: '0.8rem'
            }}>
              Start a conversation
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(240,238,248,0.45)', maxWidth: 460, lineHeight: 1.75 }}>
              Have a product idea? Want to partner or work with us? We respond within 24 hours.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {info.map((item, i) => <InfoCard key={item.label} item={item} delay={i * 0.08} />)}
          </div>

          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
                <input style={inputStyle} placeholder="First name" value={form.first} onChange={e => setForm(p => ({...p, first: e.target.value}))} onFocus={onFocus} onBlur={onBlur} />
                <input style={inputStyle} placeholder="Last name" value={form.last} onChange={e => setForm(p => ({...p, last: e.target.value}))} onFocus={onFocus} onBlur={onBlur} />
              </div>
              <input type="email" style={inputStyle} placeholder="Email address" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} onFocus={onFocus} onBlur={onBlur} />
              <input style={inputStyle} placeholder="Subject" value={form.subject} onChange={e => setForm(p => ({...p, subject: e.target.value}))} onFocus={onFocus} onBlur={onBlur} />
              <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 130 }} placeholder="Tell us about your project" value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} onFocus={onFocus} onBlur={onBlur} />

              <button type="submit" data-cursor style={{
                width: 'fit-content', display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                background: sent ? 'rgba(52,211,153,0.9)' : '#fdbd10',
                border: 'none', color: sent ? '#fff' : '#282a72',
                padding: '0.85rem 2rem', borderRadius: 11,
                fontFamily: 'var(--font-body)', fontSize: '0.92rem', fontWeight: 700,
                cursor: 'none', transition: 'all 0.3s',
                boxShadow: '0 0 28px rgba(253,189,16,0.35)'
              }}
              onMouseEnter={e => { if (!sent) { e.currentTarget.style.background='#ffc929'; e.currentTarget.style.transform='translateY(-2px)' }}}
              onMouseLeave={e => { if (!sent) { e.currentTarget.style.background='#fdbd10'; e.currentTarget.style.transform='translateY(0)' }}}
              >
                {sent ? 'Message Sent ✓' : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          </FadeIn>
        </div>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder { color: rgba(240,238,248,0.28); }
        @media (max-width: 900px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </section>
  )
}
