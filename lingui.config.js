module.exports = {
  locales: ["en", "sv", "pseudo"],
  pseudoLocale: "pseudo",
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: "translations/locales/{locale}/messages",
      include: ["pages", "components"],
    },
  ],
  format: "po",
};
