import React from "react";
import type { Locales } from "../decoder/types";
import { Trans } from "@lingui/macro";

type LocaleToNameProps = {
  locale: Locales;
};

const LocaleToName: React.FC<LocaleToNameProps> = ({ locale }) => {
  switch (locale) {
    case "en":
      return <Trans>English</Trans>;
    case "sv":
      return <Trans>Swedish</Trans>;
    case "pseudo":
      return <Trans>Pseudo</Trans>;
    default:
      throw new Error("Unknown locale");
  }
};

export default LocaleToName;
