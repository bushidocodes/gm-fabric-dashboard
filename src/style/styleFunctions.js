import Color from "color";

import {
  DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO,
  PADDING_BASE,
  COLOR_SUCCESS,
  COLOR_DANGER,
  COLOR_WARNING
} from "./styleVariables";

/**
 * Utility to generate a readable content color from the background color of an element
 *
 * @param {Object|string} backgroundColor - a Color libary object or a string containing a color hex
 * @param {number} contrast - a number between 0 and 1
 * @param {Object|string} intentColor  - an optional Color libary object or a string containing a color hex
 * Defaults to black or white depending on the luminosity of backgroundColor
 * @returns {Object} - A color library object
 */
export function contrastColor(backgroundColor, contrast, intentColor) {
  if (typeof backgroundColor === "string") {
    backgroundColor = Color(backgroundColor);
  }
  if (typeof intentColor === "string") {
    intentColor = Color(intentColor);
  }
  // luminosity() => 0 is black, 1 is white.
  // if luminosity of color is closer to light, and intentColor is null, set the intentColor to black.  if luminosity is closer to dark, and intentColor is null, set the intentColor to white.
  if (backgroundColor.luminosity() > 0.65) {
    intentColor = intentColor || Color("#000"); //black
    return backgroundColor.mix(intentColor, contrast);
  } else {
    let enhancedContrast = contrast * DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO; // DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO = 2
    intentColor = intentColor || Color("#FFF"); //white
    if (enhancedContrast > 1) {
      // enhancedContrast = 1
      enhancedContrast = 1;
    }
    return backgroundColor.mix(intentColor, contrast);
  }
}

/**
 * Scales a string of a certain number of pixels according to a given factor
 *
 * @export
 * @param {number} factor
 * @returns {string} A string in the format "10px"
 */
export function spacingScale(factor) {
  return `${Math.round(parseInt(PADDING_BASE, 10) * factor)}px`;
}

/**
 * Utility to generate a rsubtle keyline color for element separators
 *
 * @param {Object|string} backgroundColor - a Color libary object or a string containing a color hex
 * @param {number} contrast - a number between 0 and 1
 * @returns {Object} - A color library object
 */
export function edgeColor(backgroundColor, contrast = 0.08) {
  if (typeof backgroundColor === "string") {
    backgroundColor = Color(backgroundColor);
  }
  // If the element is very dark, use a light edge color
  if (backgroundColor.luminosity() < 0.1) {
    let enhancedContrast = contrast * DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO;
    if (enhancedContrast > 1) {
      enhancedContrast = 1;
    }
    return backgroundColor.lighten(enhancedContrast);
  } else {
    // Otherwise, use a natural dark edge color
    return backgroundColor.darken(contrast);
  }
}

/**
 * Takes string representation of the status of a microservice and returns corresponding color
 * @param {string} state
 * @returns {Object} // a Color object
 */
export function mapStatusToColor(status = "") {
  switch (status.toLowerCase()) {
    case "warning":
      return COLOR_WARNING; // color orange-tan
    case "stable":
      return COLOR_SUCCESS;
    case "down":
    default:
      return COLOR_DANGER;
  }
}

/**
 * Takes no params and returns styling for table rows
 * @param {none}
 * @returns {string}
 */
export function rowChildSpacing() {
  return `
    padding-right: ${spacingScale(2)};
    padding-top: ${spacingScale(0.888)};
    padding-bottom: ${spacingScale(0.888)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:first-child {
      padding-left: ${spacingScale(2)};
  }`;
}

/**
 * function errorColor
 * takes errorPercent as number(0.1% passed in as .1 not .001) and returns string color (green | yellow | red = default).]
 * < 0.1% error rate is green, > 0.1% and < 1% is yellow, and >1% is red
 *
 * @param {number|string} errorPercent
 * @returns {string} - color for the errorPercent text
 */

// TO DO: enhance color function that returns a range of color based on error percent and background color

export function errorColor(errorPercent = 1) {
  const percent =
    typeof errorPercent === "number" ? errorPercent : parseFloat(errorPercent);
  if (percent < 0.1) return "darkgreen";
  else if (percent > 0.1 && percent < 1) return "#666600";
  else return "darkred";
}
