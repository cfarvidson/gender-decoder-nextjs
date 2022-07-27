module.exports = {
  locales: ["en", "sv", "pseudo"],
  pseudoLocale: "pseudo",
  sourceLocale: "en",
  fallbackLocales: {
    default: "en",
  },
  catalogs: [
    {
      path: "<rootDir>/translations/locales/{locale}/messages",
      include: ["<rootDir>/pages", "<rootDir>/components"],
      exclude: ["**/node_modules/**"],
    },
  ],
  format: "po",
  rootDir: "src",
};
