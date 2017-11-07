import { floatRound } from "./dygraphs";

xdescribe("getDygraphOfValue", () => {
  xtest("TODO", () => {});
});
xdescribe("mapDygraphKeysToNetChange", () => {});

describe("floatRound", () => {
  test("rounds a number to the number of decimal places specified", () => {
    expect(floatRound(Math.PI, 2)).toEqual(3.14);
  });
});
