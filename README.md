# Gender Decoder - Next.js

Gender Decoder is a simple tool that checks the text of job ads to see if it includes any subtly gender-coded language.

'subtly gender-coded language' refers to language that reflects stereotypes about men and women, like women being more nurturing and men more aggressive. A 2011 research paper showed that subtly masculine-coded language in ads can put women off applying for jobs.

For more info, or to use the tool:
<https://gender-decoder-nextjs.vercel.app/>

## The original project

This project is a port of the original project (written in python) to Next.js + added support for multiple languages.

All of the credit should go to [Kat Matfield](https://github.com/lovedaybrooke) and the [original project](https://github.com/lovedaybrooke/gender-decoder).

The original project hade a MIT license but I decided to change that for this implementation. It's now GNU GPLv3.

## Getting Started

First, install and setup the environment:

```bash
yarn install
yarn prepare  # installs the git commit and push hooks
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding a new language

Start by adding a new locale to the Next.js application updating the `locales` keys in the following files:

- `next.config.js`
- `lingui.config.js`

### Wordlists

The wordlists are located in `src/decoder/wordlist/{locale}.ts` with the `locale` corresponding to the language.

To add a new language simply copy a wordlist and modify it to the new language.

### Translate all of the strings

Run `yarn lang:extract` to extract all of the strings that needs translation. Then simply update the generated files under `src/translations/locales/{locale}/messages.ps`.

Run `yarn lang:compile` to manually compile the language (it will also be done when running `yarn build`)

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
