import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Locales } from "decoder/types";
import LocaleToName from "./LocaleToName";
import { Trans } from "@lingui/macro";
import LocaleEmoji from "components/LocaleEmoji";

type MainHeaderProps = {};

const MainHeader: React.FC<MainHeaderProps> = ({}) => {
  const { locale: activeLocale, locales, asPath } = useRouter();

  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  return (
    <>
      <div className="flex justify-center sm:justify-between items-center">
        <h1 className="flex flex-col justify-end font-extrabold sm:font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          <span>
            <Trans>Gender Decoder</Trans>
          </span>
          <small className="whitespace-nowrap text-end text-sm sm:text-lg text-slate-500">
            <Trans>for tech job ads</Trans>
          </small>
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-4 justify-between">
        <div className="not-prose flex justify-center sm:block ">
          <Link href="/about">
            <a className="underline font-semibold">
              <Trans>What is this?</Trans>
            </a>
          </Link>
        </div>

        <div>
          <span className="sr-only">
            <Trans>Language</Trans>
          </span>
          <span className="flex justify-center mt-5 sm:mt-0 space-x-2 text-sm font-semibold">
            {locales?.map((locale, i) => {
              if (isProduction && locale === "pseudo") {
                return null;
              } else if (locale !== activeLocale) {
                return (
                  <Link href={asPath} locale={locale} key={i}>
                    <a className="no-underline hover:ring-2 hover:ring-slate-200 ring-offset py-1 px-3 rounded-lg">
                      <LocaleToName locale={locale as Locales} />
                      <LocaleEmoji
                        locale={locale as Locales}
                        className="ml-1"
                      />
                    </a>
                  </Link>
                );
              } else {
                return (
                  <span className="bg-slate-100  py-1 px-3 rounded-lg" key={i}>
                    <LocaleToName locale={locale as Locales} />
                    <LocaleEmoji locale={locale as Locales} className="ml-1" />
                  </span>
                );
              }
            })}
          </span>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
