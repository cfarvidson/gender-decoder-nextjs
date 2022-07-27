export type Locales = "en" | "sv" | "pseudo";

export type Coding =
  | "feminine-coded"
  | "strongly feminine-coded"
  | "masculine-coded"
  | "strongly masculine-coded"
  | "empty"
  | "neutral";

export type JobAdResults = {
  text: string;
  language: Locales;
  masculineCodedWords: string[];
  feminineCodedWords: string[];
  coding: Coding;
  codedWordCounter: number;
};

export interface WordListType {
  name: string;
  languageCode: string;
  feminineCodedWords: string[];
  masculineCodedWords: string[];
}
