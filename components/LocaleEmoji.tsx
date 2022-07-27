import React from "react";
import { Locales } from "decoder/types";
import { t } from "@lingui/macro";

type LocaleEmojiProps = {
  locale: Locales;
  className?: string;
};

const LocaleEmoji: React.FC<LocaleEmojiProps> = ({ locale, className }) => {
  let emoji: string, label;
  switch (locale) {
    case "en":
      emoji = "🇺🇸";
      label = t`USA flag`;
      break;

    case "sv":
      emoji = "🇸🇪";
      label = t`Swedish flag`;
      break;

    case "pseudo":
      emoji = "🏴‍☠️";
      label = t`Pirate flag`;
      break;
    default:
      return null;
  }
  return (
    <span role="img" aria-label={label} className={className}>
      {emoji}
    </span>
  );
};

export default LocaleEmoji;
