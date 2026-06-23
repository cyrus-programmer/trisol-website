import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const stacks = [
  {
    category: 'Mobile',
    color: '#fdbd10',
    items: [
      { name: 'Flutter', desc: 'Cross-platform native apps' },
      { name: 'Dart', desc: 'Strongly typed language' },
      { name: 'Swift / Kotlin', desc: 'Native platform APIs' },
    ]
  },
  {
    category: 'Backend',
    color: '#7c6af7',
    items: [
      { name: 'Python', desc: 'AI pipelines & APIs' },
      { name: 'Node.js', desc: 'Real-time services' },
      { name: 'FastAPI', desc: 'High-performance REST' },
    ]
  },
  {
    category: 'Frontend',
    color: '#60a5fa',
    items: [
      { name: 'React', desc: 'Web interfaces' },
      { name: 'Next.js', desc: 'SSR & landing pages' },
      { name: 'TypeScript', desc: 'Type-safe code' },
    ]
  },
  {
    category: 'Data & AI',
    color: '#34D399',
    items: [
      { name: 'Gemini / GPT', desc: 'LLM integration' },
      { name: 'Stable Diffusion', desc: 'Image generation' },
      { name: 'Supabase pgvector', desc: 'Vector embeddings' },
    ]
  },
  {
    category: 'Platform',
    color: '#f87171',
    items: [
      { name: 'Firebase', desc: 'Auth, DB, storage' },
      { name: 'MongoDB', desc: 'Flexible data store' },
      { name: 'AWS S3 / EC2', desc: 'Cloud infrastructure' },
    ]
  },
  {
    category: 'Product',
    color: '#fdbd10',
    items: [
      { name: 'RevenueCat', desc: 'Subscription billing' },
      { name: 'App Store / Play', desc: 'Distribution' },
      { name: 'Mixpanel', desc: 'User analytics' },
    ]
  },
]

function StackCard({ group, index }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--y', `${e.clientY - rect.top}px`)
  }

  return (
    <FadeIn delay={index * 0.07}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="stack-card"
        style={{
          position: 'relative', overflow: 'hidden',
          background: 'rgba(40,42,114,0.07)',
          border: '1px solid rgba(40,42,114,0.25)',
          borderRadius: 18, padding: '1.8rem',
          backdropFilter: 'blur(12px)', cursor: 'none',
          transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s'
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 18, pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), rgba(253,189,16,0.06), transparent 70%)',
        }} />

        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: `linear-gradient(90deg, transparent, ${group.color}60, transparent)`
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: `${group.color}15`, border: `1px solid ${group.color}35`,
            color: group.color, padding: '0.28rem 0.75rem', borderRadius: 100,
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase', marginBottom: '1.2rem'
          }}>
            {group.category}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {group.items.map(item => (
              <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f0eef8' }}>{item.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'rgba(240,238,248,0.35)', fontWeight: 400 }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .stack-card:hover {
          border-color: rgba(253,189,16,0.25) !important;
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.45), 0 0 30px rgba(253,189,16,0.05);
        }
      `}</style>
    </FadeIn>
  )
}

export default function Stack() {
  return (
    <section id="stack" style={{
      padding: '7rem 3rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'linear-gradient(180deg, transparent, rgba(40,42,114,0.05), transparent)'
    }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fdbd10', marginBottom: '0.7rem' }}>
              Technology
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800, letterSpacing: '-1px', color: '#fff', lineHeight: 1.1, marginBottom: '0.8rem'
            }}>
              Our stack
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(240,238,248,0.45)', maxWidth: 480, lineHeight: 1.75 }}>
              We choose tools for outcomes, not trends. These are the technologies that power every product we ship.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
          {stacks.map((g, i) => <StackCard key={g.category} group={g} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #stack > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          #stack > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
