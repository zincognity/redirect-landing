// @ts-check
import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
    site: "https://incognity.link",
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()],
        server: {
            fs: {
                allow: [process.cwd()],
            },
        },
    },
    output: "static",
    adapter: node({
        mode: "standalone",
    }),
    server: {
        host: true,
    },
});
