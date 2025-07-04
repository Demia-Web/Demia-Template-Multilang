// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import netlify from "@astrojs/netlify";

import partytown from "@astrojs/partytown";

// @ts-ignore
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  devToolbar: {
    enabled: false,
  },

  adapter: netlify(),
  output: "server",
  integrations: [partytown(), astroI18next()],
});
