import React from "react";
import { Trans } from "@lingui/macro";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="mt-10 flex-none h-auto md:h-20 space-y-2 md:space-y-0  bg-slate-50 p-4 md:flex flex-col md:flex-row md:items-center text-slate-400 md:justify-between">
      <Trans id="footer">
        <span>
          The source code for this project can be found{" "}
          <a
            className="underline"
            href="https://github.com/cfarvidson/gender-decoder"
          >
            here
          </a>{" "}
          and it is a remake of{" "}
          <a
            className="underline"
            href="https://github.com/lovedaybrooke/gender-decoder"
          >
            this
          </a>{" "}
          project
        </span>
        <span className="block ">
          License:{" "}
          <a
            className="underline"
            href="https://choosealicense.com/licenses/gpl-3.0/"
          >
            GNU GPLv3
          </a>
        </span>
      </Trans>
    </div>
  );
};

export default Footer;
