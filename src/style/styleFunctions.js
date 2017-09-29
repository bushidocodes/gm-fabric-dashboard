import Color from "color";

import {
  DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO,
  PADDING_BASE
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
  if (backgroundColor.luminosity() > 0.65) {
    intentColor = intentColor || Color("#000");
    return backgroundColor.mix(intentColor, contrast);
  } else {
    let enhancedContrast = contrast * DARK_ON_LIGHT_CONTRAST_ENHANCEMENT_RATIO;
    intentColor = intentColor || Color("#FFF");
    if (enhancedContrast > 1) {
      enhancedContrast = 1;
    }
    return intentColor.mix(backgroundColor, contrast);
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