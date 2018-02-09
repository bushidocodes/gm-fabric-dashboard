import { renderWithIntl } from "utils/i18nTesting";
import React from "react";
import LanguageSelector from "./LanguageSelector";

describe("LanguageSelector", () => {
  test("matches snapshot", () => {
    expect(renderWithIntl(<LanguageSelector />)).toMatchSnapshot();
  });
});
