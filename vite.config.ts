import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    tailwindcss(),
    metaImagesPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      // Force single React copy to avoid runtime bundle initialization issues
      react: path.resolve(import.meta.dirname, "node_modules", "react"),
      "react-dom": path.resolve(import.meta.dirname, "node_modules", "react-dom"),
    },
    // Ensure only one copy of React is bundled
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Disable minification during debugging to preserve readable React errors
    minify: false,
    rollupOptions: {
        output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Avoid creating a separate `vendor-react` chunk to prevent
            // circular initialization issues between React and other vendor
            // chunks when loaded as ES modules in production. Keep React with
            // the main vendor chunk.
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('framer-motion') || id.includes('@motionone')) return 'vendor-motion';
            if (id.includes('recharts')) return 'vendor-recharts';
            if (id.includes('gsap')) return 'vendor-gsap';
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
