import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tanstackStart(),
    nitro(),
    // React's Vite plugin must come after Start's Vite plugin.
    viteReact(),
  ],
});

