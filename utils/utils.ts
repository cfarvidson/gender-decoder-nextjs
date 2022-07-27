import type { Locales } from "decoder/types";

export const getEnglishNameForLocale = (locale: Locales) => {
  switch (locale) {
    case "en":
      return "English";
    case "sv":
      return "Swedish";

    default:
      throw new Error("Unknown locale");
  }
};
