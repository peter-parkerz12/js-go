// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  cloudflare: false,
  vite: {
    plugins: [
      VitePWA({
        injectRegister: false,
        includeAssets: ["offline.html", "icons/mysvg.svg"],
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: "JS:GO — Learn JavaScript from Zero to Pro",
          short_name: "JS:GO",
          description:
            "Premium documentation and learning platform for HTML, CSS, and JavaScript, with installable offline access.",
          theme_color: "#F5E900",
          background_color: "#0f172a",
          display: "standalone",
          scope: "/",
          start_url: "/?source=pwa",
          categories: ["education", "productivity", "developer"],
          icons: [
            {
              src: "/icons/mysvg.svg",
              type: "image/svg+xml",
              sizes: "any",
              purpose: "any maskable",
            },
            {
              src: "/icons/mysvg.svg",
              type: "image/svg+xml",
              sizes: "any",
              purpose: "any",
            },
          ],
        },
        workbox: {
          navigateFallback: "/offline.html",
          globPatterns: ["**/*.{js,css,html,svg,png,webmanifest}"],
          globIgnores: ["**/server/**", "**/node_modules/@tanstack/start-storage-context/**"],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-stylesheets",
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts-webfonts",
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
          ],
        },
      }),
    ],
  },
});
