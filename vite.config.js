import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` only needs to be the GitHub Pages subpath when actually BUILDING
// for production. During local dev ("vite" / "npm run dev"), base stays at
// "/" so the app serves correctly at http://localhost:5173/ — no need to
// remember to visit /trisol-website/ locally, and no risk of links breaking
// when you click "Back to home" from a nested route during dev.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/trisol-website/" : "/",
  build: {
    outDir: "dist",
    sourcemap: false,
  },
}));
