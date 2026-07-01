import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  const links = [
    { label: "Apps", href: "#apps", isHash: true },
    { label: "Products", href: "/products", isHash: false },
    { label: "Stack", href: "#stack", isHash: true },
    { label: "Partners", href: "#partnership", isHash: true },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "2.5rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.55rem",
          textDecoration: "none",
        }}
      >
        <img
          src="/Logo.png"
          alt="Trisol"
          style={{ width: 26, height: 26, objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.9rem",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          TRI<span style={{ color: "#fdbd10" }}>SOL</span> TECHNOLOGIES
        </span>
      </Link>

      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map((l) =>
          l.isHash && onHome ? (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: "0.8rem",
                color: "rgba(238,234,248,0.4)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ) : l.isHash ? (
            <a
              key={l.label}
              href={`/${l.href}`}
              style={{
                fontSize: "0.8rem",
                color: "rgba(238,234,248,0.4)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ) : (
            <Link
              key={l.label}
              to={l.href}
              style={{
                fontSize: "0.8rem",
                color: "rgba(238,234,248,0.4)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </Link>
          ),
        )}
      </div>

      <span style={{ fontSize: "0.75rem", color: "rgba(238,234,248,0.25)" }}>
        © 2025 Trisol Technologies
      </span>

      <style>{`
        @media (max-width: 768px) { footer { flex-direction: column; text-align: center; padding: 2rem 1.5rem; } }
      `}</style>
    </footer>
  );
}
