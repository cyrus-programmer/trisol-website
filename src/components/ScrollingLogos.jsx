import { motion } from 'framer-motion'

// Aceternity-style infinite scroll strip
const techBadges = [
  'Flutter', 'React', 'Python', 'Node.js', 'Firebase',
  'MongoDB', 'AWS', 'RevenueCat', 'Gemini AI', 'Next.js',
  'TypeScript', 'FastAPI', 'Dart', 'Supabase', 'Figma',
  'App Store', 'Google Play', 'Mixpanel', 'Stripe', 'Twilio'
]

function Badge({ text }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
      background: 'rgba(40,42,114,0.15)', border: '1px solid rgba(40,42,114,0.3)',
      borderRadius: 100, padding: '0.42rem 1rem', whiteSpace: 'nowrap',
      backdropFilter: 'blur(8px)', transition: 'border-color 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(253,189,16,0.35)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(40,42,114,0.3)'}
    >
      <span style={{ width: 5, height: 5, background: 'rgba(253,189,16,0.6)', borderRadius: '50%' }} />
      <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'rgba(240,238,248,0.75)' }}>{text}</span>
    </div>
  )
}

export default function ScrollingLogos() {
  const doubled = [...techBadges, ...techBadges]

  return (
    <div style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '2.5rem 0', overflow: 'hidden', position: 'relative'
    }}>
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: 'linear-gradient(90deg, #070818, transparent)', pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
        background: 'linear-gradient(-90deg, #070818, transparent)', pointerEvents: 'none'
      }} />

      <div style={{ textAlign: 'center', marginBottom: '1.4rem', fontSize: '0.68rem', fontWeight: 600, color: 'rgba(240,238,248,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Technologies we work with
      </div>

      <motion.div
        style={{ display: 'flex', gap: '1rem', width: 'max-content' }}
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((t, i) => <Badge key={i} text={t} />)}
      </motion.div>
    </div>
  )
}
