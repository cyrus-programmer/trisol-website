import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Apps", href: "#apps" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Partners", href: "#partnership" },
];

function MovingBorder({ children, duration = 5000, ...props }) {
  return (
    <div {...props} style={{ position: "relative", ...props.style }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: "0px",
          background: `conic-gradient(
            from 0deg,
            #fdbd10,
            #ffc929,
            #fdbd10,
            #fd9d1a,
            #fdbd10
          )`,
          animation: `conic-rotation ${duration}ms linear infinite`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes conic-rotation {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Glow effect that follows cursor */}
      {/* <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 50,
          width: "100%",
          height: 80,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(253,189,16,0.08), transparent 80%)`,
          transition: "background 0.1s ease",
        }}
      /> */}

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1.5rem",
          height: "auto",
          background: scrolled ? "rgba(7,8,24,0.85)" : "rgba(7,8,24,0.4)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(6px)",
          borderBottom: scrolled
            ? "1px solid rgba(253,189,16,0.12)"
            : "1px solid rgba(253,189,16,0.06)",
          boxShadow: scrolled
            ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(253,189,16,0.08)"
            : "inset 0 1px 0 rgba(253,189,16,0.05)",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Logo section */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          // transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            textDecoration: "none",
            position: "relative",
            zIndex: 10,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            // animate={{ rotate: 360 }}
            // transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "relative",
              width: 45,
              height: 45,
              background: "rgba(253,189,16,0.1)",
              borderRadius: 12,
              border: "1px solid rgba(253,189,16,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src="https://trisoltechnologies.com/wp-content/uploads/2024/07/cropped-Logo-copy-2.png"
              alt="Trisol"
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
                // filter: "brightness(1.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                // background:
                //   "radial-gradient(circle at 30% 30%, rgba(253,189,16,0.4), transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                background: "linear-gradient(135deg, #fff 0%, #eeeaf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              TRI<span style={{ color: "#fdbd10" }}>SOL</span>
            </div>
            <div
              style={{
                fontSize: "0.6rem",
                color: "#fdbd10",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Technologies
            </div>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <motion.div
          style={{
            display: "flex",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="desktop-nav"
        >
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              style={{
                position: "relative",
                fontSize: "0.95rem",
                fontWeight: 500,
                textDecoration: "none",
                color: "#eeeaf8",
                letterSpacing: "0.02em",
                transition: "color 0.3s ease",
              }}
              whileHover={{
                color: "#fdbd10",
              }}
              onMouseEnter={(e) => {
                const underline = e.currentTarget.querySelector("span");
                if (underline) {
                  underline.style.width = "100%";
                  underline.style.opacity = "1";
                }
              }}
              onMouseLeave={(e) => {
                const underline = e.currentTarget.querySelector("span");
                if (underline) {
                  underline.style.width = "0";
                  underline.style.opacity = "0";
                }
              }}
            >
              {l.label}
              <span
                style={{
                  position: "absolute",
                  bottom: -6,
                  left: 0,
                  width: 0,
                  height: 2,
                  background:
                    "linear-gradient(90deg, #fdbd10, rgba(253,189,16,0))",
                  borderRadius: 1,
                  opacity: 0,
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Premium CTA Button with Moving Border */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MovingBorder
            duration={3000}
            style={{
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <motion.a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                background:
                  "linear-gradient(135deg, #fdbd10 0%, #ffc929 50%, #fdbd10 100%)",
                color: "#1a1c4e",
                padding: "0.75rem 1.8rem",
                borderRadius: 10,
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "none",
                letterSpacing: "0.02em",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  "0 0 28px rgba(253,189,16,0.45), 0 8px 24px rgba(253,189,16,0.2)",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              whileHover={{
                boxShadow:
                  "0 0 48px rgba(253,189,16,0.65), 0 12px 36px rgba(253,189,16,0.3)",
              }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Get in Touch
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.a>
          </MovingBorder>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: mobileOpen ? "rgba(253,189,16,0.15)" : "transparent",
            border: mobileOpen
              ? "1px solid rgba(253,189,16,0.3)"
              : "1px solid rgba(253,189,16,0.15)",
            color: "#fdbd10",
            cursor: "pointer",
            display: "none",
            padding: "0.7rem",
            borderRadius: 10,
            transition: "all 0.3s ease",
          }}
          className="mobile-menu-btn"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 76,
              left: "1.5rem",
              right: "1.5rem",
              background: "rgba(7,8,24,0.95)",
              backdropFilter: "blur(24px)",
              borderRadius: 16,
              border: "1px solid rgba(253,189,16,0.2)",
              boxShadow:
                "0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(253,189,16,0.1)",
              padding: "1.8rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.3rem",
              zIndex: 50,
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  color: "#eeeaf8",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#fdbd10")}
                onMouseLeave={(e) => (e.target.style.color = "#eeeaf8")}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginTop: "0.5rem" }}
            >
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #fdbd10 0%, #ffc929 100%)",
                  color: "#1a1c4e",
                  padding: "0.9rem 1.5rem",
                  borderRadius: 10,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  boxShadow: "0 0 28px rgba(253,189,16,0.45)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = "0 0 48px rgba(253,189,16,0.65)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "0 0 28px rgba(253,189,16,0.45)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}
