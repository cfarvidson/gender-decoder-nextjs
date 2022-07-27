import _ from "lodash";
import type { JobAdResults, Coding, Locales } from "./types";
import { importWordlist } from "./wordlists/wordlists";

function cleanText(text: string): string {
  let cleaned = text.replace(/[^a-zA-Z'-åäöÅÄÖ]+/g, " ");
  cleaned = cleaned.replaceAll(".", " ");
  cleaned = cleaned.replaceAll(",", " ");
  return cleaned;
}

const extractExpectedMultipartWord = (
  wordsInAd: string[],
  indexOfMatchingStart: number,
  lengthOfExpectedWord: number
) =>
  _.chain(wordsInAd)
    .slice(
      Number(indexOfMatchingStart),
      Number(indexOfMatchingStart) + lengthOfExpectedWord
    )
    .filter((v) => !_.isEmpty(v))
    .join(" ")
    .value();

const getCodedWords = (text: string, codedWords: string[]): string[] => {
  const cleanedText = cleanText(text);
  let foundCodedWords = [];
  for (const i in codedWords) {
    const codedWord = codedWords[i];

    const wordsInAd = cleanedText.split(" ");
    for (const wordInAdIndex in wordsInAd) {
      let word: string, wordMatches: boolean;
      if (codedWord.includes(" ")) {
        word = extractExpectedMultipartWord(
          wordsInAd,
          Number(wordInAdIndex),
          Number(codedWord.split(" ").length)
        );
        wordMatches =
          word.toLocaleLowerCase() === codedWord.toLocaleLowerCase();
      } else {
        word = wordsInAd[wordInAdIndex];
        wordMatches = word
          .toLocaleLowerCase()
          .startsWith(codedWord.toLocaleLowerCase());
      }

      if (wordMatches) {
        foundCodedWords.push(word.toLocaleLowerCase());
      }
    }
  }

  return foundCodedWords.sort();
};

export const analyze = (text: string, language: Locales): JobAdResults => {
  const wordlist = importWordlist(language);
  const masculineCodedWords = getCodedWords(text, wordlist.masculineCodedWords);
  const feminineCodedWords = getCodedWords(text, wordlist.feminineCodedWords);

  const assessCoding = (): Coding => {
    const score = feminineCodedWords.length - masculineCodedWords.length;
    if (score === 0) {
      if (feminineCodedWords.length) {
        return "neutral";
      } else {
        return "empty";
      }
    } else if (score > 3) {
      return "strongly feminine-coded";
    } else if (score > 0) {
      return "feminine-coded";
    } else if (score < -3) {
      return "strongly masculine-coded";
    } else {
      return "masculine-coded";
    }
  };

  const coding = assessCoding();

  return {
    text,
    language,
    masculineCodedWords,
    feminineCodedWords,
    codedWordCounter: masculineCodedWords.length + feminineCodedWords.length,
    coding,
  };
};
