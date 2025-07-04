/** @type {import('astro-i18next').AstroI18nextConfig} */

// Importa i file di traduzione per IT e EN
import it from "./public/locales/it/translation.json" assert { type: "json" };
import en from "./public/locales/en/translation.json" assert { type: "json" };

export default {
  defaultLocale: "it",
  locales: ["it", "en"],
  returnObjects: true,
  routes: {
    it: {
      Contatti: "Contatti",
    },
    en: {
      Contatti: "Contacs",
    },
  },
  i18nextServer: {
    resources: {
      it: {
        translation: {
          ...it,
        },
      },
      en: {
        translation: {
          ...en,
        },
      },
    },
  },
};
