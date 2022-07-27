import { useEffect, useRef } from "react";
import type { AppProps } from "next/app";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { initTranslation } from "translations/utils";
import { useRouter } from "next/router";
import "../styles/globals.css";
import Layout from "@/components/Layout";

initTranslation(i18n);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale || router.defaultLocale;
  const firstRender = useRef(true);

  if (pageProps.translation && firstRender.current && locale) {
    //load the translations for the locale
    i18n.load(locale, pageProps.translation);
    i18n.activate(locale);
    // render only once
    firstRender.current = false;
  }

  useEffect(() => {
    if (pageProps.translation && locale) {
      i18n.load(locale, pageProps.translation);
      i18n.activate(locale);
    }
  }, [locale, pageProps.translation]);

  return (
    <I18nProvider i18n={i18n}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </I18nProvider>
  );
}

export default MyApp;
