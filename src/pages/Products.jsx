import { useState, useRef, useMemo, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Grid3x3 } from "lucide-react";
import { allApps } from "../data/apps";

function FadeIn({ children, delay = 0, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ app, index }) {
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    cardRef.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const flagshipLabel = app.flagship ? "Flagship" : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{
        duration: 0.3,
        delay: index * 0.025,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
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

        <div
          style={{
            display: "flex",
            gap: "0.9rem",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              position: "relative",
              width: 52,
              height: 52,
              borderRadius: 12,
              flexShrink: 0,
              background: "rgba(40,42,114,0.3)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {app.icon ? (
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
            ) : (
              <Grid3x3
                size={20}
                color="rgba(253,189,16,0.5)"
                strokeWidth={1.6}
              />
            )}
            {app.icon && !imageLoaded && (
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
              {flagshipLabel && (
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
                  {flagshipLabel}
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

        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            color: "rgba(253,189,16,0.6)",
            fontWeight: 500,
            letterSpacing: "0.04em",
            position: "relative",
            zIndex: 2,
          }}
        >
          {app.stack}
        </span>
      </div>
      <style>{`
        .app-card:hover { border-color: rgba(253,189,16,0.3) !important; transform: translateY(-5px); box-shadow: 0 22px 55px rgba(0,0,0,0.5), 0 0 30px rgba(253,189,16,0.05); }
        .app-card--featured:hover { border-color: rgba(253,189,16,0.45) !important; }
        @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
      `}</style>
    </motion.div>
  );
}

export default function Products() {
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(allApps.map((a) => a.category))],
    [],
  );
  const filtered = useMemo(
    () =>
      filter === "All" ? allApps : allApps.filter((a) => a.category === filter),
    [filter],
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: "7rem" }}>
      <div
        style={{ maxWidth: 1300, margin: "0 auto", padding: "2rem 4rem 8rem" }}
        className="products-wrap"
      >
        <FadeIn>
          <Link
            to="/"
            data-cursor
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(238,234,248,0.45)",
              fontFamily: "var(--font-body)",
              fontSize: "0.85rem",
              textDecoration: "none",
              marginBottom: "2.5rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fdbd10")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(238,234,248,0.45)")
            }
          >
            <ArrowLeft size={15} /> Back to home
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div style={{ marginBottom: "3rem" }}>
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
              Full Catalogue
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
                letterSpacing: "-1.2px",
                color: "#fff",
                lineHeight: 1.06,
                marginBottom: "1rem",
              }}
            >
              Every product we've shipped
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "1.02rem",
                color: "rgba(238,234,248,0.48)",
                maxWidth: 560,
                lineHeight: 1.78,
              }}
            >
              {allApps.length} apps across two studios — TriApp Techs and Brown
              Berry. Filter by category to explore the full portfolio.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "3rem",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                data-cursor
                onClick={() => setFilter(cat)}
                style={{
                  background:
                    filter === cat
                      ? "rgba(253,189,16,0.15)"
                      : "rgba(40,42,114,0.1)",
                  border: `1px solid ${filter === cat ? "rgba(253,189,16,0.4)" : "rgba(40,42,114,0.3)"}`,
                  color: filter === cat ? "#fdbd10" : "rgba(238,234,248,0.5)",
                  padding: "0.55rem 1.3rem",
                  borderRadius: 100,
                  fontFamily: "var(--font-body)",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  cursor: "none",
                  transition: "background 0.2s, border-color 0.2s, color 0.2s",
                }}
              >
                {cat}{" "}
                {cat !== "All" && (
                  <span style={{ opacity: 0.5, fontSize: "0.78rem" }}>
                    ({allApps.filter((a) => a.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.1rem",
          }}
          className="products-grid"
        >
          {filtered.map((app, i) => (
            <ProductCard key={app.name} app={app} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "4rem 0",
              color: "rgba(238,234,248,0.4)",
              fontFamily: "var(--font-body)",
            }}
          >
            No products in this category yet.
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1100px) { .products-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 700px) {
          .products-grid { grid-template-columns: 1fr !important; }
          .products-wrap { padding: 2rem 1.5rem 5rem !important; }
        }
      `}</style>
    </div>
  );
}
