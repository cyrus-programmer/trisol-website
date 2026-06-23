import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Handshake, Rocket, Code2, DollarSign, ArrowRight } from 'lucide-react'

function FadeIn({ children, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const partnerTypes = [
  {
    icon: Rocket,
    title: 'Co-Build',
    desc: 'Have an app idea but lack the engineering muscle? We co-build — contributing technical execution while you bring the domain knowledge or distribution.',
    tag: 'Equity or Revenue Share',
  },
  {
    icon: Code2,
    title: 'White-Label',
    desc: 'License our existing apps or technology under your brand. Proven products, zero development time, revenue from day one.',
    tag: 'Licensing',
  },
  {
    icon: DollarSign,
    title: 'Acquisition',
    desc: 'Looking to acquire a revenue-generating mobile app? We regularly bring products to market specifically to exit. Reach out to see what\'s available.',
    tag: 'M&A',
  },
  {
    icon: Handshake,
    title: 'Strategic Partnership',
    desc: 'Distribution deals, cross-promotion, AI infrastructure sharing, or joint ventures. If you see a way we can grow together, we want to hear it.',
    tag: 'Open',
  },
]

function PartnerCard({ item, index }) {
  const ref = useRef(null)
  const Icon = item.icon
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <FadeIn delay={index * 0.08}>
      <div ref={ref} onMouseMove={onMove} className="partner-card" style={{
        position: 'relative', overflow: 'hidden', cursor: 'none',
        background: 'rgba(40,42,114,0.07)', border: '1px solid rgba(40,42,114,0.26)',
        borderRadius: 18, padding: '1.8rem 1.6rem',
        backdropFilter: 'blur(14px)',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        display: 'flex', flexDirection: 'column', gap: '1rem',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 18, pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(253,189,16,0.07), transparent 65%)',
        }} />

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 11, flexShrink: 0,
            background: 'rgba(253,189,16,0.09)', border: '1px solid rgba(253,189,16,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={20} color="#fdbd10" strokeWidth={1.7} />
          </div>
          <span style={{
            background: 'rgba(40,42,114,0.3)', border: '1px solid rgba(40,42,114,0.45)',
            color: 'rgba(238,234,248,0.4)', padding: '0.22rem 0.7rem', borderRadius: 100,
            fontSize: '0.63rem', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.04em',
          }}>
            {item.tag}
          </span>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1.05rem', color: '#eeeaf8', marginBottom: '0.5rem',
          }}>
            {item.title}
          </div>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 300,
            fontSize: '0.82rem', color: 'rgba(238,234,248,0.48)', lineHeight: 1.72, margin: 0,
          }}>
            {item.desc}
          </p>
        </div>
      </div>
      <style>{`.partner-card:hover { border-color:rgba(253,189,16,0.28)!important; transform:translateY(-5px); box-shadow:0 22px 55px rgba(0,0,0,0.5),0 0 28px rgba(253,189,16,0.05); }`}</style>
    </FadeIn>
  )
}

export default function Partnership() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', type: '', message: '' })
  }

  const inputStyle = {
    background: 'rgba(40,42,114,0.1)', border: '1px solid rgba(40,42,114,0.3)',
    borderRadius: 10, padding: '0.8rem 1rem', color: '#eeeaf8',
    fontSize: '0.88rem', fontFamily: 'var(--font-body)', outline: 'none',
    width: '100%', transition: 'border-color 0.25s',
  }
  const onF = (e) => { e.target.style.borderColor = 'rgba(253,189,16,0.38)' }
  const onB = (e) => { e.target.style.borderColor = 'rgba(40,42,114,0.3)' }

  return (
    <section id="partnership" style={{
      padding: '8rem 4rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'linear-gradient(180deg, transparent, rgba(40,42,114,0.04), transparent)',
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        <FadeIn>
          <div style={{ marginBottom: '4rem', maxWidth: 640 }}>
            <div style={{
              fontSize: '0.68rem', fontFamily: 'var(--font-body)', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fdbd10', marginBottom: '0.75rem',
            }}>
              Partnerships & Collaboration
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem, 3.8vw, 3rem)',
              letterSpacing: '-1px', color: '#fff', lineHeight: 1.08, marginBottom: '1rem',
            }}>
              Let's build something<br />together
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 300,
              fontSize: '1rem', color: 'rgba(238,234,248,0.48)', lineHeight: 1.78,
            }}>
              We're open to co-builds, white-label deals, acquisitions, and strategic partnerships. If you see overlap, reach out — we move fast.
            </p>
          </div>
        </FadeIn>

        {/* Two-column: cards + form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
          className="partner-cols">

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {partnerTypes.map((p, i) => <PartnerCard key={p.title} item={p} index={i} />)}
          </div>

          {/* Form */}
          <FadeIn delay={0.15}>
            <div style={{
              background: 'rgba(40,42,114,0.07)', border: '1px solid rgba(40,42,114,0.26)',
              borderRadius: 20, padding: '2.4rem', backdropFilter: 'blur(14px)',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.15rem', color: '#fff', marginBottom: '0.4rem',
              }}>
                Start a conversation
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontWeight: 300,
                fontSize: '0.83rem', color: 'rgba(238,234,248,0.42)', marginBottom: '1.8rem', lineHeight: 1.65,
              }}>
                Tell us what you're thinking — we'll respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <input style={inputStyle} placeholder="Your name" value={form.name}
                  onChange={e => setForm(p => ({...p, name: e.target.value}))} onFocus={onF} onBlur={onB} />
                <input type="email" style={inputStyle} placeholder="Email address" value={form.email}
                  onChange={e => setForm(p => ({...p, email: e.target.value}))} onFocus={onF} onBlur={onB} />

                {/* Partnership type selector */}
                <select style={{ ...inputStyle, appearance: 'none', cursor: 'none' }}
                  value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))}
                  onFocus={onF} onBlur={onB}>
                  <option value="" disabled>Partnership type</option>
                  <option value="cobuild">Co-Build</option>
                  <option value="whitelabel">White-Label</option>
                  <option value="acquisition">Acquisition</option>
                  <option value="strategic">Strategic Partnership</option>
                  <option value="other">Other</option>
                </select>

                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                  placeholder="Tell us about your idea or proposal"
                  value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
                  onFocus={onF} onBlur={onB} />

                <button type="submit" data-cursor style={{
                  width: 'fit-content', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: sent ? 'rgba(52,211,153,0.9)' : '#fdbd10',
                  border: 'none', color: sent ? '#fff' : '#1a1c4e',
                  padding: '0.85rem 1.9rem', borderRadius: 10,
                  fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600,
                  cursor: 'none', transition: 'all 0.3s',
                  boxShadow: sent ? 'none' : '0 0 28px rgba(253,189,16,0.32)',
                }}
                onMouseEnter={e => { if(!sent){ e.currentTarget.style.background='#ffc929'; e.currentTarget.style.transform='translateY(-2px)' }}}
                onMouseLeave={e => { if(!sent){ e.currentTarget.style.background='#fdbd10'; e.currentTarget.style.transform='translateY(0)' }}}
                >
                  {sent ? 'Sent ✓' : <> Send Proposal <ArrowRight size={15} /></>}
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>

      <style>{`
        select option { background: #0e1028; color: #eeeaf8; }
        input::placeholder, textarea::placeholder { color: rgba(238,234,248,0.26); }
        @media (max-width: 960px) {
          .partner-cols { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        @media (max-width: 600px) {
          .partner-cols > div:first-child { grid-template-columns: 1fr !important; }
          #partnership { padding: 5rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
