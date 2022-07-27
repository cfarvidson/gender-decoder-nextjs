import React from "react";

type CodedWordBoxProps = {
  words: string[];
  header: React.ReactElement;
};

const CodedWordBox: React.FC<CodedWordBoxProps> = ({ words, header }) => {
  return (
    <div className="pb-10 bg-white ring-1 ring-slate-800/10 px-10 py-5 shadow-2xl rounded-2xl not-prose">
      <h3 className="font-bold text-3xl mb-4">{header}</h3>
      <ul className="flex flex-wrap list-none first:space-x-0">
        {words.map((word, i) => (
          <li className="bg-green-200 px-2 py-1 rounded-lg mr-2 mt-2" key={i}>
            {word.toLowerCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodedWordBox;
