import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Smartphone, Zap, Brain, TrendingUp } from 'lucide-react'

// ─── Shared fade-in ────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

// ─── Spotlight card (reused for feature cards) ─────────────────────────────
function SpotlightCard({ children, style }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div ref={ref} onMouseMove={onMove} className="sc" style={{
      position: 'relative', overflow: 'hidden', cursor: 'none',
      background: 'rgba(40,42,114,0.07)',
      border: '1px solid rgba(40,42,114,0.28)',
      borderRadius: 16, backdropFilter: 'blur(14px)',
      transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
      ...style
    }}>
      <div className="sc-glow" />
      {children}
      <style>{`
        .sc::before { content:''; position:absolute; inset:0; border-radius:inherit;
          background: radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(253,189,16,0.07), transparent 65%);
          opacity:0; transition:opacity .3s; pointer-events:none; z-index:1; }
        .sc:hover::before { opacity:1; }
        .sc:hover { border-color:rgba(253,189,16,0.28)!important; transform:translateY(-4px);
          box-shadow:0 20px 50px rgba(0,0,0,0.55), 0 0 28px rgba(253,189,16,0.05); }
        .sc > * { position:relative; z-index:2; }
      `}</style>
    </div>
  )
}

// ─── Leadership card — full bleed photo ───────────────────────────────────
function LeaderCard({ person, delay }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width  / 2) / r.width  * 10
    const y = (e.clientY - r.top  - r.height / 2) / r.height * 10
    ref.current.style.transform = `perspective(800px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`
  }
  const onLeave = () => {
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return (
    <FadeIn delay={delay}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          aspectRatio: '3/4', cursor: 'none',
          transition: 'transform 0.4s cubic-bezier(.22,1,.36,1)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          border: '1px solid rgba(253,189,16,0.12)',
        }}
      >
        {/* Photo */}
        <img
          src={person.img}
          alt={person.name}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
          }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background = 'rgba(40,42,114,0.25)'
          }}
        />

        {/* Gradient overlay — always visible at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(7,8,24,0.97) 0%, rgba(7,8,24,0.55) 40%, transparent 70%)',
        }} />

        {/* Accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #fdbd10, transparent)',
          opacity: 0.5,
        }} />

        {/* Text block */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.8rem 1.6rem',
        }}>
          {/* Role badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            background: 'rgba(253,189,16,0.12)', border: '1px solid rgba(253,189,16,0.22)',
            color: '#fdbd10', padding: '0.22rem 0.7rem', borderRadius: 100,
            fontSize: '0.65rem', fontFamily: 'var(--font-body)',
            fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: '0.6rem'
          }}>
            {person.role}
          </div>

          {/* Name */}
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: '1.2rem', color: '#fff',
            letterSpacing: '-0.3px', lineHeight: 1.2, marginBottom: '0.5rem'
          }}>
            {person.name}
          </div>

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 300,
            fontSize: '0.8rem', color: 'rgba(238,234,248,0.52)',
            lineHeight: 1.65, margin: 0
          }}>
            {person.bio}
          </p>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────
const features = [
  { icon: Smartphone, title: 'Mobile-First, Always',
    desc: 'Every product starts as a mobile experience. We ship native-quality Flutter apps for iOS and Android from a single codebase — without compromise.' },
  { icon: Zap, title: 'Fast Iteration Cycles',
    desc: 'From spec to TestFlight in weeks. We ship fast, learn from real users, and iterate without bureaucratic slowdown.' },
  { icon: Brain, title: 'AI at the Core',
    desc: "We don't bolt AI on. Every product is designed around intelligence — from generation pipelines to voice agents to on-device inference." },
  { icon: TrendingUp, title: 'Built to Flip',
    desc: '15+ exits. Clean code, clear docs, proven monetisation from day one. We build apps acquirers want to buy.' },
]

