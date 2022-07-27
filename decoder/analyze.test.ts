// const analyze = require("./analyze");
import { analyze } from "./analyze";

const neutralAd =
  "We are hiring a driven react developer to lead the department. We don't want any nagging. You should be loyal.";

const masculineAd = neutralAd + "Aggressive is great!";

describe("analyze", () => {
  it("the add should be available on the new object", () => {
    const result = analyze(neutralAd, "en");
    expect(result.text).toEqual(neutralAd);
  });

  it("should return the correct language - english", () => {
    const result = analyze(neutralAd, "en");
    expect(result.language).toEqual("en");
  });

  it("should get the masculineCodedWords", () => {
    const result = analyze(neutralAd, "en");
    expect(result.masculineCodedWords).toEqual(["driven", "lead"].sort());
  });

  it("should get the feminineCodedWords", () => {
    const result = analyze(neutralAd, "en");
    expect(result.feminineCodedWords).toEqual(["loyal", "nagging"].sort());
  });

  it("should get all coded words", () => {
    const result = analyze(neutralAd, "en");
    expect(result.masculineCodedWords).toEqual(["driven", "lead"].sort());
    expect(result.feminineCodedWords).toEqual(["loyal", "nagging"].sort());
    expect(result.codedWordCounter).toEqual(4);
  });

  it("should assess the coding", () => {
    const result = analyze(neutralAd, "en");
    expect(result.coding).toEqual("neutral");
  });

  it("should assess the coding of neutral ad", () => {
    const result = analyze(neutralAd, "en");
    expect(result.coding).toEqual("neutral");
  });

  it("should assess the coding of masculine ad", () => {
    const result = analyze(masculineAd, "en");
    expect(result.coding).toEqual("masculine-coded");
  });

  it("should assess the coding of a very masculine ad", () => {
    const result = analyze(
      "Aggressiveness is great! You should be aggressive and lead the team forward. You should be driven and challenge yourself daily.",
      "en"
    );
    expect(result.coding).toEqual("strongly masculine-coded");
  });

  it("should handle hyphens correctly", () => {
    const result = analyze(
      "In this job it's important to be self-reliant and co-operate with others.",
      "en"
    );
    expect(result.masculineCodedWords).toEqual(["self-reliant"]);
    expect(result.feminineCodedWords).toEqual(["co-operate"]);
  });

  describe("swedish language support", () => {
    it("handles a feminine coded ad correctly", () => {
      const result = analyze(
        "Detta är en aggressiv text som inte bara är lojal, snäll och gnällig",
        "sv"
      );

      expect(result.masculineCodedWords).toEqual(["aggressiv"].sort());
      expect(result.feminineCodedWords).toEqual(
        ["snäll", "lojal", "gnällig"].sort()
      );
      expect(result.coding).toEqual("feminine-coded");
    });

    it("handles the word social kompetens correctly", () => {
      const result = analyze(
        "Detta är en aggressiv text som inte bara är lojal, snäll och gnällig. Du ska även ha sociala medier utan social kompetens.",
        "sv"
      );

      expect(result.masculineCodedWords).toEqual(["aggressiv"].sort());
      expect(result.feminineCodedWords).toEqual(
        ["snäll", "lojal", "gnällig", "social kompetens"].sort()
      );
      expect(result.coding).toEqual("feminine-coded");
    });

    it("handles a word like social kompetens correctly even if capitalized", () => {
      const result = analyze(
        "Detta är en aggressiv text som inte bara är lojal, snäll och gnällig. Du ska även ha sociala medier utan Social Kompetens.",
        "sv"
      );

      expect(result.masculineCodedWords).toEqual(["aggressiv"].sort());
      expect(result.feminineCodedWords).toEqual(
        ["snäll", "lojal", "gnällig", "social kompetens"].sort()
      );
      expect(result.coding).toEqual("feminine-coded");
    });
  });
});
