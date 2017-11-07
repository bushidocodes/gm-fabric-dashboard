import {
  decodeParameter,
  encodeParameter,
  INSTANCE_ID_LENGTH,
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
  xtest("clears an interval with ID equal to window.refreshFabricIntervalID");
  xtest("sets window.refreshFabricIntervalID to null");
});

describe("convertMS", () => {});
describe("relativeReqPercent", () => {});
describe("calculateErrorPercent", () => {});
describe("formatAsDecimalString", () => {});

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
