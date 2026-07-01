import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/Logo.png";

const links = [
  { label: "Apps", href: "#apps", isHash: true },
  { label: "Products", href: "/products", isHash: false },
  { label: "Stack", href: "#stack", isHash: true },
  { label: "About", href: "#about", isHash: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinkStyle = {
    fontSize: "0.9rem",
    fontWeight: 500,
    textDecoration: "none",
    color: "rgba(238,234,248,0.6)",
    letterSpacing: "0.01em",
    transition: "color 0.2s",
  };
  const onEnter = (e) => {
    e.currentTarget.style.color = "#fdbd10";
  };
  const onLeave = (e) => {
    e.currentTarget.style.color = "rgba(238,234,248,0.6)";
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.65rem 2rem",
        height: "auto",
        background: scrolled ? "rgba(7,8,24,0.92)" : "rgba(7,8,24,0.55)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            flexShrink: 0,
            background: "rgba(253,189,16,0.08)",
            border: "1px solid rgba(253,189,16,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Trisol"
            style={{ width: "68%", height: "68%", objectFit: "contain" }}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.05rem" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              fontWeight: 800,
              letterSpacing: "-0.4px",
              color: "#fff",
            }}
          >
            TRI<span style={{ color: "#fdbd10" }}>SOL</span>
          </div>
          <div
            style={{
              fontSize: "0.56rem",
              color: "rgba(253,189,16,0.75)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Technologies
          </div>
        </div>
      </Link>

      {/* Desktop links */}
      <div
        style={{ display: "flex", gap: "2.4rem", alignItems: "center" }}
        className="desktop-nav"
      >
        {links.map((l) =>
          l.isHash && onHome ? (
            <a
              key={l.label}
              href={l.href}
              style={navLinkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {l.label}
            </a>
          ) : l.isHash ? (
            <a
              key={l.label}
              href={`/${l.href}`}
              style={navLinkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {l.label}
            </a>
          ) : (
            <Link
              key={l.label}
              to={l.href}
              style={navLinkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {l.label}
            </Link>
          ),
        )}

        <a
          href={onHome ? "#partnership" : "/#partnership"}
          data-cursor
          style={{
            background: "#fdbd10",
            border: "none",
            color: "#1a1c4e",
            padding: "0.6rem 1.4rem",
            borderRadius: 9,
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "none",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ffc929";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fdbd10";
          }}
        >
          Partner With Us
        </a>
      </div>

      {/* Mobile button */}
      <button
        onClick={() => setMobileOpen((p) => !p)}
        style={{
          background: "transparent",
          border: "1px solid rgba(253,189,16,0.2)",
          color: "#fdbd10",
          cursor: "pointer",
          display: "none",
          padding: "0.55rem",
          borderRadius: 8,
        }}
        className="mobile-menu-btn"
      >
        {mobileOpen ? <X size={19} /> : <Menu size={19} />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: 64,
              left: "1rem",
              right: "1rem",
              background: "rgba(7,8,24,0.97)",
              backdropFilter: "blur(20px)",
              borderRadius: 14,
              border: "1px solid rgba(253,189,16,0.15)",
              padding: "1.4rem 1.6rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              zIndex: 50,
            }}
          >
            {links.map((l) =>
              l.isHash && onHome ? (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: "rgba(238,234,248,0.75)",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {l.label}
                </a>
              ) : l.isHash ? (
                <a
                  key={l.label}
                  href={`/${l.href}`}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: "rgba(238,234,248,0.75)",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: "rgba(238,234,248,0.75)",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {l.label}
                </Link>
              ),
            )}
            <a
              href={onHome ? "#partnership" : "/#partnership"}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "block",
                textAlign: "center",
                background: "#fdbd10",
                color: "#1a1c4e",
                padding: "0.75rem 1.4rem",
                borderRadius: 9,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.88rem",
              }}
            >
              Partner With Us
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
