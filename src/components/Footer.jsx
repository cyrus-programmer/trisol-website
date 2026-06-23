import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '2.5rem 3rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem'
    }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', textDecoration: 'none' }}>
        <img
          src="https://trisoltechnologies.com/wp-content/uploads/2024/07/cropped-Logo-copy-2.png"
          alt="Trisol"
          style={{ width: 26, height: 26, objectFit: 'contain' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>
          TRI<span style={{ color: '#fdbd10' }}>SOL</span> TECHNOLOGIES
        </span>
      </a>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {['About', 'Work', 'Stack', 'Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontSize: '0.8rem', color: 'rgba(240,238,248,0.4)', textDecoration: 'none', transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.target.style.color = '#fdbd10'}
          onMouseLeave={e => e.target.style.color = 'rgba(240,238,248,0.4)'}
          >{l}</a>
        ))}
      </div>

      <span style={{ fontSize: '0.75rem', color: 'rgba(240,238,248,0.25)' }}>
        © 2025 Trisol Technologies
      </span>

      <style>{`
        @media (max-width: 768px) {
          footer { flex-direction: column; text-align: center; padding: 2rem 1.5rem; }
          footer > div { justify-content: center; }
        }
      `}</style>
    </footer>
  )
}
