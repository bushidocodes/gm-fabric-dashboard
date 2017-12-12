import styled from "styled-components";
import PropTypes from "prop-types";

import { contrastColor } from "style/styleFunctions";
import generateButtonIconRatio from "./utils/generateButtonIconRatio";
import generateButtonOrientation from "./utils/generateButtonOrientation";
import generateButtonSize from "./utils/generateButtonSize";
import generateButtonStyle from "./utils/generateButtonStyle";

import {
  FONT_STACK_BASE,
  COLOR_BRAND_PRIMARY,
  COLOR_DANGER,
  COLOR_INFO,
  COLOR_WARNING,
  COLOR_CONTENT_BACKGROUND
} from "style/styleVariables";

// Maps button types to a particular color
function generateButtonTypeColor(type) {
  switch (type) {
    case "danger":
      return COLOR_DANGER.rgb();
    case "info":
      return COLOR_INFO.rgb();
    case "warning":
      return COLOR_WARNING.rgb();
    case "polling":
      return COLOR_CONTENT_BACKGROUND.rgb();
    default:
    case "primary":
      return COLOR_BRAND_PRIMARY.rgb();
  }
}

const camelCaseConverter = stringInput => {
  if (stringInput) {
    return stringInput.replace(/-([a-z])/g, function(g) {
      return g[1].toUpperCase();
    });
  }
};

// The start of the CSS style output
const ButtonWrap = styled.button`
  box-sizing: border-box;
  user-select: none;
  font-family: ${FONT_STACK_BASE};
  font-weight: 600;
  border-width: 1px;
  line-height: 1.4;
  border-style: solid;
  text-transform: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transition: all 0.1s ease;
  }

  &:focus,
  &:active {
    transition: all 0 ease;
  }

  > * {
    flex: 0 1 auto;
  }

  ${// Styles
  props =>
    props.type
      ? // has color (also code in props.outline and props.active)
        generateButtonStyle({
          buttonOutlineStyle: camelCaseConverter(props.outline),
          buttonBackgroundColorBase: generateButtonTypeColor(props.type),
          buttonBorderColorBase: generateButtonTypeColor(props.type),
          buttonLabelColorBase: contrastColor(
            generateButtonTypeColor(props.type),
            100
          ),
          buttonActiveStatus: props.active
        })
      : // no color
        generateButtonStyle({
          buttonOutlineStyle: camelCaseConverter(props.outline),
          buttonActiveStatus: props.active
        })};

  ${// Sizes
  props =>
    props.size
      ? `${generateButtonSize(props.size)}` // has size
      : `${generateButtonSize()}`} ${// Icons // no size
    props =>
      props.iconSize
        ? `${generateButtonIconRatio(props.iconSize)}` // has iconSize
        : `${generateButtonIconRatio()}`} ${// Orientation // no iconSize
    props =>
      props.orientation
        ? `${generateButtonOrientation(props.orientation)}` // has orientation
        : `${generateButtonOrientation()}`}; // no orientation default horizontal
`;

// might have to add 'open' prop to satisfy condition in the generateButtonStyles.
ButtonWrap.propTypes = {
  active: PropTypes.bool,
  orientation: PropTypes.string,
  outline: PropTypes.oneOf([
    "raised", // Add highlight effect to top edge and shadow effect to bottom edge
    "outline", // Add outline effect
    "outline-shadow", // Add outline effect, and add shadow effect to bottom edge
    "shadow", // Add shadow effect to bottom edge
    "none", // No effects
    "raised-outline"
  ]),
  size: PropTypes.string,
  type: PropTypes.oneOf(["danger", "info", "warning", "primary", "polling"])
};

export default ButtonWrap;
