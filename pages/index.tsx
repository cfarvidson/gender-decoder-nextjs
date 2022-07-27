import { useState, useCallback, useEffect } from "react";
import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { analyze } from "decoder/analyze";
import { JobAdResults, Locales } from "decoder/types";
import Results from "@/components/Results";
import isHotkey from "is-hotkey";
import { Trans, t } from "@lingui/macro";
import { loadTranslation } from "translations/utils";

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  const [result, setResult] = useState<null | JobAdResults>(null);
  const [isMac, setIsMac] = useState<boolean | null>(null);
  const [text, setText] = useState("");
  const { locale: activeLocale } = useRouter();

  useEffect(() => {
    const isMac = window.navigator.userAgent.match(/Mac OS/i) ? true : false;
    setIsMac(isMac);
  }, []);

  const onAnalyze = useCallback(() => {
    if (result) {
      setResult(null);
      setText("");
    } else {
      setResult(analyze(text, activeLocale as Locales));
    }
  }, [activeLocale, result, text]);

  return (
    <>
      <Head>
        <title>Tech Job Ad - Gender Decoder</title>
        <meta name="description" content={t`Finding subtle bias in job ads`} />
      </Head>
      <p className="not-prose text-3xl mx-auto font-semibold">
        <Trans>Finding subtle bias in job ads</Trans>
      </p>
      <Trans>
        <p>
          Without realising it, we all use language that is subtly
          ‘gender-coded’. Society has certain expectations of what men and women
          are like, and how they differ, and this seeps into the language we
          use. Think about “bossy” and “feisty”: we almost never use these words
          to describe men.
        </p>
        <p>
          This linguistic gender-coding shows up in job adverts as well, and
          research has shown that it puts women off applying for jobs that are
          advertised with masculine-coded language.
        </p>
        <p>
          This site is a quick way to check whether a job advert has the kind of
          subtle linguistic gender-coding that has this discouraging effect.
        </p>
      </Trans>

      <textarea
        className={`border-4 border-slate-200 rounded-xl w-full h-48 p-2 ring-blue-200 ring-offset-2  focus:outline-none  text-slate-600 placeholder:italic placeholder:text-slate-400 focus:border-slate-400 ${
          result && "hidden"
        }`}
        title="Ad text"
        placeholder={t`Paste your ad text here`}
        onChange={(event) => {
          setText(event.target.value);
        }}
        value={text}
        disabled={Boolean(result)}
        onKeyDown={(e) => {
          if (isHotkey("mod+enter", e)) {
            onAnalyze();
          }
        }}
      />
      <div className="w-full flex">
        <button
          className="mt-5 rounded-xl py-2 px-10 mx-auto border-4 border-slate-200 text-slate-600 font-bold uppercase focus:outline-none hover:shadow-2xl focus:shadow-2xl hover:border-slate-400 focus:border-slate-400 disabled:text-slate-200 disabled:cursor-not-allowed disabled:hidden"
          type="button"
          onClick={onAnalyze}
          disabled={text === ""}
        >
          <div>
            {result ? <Trans>Test another Ad</Trans> : <Trans>Analyze</Trans>}
          </div>
          {!result && (
            <div className="text-xs text-slate-400 pb-2">
              ({`${isMac ? "command" : "ctrl"} + enter`})
            </div>
          )}
        </button>
      </div>

      <Results result={result} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const translation = await loadTranslation(
    ctx.locale!,
    process.env.NODE_ENV === "production"
  );
  return {
    props: {
      translation,
    },
  };
};

export default Home;
