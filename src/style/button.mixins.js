import styled, { css } from "styled-components";
import { spacingScale } from "./styleFunctions";

import {
  BORDER_RADIUS_BASE,
  FONT_SIZE_BASE,
  LINE_HEIGHT_BASE
} from "./styleVariables.js";

// @include function-button-base();
// @include function-button-size();
// @include function-button-style();

const borderWidth = "1px";
const fontWeight = 500;
const lineHeight = LINE_HEIGHT_BASE;

export const GMButtonBase = styled.button`
  box-sizing: border-box;
  user-select: none;
  font-weight: ${fontWeight};
  border-width: ${borderWidth};
  line-height: ${lineHeight};
  border-style: solid;
  text-transform: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > * {
    flex: 0 1 auto;
  }

  .label-suffix,
  .label-prefix {
    opacity: 0.5;
  }

  .label-suffix {
    margin-left: ${spacingScale(1)};
  }
  .label-prefix {
    margin-right: ${spacingScale(1)};
  }
`;

/**
 * CSS-in-JS
 * 
 * @export
 * @param {any} buttonSize 
 * @param {any} [buttonFontSize=FONT_SIZE_BASE] 
 * @param {string} [buttonIconSize="1.5em"] 
 * @param {any} [buttonBorderRadius=BORDER_RADIUS_BASE] 
 * @param {any} [buttonContentSpacing=spacingScale(0.75)] 
 * @returns 
 */
export function buttonSizeMixin(
  buttonSize,
  buttonFontSize = FONT_SIZE_BASE,
  buttonIconSize = "1.5em",
  buttonBorderRadius = BORDER_RADIUS_BASE,
  buttonContentSpacing = spacingScale(0.75)
) {
  switch (buttonSize) {
    case "xs":
      return css`
        font-size: ${Math.ceil(buttonFontSize * 0.5)};
        border-radius: ${buttonBorderRadius};
        padding: ${buttonContentSpacing * 0.25} ${buttonContentSpacing * 1};
        text-transform: uppercase;
      `;
    case "sm":
      return css`
        font-size: ${Math.ceil(buttonFontSize * 0.75)};
        border-radius: ${buttonBorderRadius};
        padding: ${buttonContentSpacing * 0.25} ${buttonContentSpacing * 1};
        text-transform: uppercase;
      `;
    case "lg":
      return css`
        font-size: ${Math.ceil(buttonFontSize * 1.25)};
        border-radius: ${buttonBorderRadius};
        padding: ${buttonContentSpacing * 0.5} ${buttonContentSpacing * 1};
      `;
    case "xl":
      return css`
        font-size: ${Math.ceil(buttonFontSize * 1.75)};
        border-radius: ${buttonBorderRadius * 1.25};
        padding: ${buttonContentSpacing * 0.5} ${buttonContentSpacing * 1};
      `;
    case "normal":
    default:
      return css`
        font-size: ${buttonFontSize};
        border-radius: ${buttonBorderRadius};
        padding: ${buttonContentSpacing * 0.35} ${buttonContentSpacing * 1};
      `;
  }
}
