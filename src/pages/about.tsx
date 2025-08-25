import Head from "next/head";
import { GetStaticProps, NextPage } from "next/types";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Trans, t } from "@lingui/macro";
import { importWordlist } from "decoder/wordlists/wordlists";
import { Locales } from "decoder/types";
import { loadTranslation } from "translations/utils";
import CodedWordBox from "components/CodedWordBox";

const CodedWordsPage: NextPage = () => {
  const { locale } = useRouter();
  const wordlist = importWordlist(locale as Locales);

  return (
    <>
      <Head>
        <title>Tech Job Ad - Gender Decoder - Words</title>
        <meta name="description" content={t`All of the coded words`} />
      </Head>

      <div className="mt-10">
        <Link href="/" className="text-2xl">
          <span aria-hidden="true"></span>
          {"< "}
          <Trans>Go Back</Trans>
        </Link>
      </div>

      <h2>
        <Trans>About this tool</Trans>
      </h2>
      <Trans id="about.intro">
        <p>
          This tool was inspired by a research paper written by Danielle
          Gaucher, Justin Friesen, and Aaron C. Kay back in 2011, called{" "}
          <a
            href="https://psycnet.apa.org/record/2011-04642-001"
            target="blank"
          >
            Evidence That Gendered Wording in Job Advertisements Exists and
            Sustains Gender Inequality
          </a>{" "}
          (Journal of Personality and Social Psychology, July 2011, Vol 101(1),
          p109-128).
        </p>

        <p>
          In this paper the researchers showed job adverts which included
          different kinds of gender-coded language to men and women and recorded
          how appealing the jobs seemed and how much the participants felt that
          they 'belonged' in that occupation. No non-binary people were included
          in this research, and the research didn't touch on non-binary-coded
          words.
        </p>
        <p>
          Their results showed that women felt that job adverts with
          masculine-coded language were less appealing and that they belonged
          less in those occupations. For men, feminine-coded adverts were only
          slightly less appealing and there was no effect on how much the men
          felt they belonged in those roles.
        </p>

        <p>
          Below are the full lists of words that this research considered
          masculine- and feminine-coded. This tool checks job adverts for the
          appearance of any of these words, then calculates the relative
          proportion of masculine-coded and feminine-coded words to reach an
          overall verdict on the gender-coding of the advert. Some words have
          been reduced to a 'stem' to cover a range of noun, verb and adjective
          variants; for instance "compet" covers "compete", "competetive" and
          "competition".
        </p>
      </Trans>

      {locale === "sv" ? (
        <>
          <h3>Den svenska översättningen</h3>
          <p>
            Den svenska ordlistan är baserad på den som finns i{" "}
            <a
              href="http://uu.diva-portal.org/smash/get/diva2:896718/FULLTEXT01.pdf"
              target="blank"
            >
              Den kodade vinnaren - En diskursanalys om könskodning i
              IT-branschens jobbannonser
            </a>{" "}
            (examensarbete skrivet 2016 av Catherine Chamera och Niklas
            Kühnemann).
          </p>
        </>
      ) : null}

      <div className="flex flex-col justify-around space-y-10">
        <CodedWordBox
          words={wordlist.masculineCodedWords}
          header={<Trans>Masculine-coded words</Trans>}
        />

        <CodedWordBox
          words={wordlist.feminineCodedWords}
          header={<Trans>Feminine-coded words</Trans>}
        />
      </div>
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

export default CodedWordsPage;
