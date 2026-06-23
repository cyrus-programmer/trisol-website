import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { DollarSign, TrendingUp } from "lucide-react";

function FadeIn({ children, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Live apps (still active in stores) ──────────────────────────────────────
const liveApps = [
  {
    name: "QR Code Scanner",
    brand: "TriApp Techs",
    stack: "Flutter · Android · iOS",
    desc: "QR scanner and barcode reader with custom QR code maker. Daily utility for Android users with fast scanning and code generation.",
    icon: "https://play-lh.googleusercontent.com/rBO6Fe__5QBSyElZSmUNuB8ib875tkkbwIVPa30fGmtgVybLMJ4Gh3UtoEOGPdyMygKRSUA8_hzyivbb-tH-OA=w240-h480",
    cat: "Utility",
  },
  {
    name: "AI Voice Translator",
    brand: "TriApp Techs",
    stack: "Flutter · AI · Android · iOS",
    desc: "AI-powered voice translator for speech, text, photos and conversations across 100+ languages in real time.",
    icon: "https://play-lh.googleusercontent.com/ggy94_IcFLhNjmeC-29Hx8mpb-yZNqNni-tCy_HS58HJ4Tn_5NCEvd5vxEYj_DQBt0N_wvtnnH1b5YQOkQlL5ek=w240-h480",
    cat: "AI · Tools",
  },
  {
    name: "Reverse Singing",
    brand: "TriApp Techs",
    stack: "Flutter · Android",
    desc: "Reverse audio and singing app with slow-motion effects and viral challenge features. Built for entertainment and social sharing.",
    icon: "https://play-lh.googleusercontent.com/uIugOXxuIl_yImy2BT4zAejoYoU1jbcULPgRJy6xeC8ZXp1z6hUtPxSbaO45VMHXjBKJIyW16CHcdTpRxGo6=w240-h480",
    cat: "Entertainment",
  },
  {
    name: "Cloud Storage Backup",
    brand: "TriApp Techs",
    stack: "Flutter · Firebase · Android · iOS",
    desc: "Cloud storage and data backup app — manage and access photos, videos and files anytime, from anywhere.",
    icon: "https://play-lh.googleusercontent.com/ZtPjnLyE7JhSv6K5li6sPswTT41C4MMbeeezoRCkSAGj8hAJ0xPbc67GSbqcpiq6ZA0UDEJF5wd7tU4fGXji=w240-h480",
    cat: "Productivity",
  },
  {
    name: "Playground AI Generator",
    brand: "Brown Berry",
    stack: "Flutter · AI · Android · iOS",
    desc: "Instantly create AI art, photos and videos. 30+ frontier models including Sora, Kling, Flux and Veo — all in one app.",
    icon: "https://play-lh.googleusercontent.com/ERVu4uI4zFJR_wjaSxEDCVhWIJ0ssYTbAaBURPpM6ajomgvCnPcYltMGruFgJh9Hs7WlC2wIEi8WG5ceRizkA8E=w240-h480",
    cat: "AI · Generation",
    featured: true,
  },
  {
    name: "Smart Printer",
    brand: "Brown Berry",
    stack: "Flutter · Android",
    desc: "Wireless printing from mobile — scan, manage PDFs and print documents, photos or files instantly over WiFi or AirPrint.",
    icon: "https://play-lh.googleusercontent.com/zEdoxQRiYJtttFO9NFytvF2GOq_1EYGDiA8TxBFCn6WmSvG1kTsZkUPwga9Krx_xItVZ5i1Xa5B4vJ7elg8T1A=w240-h480",
    cat: "Productivity",
  },
  {
    name: "Budget Planner",
    brand: "Brown Berry",
    stack: "Flutter · Android",
    desc: "Monthly budget planner and daily expense tracker. Track finances, set goals and visualise spending patterns clearly.",
    icon: "https://play-lh.googleusercontent.com/5fioQFyT9IegJca9DIHYb2tTC48l5k_6SbnJNsfuFstEHQBcAnccpXN3lP3FKZWiWN9Ak7TMNfirjHvyLzNa_Q=w240-h480",
    cat: "Fintech",
  },
  {
    name: "Voice Changer",
    brand: "Brown Berry",
    stack: "Flutter · Android",
    desc: "Change your voice with fun sound effects and share recordings with friends. Supports 30+ voice filters and real-time preview.",
    icon: "https://play-lh.googleusercontent.com/AOK44P4OhOjH6HXz2wPki9sfLz2IyF_Mqpp03Q86M_wMMpyJsDSbDhcsnqTC_AuleGrVeT9lWbMw1SDqXKcyWg=w240-h480",
    cat: "Entertainment",
  },
  {
    name: "Bluetooth Auto Connect",
    brand: "Brown Berry",
    stack: "Flutter · Android",
    desc: "Bluetooth device finder and auto-connect tool for easy pairing. Remembers preferred devices and connects automatically.",
    icon: "https://play-lh.googleusercontent.com/kDAma8vXsLolLjbDNJNiAAyHNr3PPHlmhvyQsWSrI8M9ZwxxVZwHwpDTl3Bcr5uAR2Y1M6F6kTwAS0H_0sWV=w240-h480",
    cat: "Utility",
  },
];

// ── Exited apps ──────────────────────────────────────────────────────────────
const exits = [
  { name: "Cloud Storage Backup", amount: "$22,000" },
  { name: "GPS Map Camera", amount: "$14,000" },
  { name: "Bluetooth Auto Connect", amount: "$18,000" },
  { name: "Amharic Keyboard", amount: "$50,000" },
  { name: "Phone Cleaner", amount: "$10,000" },
  { name: "QR Code Scanner", amount: "$15,000" },
  { name: "Smart Printer", amount: "$30,000" },
  { name: "Playground AI Generator", amount: "$100,000" },
  { name: "Amharic Keyboard (BB)", amount: "$20,000" },
];

const totalExits = exits.reduce(
  (s, e) => s + parseInt(e.amount.replace(/[$,]/g, "")),
  0,
);

// ── App card ─────────────────────────────────────────────────────────────────
function AppCard({ app, index }) {
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <FadeIn delay={index * 0.055}>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        className={`app-card ${app.featured ? "app-card--featured" : ""}`}
        style={{
          position: "relative",
          overflow: "hidden",
          cursor: "none",
          background: app.featured
            ? "rgba(253,189,16,0.06)"
            : "rgba(40,42,114,0.07)",
          border: `1px solid ${app.featured ? "rgba(253,189,16,0.22)" : "rgba(40,42,114,0.26)"}`,
          borderRadius: 18,
          padding: "1.6rem",
          backdropFilter: "blur(14px)",
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
          transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Spotlight glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 18,
            pointerEvents: "none",
            zIndex: 1,
            background:
              "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(253,189,16,0.07), transparent 65%)",
          }}
        />

        {/* Top accent */}
        {app.featured && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(253,189,16,0.5), transparent)",
            }}
          />
        )}

        {/* Header row */}
        <div
          style={{
            display: "flex",
            gap: "0.9rem",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Image placeholder while loading */}
          <div
            style={{
              position: "relative",
              width: 52,
              height: 52,
              borderRadius: 12,
              flexShrink: 0,
              background: "rgba(40,42,114,0.3)",
              overflow: "hidden",
            }}
          >
            <img
              src={app.icon}
              alt={app.name}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {!imageLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(253,189,16,0.1)",
                  animation: "pulse 2s infinite",
                }}
              />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.2rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "#eeeaf8",
                  lineHeight: 1.2,
                }}
              >
                {app.name}
              </span>
              {app.featured && (
                <span
                  style={{
                    background: "rgba(253,189,16,0.15)",
                    border: "1px solid rgba(253,189,16,0.3)",
                    color: "#fdbd10",
                    padding: "0.1rem 0.55rem",
                    borderRadius: 100,
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Flagship
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                color: "rgba(238,234,248,0.35)",
                letterSpacing: "0.04em",
              }}
            >
              {app.brand}
            </div>
          </div>
          <span
            style={{
              background: "rgba(40,42,114,0.25)",
              border: "1px solid rgba(40,42,114,0.4)",
              color: "rgba(238,234,248,0.45)",
              padding: "0.2rem 0.6rem",
              borderRadius: 100,
              fontSize: "0.65rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {app.cat}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "0.82rem",
            color: "rgba(238,234,248,0.48)",
            lineHeight: 1.7,
            position: "relative",
            zIndex: 2,
            margin: 0,
          }}
        >
          {app.desc}
        </p>

        {/* Stack */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* <div
            style={{
              width: 20,
              height: 1,
              background: "rgba(253,189,16,0.3)",
              borderRadius: 1,
            }}
          /> */}
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.68rem",
              color: "rgba(253,189,16,0.6)",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            {app.stack}
          </span>
        </div>
      </div>

      <style>{`
        .app-card:hover {
          border-color: rgba(253,189,16,0.3) !important;
          transform: translateY(-5px);
          box-shadow: 0 22px 55px rgba(0,0,0,0.5), 0 0 30px rgba(253,189,16,0.05);
        }
        .app-card--featured:hover { border-color: rgba(253,189,16,0.45) !important; }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </FadeIn>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────
export default function Apps() {
  return (
    <section
      id="apps"
      style={{
        padding: "8rem 4rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        {/* ── Live portfolio ── */}
        <FadeIn>
          <div style={{ marginBottom: "3.5rem" }}>
            <div
              style={{
                fontSize: "0.68rem",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fdbd10",
                marginBottom: "0.75rem",
              }}
            >
              Portfolio
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                letterSpacing: "-1px",
                color: "#fff",
                lineHeight: 1.08,
                marginBottom: "0.9rem",
              }}
            >
              Apps we've shipped
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "1rem",
                color: "rgba(238,234,248,0.48)",
                maxWidth: 500,
                lineHeight: 1.78,
              }}
            >
              From utility tools to AI-powered generators — 50+ apps built,
              scaled and monetised across two studios.
            </p>
          </div>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.1rem",
            marginBottom: "6rem",
          }}
          className="apps-grid"
        >
          {liveApps.map((app, i) => (
            <AppCard key={app.name} app={app} index={i} />
          ))}
        </div>

        {/* ── Exits ── */}
        <FadeIn>
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                fontSize: "0.68rem",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fdbd10",
                marginBottom: "0.75rem",
              }}
            >
              Exits
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                letterSpacing: "-0.7px",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              15+ successful acquisitions
            </h3>

            {/* Total callout - moved to top */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1rem",
                background: "rgba(253,189,16,0.08)",
                border: "1px solid rgba(253,189,16,0.2)",
                borderRadius: 14,
                padding: "1.1rem 1.4rem",
                backdropFilter: "blur(12px)",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: "rgba(253,189,16,0.12)",
                  border: "1px solid rgba(253,189,16,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TrendingUp size={18} color="#fdbd10" strokeWidth={1.7} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.4rem",
                    color: "#fdbd10",
                    letterSpacing: "-0.5px",
                    lineHeight: 1,
                  }}
                >
                  ${(totalExits / 1000).toFixed(0)}K+
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    color: "rgba(238,234,248,0.38)",
                    marginTop: "0.2rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  Total exit value
                </div>
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "0.95rem",
                color: "rgba(238,234,248,0.46)",
                lineHeight: 1.78,
              }}
            >
              We build with acquisition in mind — clean code, documented
              architecture, proven revenue. Here's a selection of completed
              exits.
            </p>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .apps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .apps-grid { grid-template-columns: 1fr !important; }
          #apps { padding: 5rem 1.5rem !important; }
        }
      `}</style>
    </section>
  );
}
