import { useEffect, useRef } from "react";

// Simple, restrained custom cursor: one dot that follows instantly,
// one ring that trails slightly and grows on hover. No glow, no trail, no flash.
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => {
      hovering.current = true;
    };
    const onLeave = () => {
      hovering.current = false;
    };

    window.addEventListener("mousemove", onMove);

    const selectors = "a, button, [data-cursor], input, textarea, select";
    const bindEl = (el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    };
    const observer = new MutationObserver(() => {
      document.querySelectorAll(selectors).forEach(bindEl);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(selectors).forEach(bindEl);

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.2;
      ring.current.y += (pos.current.y - ring.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
      }
      if (ringRef.current) {
        const size = hovering.current ? 36 : 24;
        const offset = size / 2;
        ringRef.current.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor = hovering.current
          ? "rgba(253,189,16,0.6)"
          : "rgba(253,189,16,0.28)";
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          background: "#fdbd10",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          border: "1.5px solid rgba(253,189,16,0.28)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          transition:
            "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
      />
    </>
  );
}
