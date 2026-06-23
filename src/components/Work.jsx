import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Bento-style card
function AppCard({ app, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  const isBig = index === 0 || index === 5;

  return (
    <FadeIn delay={index * 0.07}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="app-card"
        style={{
          gridColumn: isBig ? "span 2" : "span 1",
          position: "relative",
          overflow: "hidden",
          background: "rgba(40,42,114,0.08)",
          border: "1px solid rgba(40,42,114,0.25)",
          borderRadius: 20,
          padding: "2rem",
          backdropFilter: "blur(12px)",
          cursor: "none",
          minHeight: isBig ? 220 : 180,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Spotlight glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            pointerEvents: "none",
            zIndex: 1,
            background:
              "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(253,189,16,0.06), transparent 70%)",
          }}
        />

        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background: `linear-gradient(90deg, transparent, ${app.color}55, transparent)`,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: app.color,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                {app.cat}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isBig ? "1.5rem" : "1.2rem",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                {app.name}
              </div>
            </div>
            <span
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(240,238,248,0.5)",
                padding: "0.25rem 0.7rem",
                borderRadius: 100,
                fontSize: "0.68rem",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {app.tag}
            </span>
          </div>
          <p
            style={{
              fontSize: "0.88rem",
              color: "rgba(240,238,248,0.45)",
              lineHeight: 1.68,
              maxWidth: 380,
            }}
          >
            {app.desc}
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 2, marginTop: "1.5rem" }}>
          <div
            style={{
              width: 28,
              height: 2,
              background: app.color,
              borderRadius: 1,
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      <style>{`
        .app-card:hover {
          border-color: rgba(253,189,16,0.28) !important;
          transform: translateY(-5px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(253,189,16,0.05);
        }
      `}</style>
    </FadeIn>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      style={{
        padding: "7rem 3rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ marginBottom: "4rem" }}>
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fdbd10",
                marginBottom: "0.7rem",
              }}
            >
              Portfolio
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                letterSpacing: "-1px",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "0.8rem",
              }}
            >
              Products we've shipped
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "rgba(240,238,248,0.45)",
                maxWidth: 500,
                lineHeight: 1.75,
              }}
            >
              From zero to app stores to exits. A selection from our 50+ shipped
              products.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.2rem",
          }}
        >
          {apps.map((app, i) => (
            <AppCard key={app.name} app={app} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #work .app-card { grid-column: span 1 !important; }
          #work > div > div:last-child { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 1100px) {
          #work > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
