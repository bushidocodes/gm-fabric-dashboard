import {
  INSTANCE_ID_LENGTH,
  calculateErrorPercent,
  clearFabricIntervalIfNeeded,
  convertMS,
  decodeParameter,
  encodeParameter,
  formatAsDecimalString,
  relativeReqPercent,
  trimID
} from "./index";

describe("trimID", () => {
  test("returns an empty string if not provided an ID", () => {
    expect(trimID()).toEqual("");
  });
  test("returns the rightmost possible substring", () => {
    expect(trimID("Decipher", 3)).toEqual("her");
  });
  test("uses INSTNACE_ID_LENGTH when desired length is not provided", () => {
    expect(trimID("Decipher Tech Studios")).toEqual(
      trimID("Decipher Tech Studios", INSTANCE_ID_LENGTH)
    );
  });
  test("returns the entire ID when desired length is longer than the length of the actual ID", () => {
    expect(trimID("Decipher", 20)).toEqual("Decipher");
  });
});

describe("clearFabricIntervalIfNeeded", () => {
  test("Initialize window.refreshFabricIntervalID as 10 for test ", () => {
    window.refreshFabricIntervalID = setInterval(
      () => console.log("interval set"),
      3000
    );
    expect(window.refreshFabricIntervalID).toBe(10);
  });
  test("clears an interval with ID equal to window.refreshFabricIntervalID", () => {
    clearFabricIntervalIfNeeded();
    expect(window.refreshFabricIntervalID).toBe(null);
  });
});

describe("convertMS", () => {
  test("takes milliseconds and returns an array of time units in [00d, 00h, 00m, 00s] format", () => {
    expect(convertMS(1510172807556)).toEqual(["17478d", "20h", "26m", "47s"]);
    expect(convertMS(72807556)).toEqual(["20h", "13m", "27s"]);
    expect(convertMS(0)).toEqual(["00s"]);
  });
  test("returns undefined when invalid prop is passed", () => {
    expect(convertMS("not a number")).toEqual(undefined);
    expect(convertMS("")).toEqual(undefined);
  });
  // uncomment after implementing a fix in convertMS function
  xtest('works on string number such as "0.477112"', () => {
    expect(convertMS("342342451")).toEqual(["03d", "23h", "05m", "42s"]);
  });
});
describe("relativeReqPercent", () => {
  const testArray = [
    { name: "Fries", requests: 4000 },
    { name: "Taco", requests: 200 },
    { name: "Salad", requests: 100 }
  ];
  const key = "requests";

  test("Takes an array of objects and key and returns a new field relativeReqPercent added to each object", () => {
    expect(relativeReqPercent(testArray, key)).toEqual([
      { name: "Fries", relativeReqPercent: 100, requests: 4000 },
      { name: "Taco", relativeReqPercent: 5, requests: 200 },
      { name: "Salad", relativeReqPercent: 2.5, requests: 100 }
    ]);
  });
  test("returns original array if no key is passed", () => {
    expect(relativeReqPercent(testArray)).toEqual(testArray);
  });

  // uncomment after implementing a fix in relativeReqPercent function
  xtest("returns original array if there is no corresponding key", () => {
    expect(relativeReqPercent(testArray, "not a valid key")).toEqual(testArray);
  });
});
describe("calculateErrorPercent", () => {
  test("returns a string representation of error percentage with three decimal places without % sign ", () => {
    expect(calculateErrorPercent(23425, 4134)).toEqual("17.648");
  });
  test("returns 0.000 if request is zero", () => {
    expect(calculateErrorPercent(0, 4134)).toEqual("0.000");
  });
  test("returns 0.000 if error is zero", () => {
    expect(calculateErrorPercent(54435, 0)).toEqual("0.000");
  });
});
describe("formatAsDecimalString", () => {
  test("returns a number string with three decimal places", () => {
    expect(formatAsDecimalString(0.4254134)).toEqual("0.425");
    expect(formatAsDecimalString(0.8)).toEqual("0.800");
  });
  // uncomment after implementing a fix in formatAsDecimalString function
  xtest('works on number string such as "0.477112" ', () => {
    expect(formatAsDecimalString("0.477112")).toEqual("0.477");
  });
});

describe("encodeParameter", () => {
  test("returns a string with spaces replaced with middle dots", () => {
    expect(encodeParameter("Decipher Tech Studios")).toEqual(
      "Decipher·Tech·Studios"
    );
  });
});

describe("decodeParameter", () => {
  test("returns a string with middle dots replaced with spaces", () => {
    expect(decodeParameter("Decipher·Tech·Studios")).toEqual(
      "Decipher Tech Studios"
    );
  });
});
