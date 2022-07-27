import { Locales, WordListType } from "decoder/types";
import EnglishWordList from "./en";
import SwedishWordList from "./sv";

export function importWordlist(locale: Locales): WordListType {
  switch (locale) {
    case "en":
      return new EnglishWordList();
    case "sv":
      return new SwedishWordList();
    default:
      return new EnglishWordList();
  }
}
