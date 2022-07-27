import React from "react";
import { JobAdResults } from "../decoder/types";
import ResultWordList from "components/ResultWordList";
import TranslatedCoding from "./TranslatedCoding";
import { Trans } from "@lingui/macro";
import CodedWordBox from "components/CodedWordBox";

type ResultsProps = {
  result: JobAdResults | null;
};
const Results: React.FC<ResultsProps> = ({ result }) => {
  if (result === null || result.text.length === 0) {
    return null;
  }

  const codingText =
    result.coding === "empty" ? (
      <Trans>The ad does not include any coded words</Trans>
    ) : (
      <>
        <Trans>The ad seems to be</Trans>{" "}
        <span className="font-extrabold text-yellow-500">
          <TranslatedCoding coding={result.coding} />
        </span>
      </>
    );

  return (
    <>
      <article>
        <h2>{codingText}</h2>

        <p>
          {result.coding === "feminine-coded" ? (
            <Trans id="explanation.feminine-coded">
              This job ad uses more words that are subtly coded as feminine than
              words that are subtly coded as masculine. Fortunately, the
              research suggests this will have only a slight effect on how
              appealing the job is to men, and will encourage women applicants.
            </Trans>
          ) : null}

          {result.coding === "strongly feminine-coded" ? (
            <Trans id="explanation.strongly feminine-coded">
              This job ad uses more words that are subtly coded as feminine than
              words that are subtly coded as masculine. Fortunately, the
              research suggests this will have only a slight effect on how
              appealing the job is to men, and will encourage women applicants.
            </Trans>
          ) : null}

          {result.coding === "masculine-coded" ? (
            <Trans id="explanation.masculine-coded">
              This job ad uses more words that are subtly coded as masculine
              than words that are subtly coded as feminine. It risks putting
              women off applying, but will probably encourage men to apply.
            </Trans>
          ) : null}

          {result.coding === "strongly masculine-coded" ? (
            <Trans id="explanation.strongly masculine-coded">
              This job ad uses more words that are subtly coded as masculine
              than words that are subtly coded as feminine. It risks putting
              women off applying, but will probably encourage men to apply.
            </Trans>
          ) : null}

          {result.coding === "empty" ? (
            <Trans id="explanation.empty">
              This job ad doesn't use any words that are subtly coded as
              masculine or feminine. It probably won't be off-putting to men or
              women applicants.
            </Trans>
          ) : null}

          {result.coding === "neutral" ? (
            <Trans id="explanation.neutral">
              This job ad uses an equal number of words that are subtly coded as
              masculine and feminine. It probably won't be off-putting to men or
              women applicants.
            </Trans>
          ) : null}
        </p>

        <p>
          <Trans id="results.explainer">
            Of course, there are plenty of other factors that affect the
            diversity of applicants for this role, and of the people who end up
            being hired. These include the company's reputation for
            inclusiveness, its culture, and the behaviour and prejudices (both
            conscious and unconscious) of the interviewers.
          </Trans>
        </p>

        <ResultWordList gender="masculine" words={result.masculineCodedWords} />
        <ResultWordList gender="feminine" words={result.feminineCodedWords} />
      </article>
    </>
  );
};

export default Results;
