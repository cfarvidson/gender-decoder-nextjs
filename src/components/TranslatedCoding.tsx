import { Coding } from "decoder/types";
import React from "react";
import { Trans } from "@lingui/macro";

type TranslatedCodingProps = {
  coding: Coding;
};

const TranslatedCoding: React.FC<TranslatedCodingProps> = ({ coding }) => {
  switch (coding) {
    case "feminine-coded":
      return <Trans id="coding.feminine-coded">feminine-coded</Trans>;
    case "strongly feminine-coded":
      return (
        <Trans id="coding.strongly-feminine-coded">
          strongly feminine-coded
        </Trans>
      );

    case "masculine-coded":
      return <Trans id="coding.masculine-coded">masculine-coded</Trans>;

    case "strongly masculine-coded":
      return (
        <Trans id="coding.strongly-masculine-coded">
          strongly masculine-coded
        </Trans>
      );
    case "neutral":
      return <Trans id="coding.neutral">neutral</Trans>;

    default:
      return <></>;
  }
};

export default TranslatedCoding;
