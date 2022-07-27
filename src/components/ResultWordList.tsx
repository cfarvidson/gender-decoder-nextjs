import React from "react";
import _ from "lodash";
import { Trans } from "@lingui/macro";

type ResultsWordListProps = {
  words: string[];
  gender: "masculine" | "feminine";
};

const ResultsWordList: React.FC<ResultsWordListProps> = ({ words, gender }) => {
  const wordCount = _.countBy(words, (word) => word);
  if (words.length === 0) {
    return (
      <h3>
        {gender === "feminine" ? (
          <Trans>No feminine-coded words were found.</Trans>
        ) : (
          <Trans>No masculine-coded words were found.</Trans>
        )}
      </h3>
    );
  }

  const uniqueWords = _.uniq(words);

  return (
    <>
      <h3>
        {gender === "feminine" ? (
          <Trans>Feminine-coded words in this ad</Trans>
        ) : (
          <Trans>Masculine-coded words in this ad</Trans>
        )}
      </h3>
      <ul>
        {uniqueWords.map((word, i) => (
          <li key={i}>
            {word.toLowerCase()}{" "}
            {wordCount[word] > 1 ? (
              <Trans>({wordCount[word]} times)</Trans>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResultsWordList;