const team = [
  {
    name: 'Muhammad Rukhsar',
    role: 'Chief Executive Officer',
    bio: 'Vision, strategy, and product direction. Drives Trisol from zero to acquisition with focus on what users actually need.',
    img: 'https://trisoltechnologies.com/wp-content/uploads/2025/09/PHOTO-2025-09-06-00-49-00-225x300.jpg'
  },
  {
    name: 'Huzaifa Waheed',
    role: 'Chief Technology Officer',
    bio: 'Architecture, engineering quality, and AI integration. Sets the technical bar across every product we ship.',
    img: 'https://trisoltechnologies.com/wp-content/uploads/2026/03/IMG_4016-1-225x300.jpg'
  }
]

// ─── Section ───────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section id="about" style={{ padding: '8rem 4rem', maxWidth: 1300, margin: '0 auto' }}>

      {/* Section label */}
      <FadeIn>
        <div style={{ marginBottom: '5rem' }}>
          <div style={{
            fontSize: '0.68rem', fontFamily: 'var(--font-body)',
            fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#fdbd10', marginBottom: '0.75rem'
          }}>
            Who We Are
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            letterSpacing: '-1px', color: '#fff',
            lineHeight: 1.08, marginBottom: '1rem'
          }}>
            A studio that ships,<br />not just designs
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 300,
            fontSize: '1rem', color: 'rgba(238,234,248,0.48)',
            maxWidth: 500, lineHeight: 1.78
          }}>
            Since 2023, we've built 50+ apps across iOS and Android,
            grown them to 5M+ users, and exited 15+ — with a small,
            focused team that moves with intent.
          </p>
        </div>
      </FadeIn>

      {/* Main 2-col layout */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '5rem', alignItems: 'start', marginBottom: '7rem'
      }}
        className="about-cols"
      >
        {/* Left — prose + feature cards */}
        <div>
          <FadeIn>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:300, fontSize:'0.96rem', color:'rgba(238,234,248,0.5)', lineHeight:1.85, marginBottom:'1.1rem' }}>
              Trisol Technologies is a product-focused mobile studio headquartered in Bahria Town, Rawalpindi. We don't do client services. We build products — conceiving, engineering, and scaling them ourselves.
            </p>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:300, fontSize:'0.96rem', color:'rgba(238,234,248,0.5)', lineHeight:1.85, marginBottom:'2.2rem' }}>
              Our portfolio spans productivity tools, AI-powered utilities, social apps, and entertainment platforms. We build with Flutter, Python, and MERN — then layer in the latest generative AI to make products that feel like magic.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <FadeIn key={i} delay={i * 0.07}>
                  <SpotlightCard style={{
                    padding: '1.35rem 1.4rem',
                    display: 'flex', gap: '1rem', alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: 40, height: 40, minWidth: 40, borderRadius: 10,
                      background: 'rgba(253,189,16,0.09)', border: '1px solid rgba(253,189,16,0.22)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <Icon size={18} color="#fdbd10" strokeWidth={1.7} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: 'var(--font-display)', fontWeight: 600,
                        fontSize: '0.88rem', color: '#eeeaf8', marginBottom: '0.28rem'
                      }}>
                        {f.title}
                      </div>
                      <div style={{
                        fontFamily: 'var(--font-body)', fontWeight: 300,
                        fontSize: '0.79rem', color: 'rgba(238,234,248,0.44)', lineHeight: 1.65
                      }}>
                        {f.desc}
                      </div>
                    </div>
                  </SpotlightCard>
                </FadeIn>
              )
            })}
          </div>
        </div>

        {/* Right — leadership */}
        <div>
          <FadeIn>
            <div style={{
              fontFamily: 'var(--font-body)', fontWeight: 500,
              fontSize: '0.68rem', letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'rgba(238,234,248,0.3)',
              marginBottom: '1.5rem'
            }}>
              Leadership
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            {team.map((t, i) => <LeaderCard key={t.name} person={t} delay={i * 0.1} />)}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-cols { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
        }
        @media (max-width: 600px) {
          #about { padding: 5rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
