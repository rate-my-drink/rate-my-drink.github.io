import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    VitePWA({
      includeAssets: ["logo.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Caffeine Critics",
        short_name: "Caffeine Critics",
        description: "Caffeine Critics: Rate teas and coffees you love or hate",
        theme_color: "#f59e0b",
        icons: [
          {
            src: "logo_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/",
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: "happy-dom",
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
