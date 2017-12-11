import styled from "styled-components";
import PropTypes from "prop-types";

import { contrastColor, spacingScale } from "style/styleFunctions";

import {
  FONT_STACK_BASE,
  COLOR_BRAND_PRIMARY,
  COLOR_DANGER,
  COLOR_INFO,
  COLOR_WARNING,
  COLOR_CONTENT_BACKGROUND,
  COLOR_WHITE
} from "style/styleVariables";

const buttonTypeColors = {
  default: "none",
  danger: COLOR_DANGER.rgb(),
  info: COLOR_INFO.rgb(),
  warning: COLOR_WARNING.rgb(),
  primary: COLOR_BRAND_PRIMARY.rgb(),
  polling: COLOR_CONTENT_BACKGROUND.rgb()
};

const camelCaseConverter = stringInput => {
  if (stringInput) {
    return stringInput.replace(/-([a-z])/g, function(g) {
      return g[1].toUpperCase();
    });
  }
};

const functionButtonOrientation = (alignment, spacingBase) => {
  const targetAlignment = alignment || "horizontal"; // horizontal, vertical // default: horizontal;
  const targetSpacingBase = spacingBase || 0.5; // default: spacing-scale(0.5)

  if (targetAlignment === "horizontal") {
    return `
      flex-direction: row;
      > :not(:first-child) {
        margin-left: ${spacingScale(targetSpacingBase)}px;
        flex-basis: auto;
      }
    `;
  } else if (targetAlignment === "vertical") {
    return `
      padding-top: ${spacingScale(targetSpacingBase)}px;
      flex-direction: column;
      > :not(:first-child) {
        margin-top: ${targetSpacingBase / 2}px;
      }
    `;
  }
};

const functionButtonIconRatio = size => {
  const sizeRatios = {
    xs: 0.5,
    sm: 0.75,
    normal: 1,
    lg: 1.25,
    xl: 1.5
  };
  const viewboxSize = 24; // default viewbox size 24px
  const ratio = sizeRatios[size] || 1; // default ratio 1
  const viewboxDimensions = viewboxSize * ratio;
  return `
    > svg {
      width: ${viewboxDimensions + "px"};
      height: ${viewboxDimensions + "px"};
    }
  `;
};

const functionButtonSize = size => {
  let sizeOptions = {
    size: "normal",
    fontSizeBase: "14",
    iconRatio: 1,
    borderRadiusBase: "3",
    contentSpacingBase: spacingScale(0.5)
  };

  let sizeOutputs = {
    fontSize: "",
    borderRadius: "",
    padding: "",
    textTransform: ""
  };

  switch (size) {
    case "normal": {
      sizeOutputs["fontSize"] = sizeOptions.fontSizeBase + "px;";
      sizeOutputs["borderRadius"] = sizeOptions.borderRadiusBase + "px;";
      sizeOutputs["padding"] =
        sizeOptions.contentSpacingBase * 0.35 +
        "px " +
        sizeOptions.contentSpacingBase * 1 +
        "px;";
      break;
    }
    case "xs": {
      sizeOutputs["fontSize"] =
        Math.ceil(sizeOptions.fontSizeBase * 0.5) + "px;";
      sizeOutputs["borderRadius"] = sizeOptions.borderRadiusBase + "px;";
      sizeOutputs["padding"] =
        sizeOptions.contentSpacingBase * 0.25 +
        "px " +
        sizeOptions.contentSpacingBase * 1 +
        "px;";
      sizeOutputs["textTransform"] = "uppercase";
      break;
    }
    case "sm": {
      sizeOutputs["fontSize"] =
        Math.ceil(sizeOptions.fontSizeBase * 0.75) + "px;";
      sizeOutputs["borderRadius"] = sizeOptions.borderRadiusBase + "px;";
      sizeOutputs["padding"] =
        sizeOptions.contentSpacingBase * 0.25 +
        "px " +
        sizeOptions.contentSpacingBase * 1 +
        "px;";
      sizeOutputs["textTransform"] = "uppercase;";
      break;
    }
    case "lg": {
      sizeOutputs["fontSize"] =
        Math.ceil(sizeOptions.fontSizeBase * 1.25) + "px;";
      sizeOutputs["borderRadius"] = sizeOptions.borderRadiusBase + "px;";
      sizeOutputs["padding"] =
        sizeOptions.contentSpacingBase * 0.5 +
        "px " +
        sizeOptions.contentSpacingBase * 1 +
        "px;";
      break;
    }
    case "xl": {
      sizeOutputs["fontSize"] =
        Math.ceil(sizeOptions.fontSizeBase * 1.5) + "px;";
      sizeOutputs["borderRadius"] = sizeOptions.borderRadiusBase + "px;";
      sizeOutputs["padding"] =
        sizeOptions.contentSpacingBase * 0.5 +
        "px " +
        sizeOptions.contentSpacingBase * 1 +
        "px;";
      break;
    }
    default: {
      sizeOutputs["fontSize"] = sizeOptions.fontSizeBase + "px;";
      sizeOutputs["borderRadius"] = sizeOptions.borderRadiusBase + "px;";
      sizeOutputs["padding"] =
        sizeOptions.contentSpacingBase * 0.35 +
        "px " +
        sizeOptions.contentSpacingBase * 1 +
        "px;";
      break;
    }
  }

  return `
    font-size: ${sizeOutputs["fontSize"]};
    border-radius: ${sizeOutputs["borderRadius"]};
    padding: ${sizeOutputs["padding"]};
    text-transform: ${sizeOutputs["textTransform"]};
  `;
};

const functionButtonStyle = styleOptionsInputs => {
  // default style options that feed all theme generation further down
  let styleOptions = {
    buttonBackgroundColorBase: COLOR_WHITE,
    buttonBorderColorBase: COLOR_WHITE,
    buttonLabelColorBase: contrastColor(COLOR_WHITE, 100),
    buttonOutlineStyleDepth: 0.06, // 0-100% // default: 6%,
    buttonReactionStyle: "darken", // darken, lighten // default: darken
    buttonReactionDegree: 0.06, // 0-100% // default: 6%
    buttonHoverReactionDegree: 0.06 * 0.25,
    buttonActiveReactionDegree: 0.06 * 2,
    buttonDownReactionDegree: 0.06,
    buttonActiveMixBaseColor: COLOR_BRAND_PRIMARY,
    buttonActiveMixBaseLabelColor: contrastColor(COLOR_BRAND_PRIMARY, 100),
    buttonActiveMixDegree: 1 //default 100%
  };

  // overwrite default styleOptions from input, to get ready for theme generation
  const styleOptionsInputsKeys = Object.keys(styleOptionsInputs);
  for (let i = 0, len = styleOptionsInputsKeys.length; i < len; i++) {
    // buttonOutlineStyle options will be overwritten later, since outlineStyles will be generated
    // based on this styleOptions and than need to be included in the output object that will populate css styles
    if (styleOptionsInputsKeys[i] !== "buttonOutlineStyle") {
      styleOptions[styleOptionsInputsKeys[i]] =
        styleOptionsInputs[styleOptionsInputsKeys[i]];
    }
  }

  // default style Types (static, hover, down, active, activeDown)
  // this object feeds all the css at the bottom of the function
  // in this object we unite defaults with inputs
  let styleTypes = {
    staticStyles: {
      backgroundColor: styleOptions.buttonBackgroundColorBase,
      color: styleOptions.buttonLabelColorBase,
      borderColor: styleOptions.buttonBorderColorBase
    },
    hoverStyles: {},
    downStyles: {},
    activeStyles: {},
    activeDownStyles: {}
  };

  // Helper Functions
  // Darken the color, but add a touch of saturation for a more natural shadow look
  const darkerColor = (color, percent) => {
    if (color.saturationl() > 10) {
      // If the element has any substantial color to it, then you can mess with the saturation
      return color
        .darken(percent)
        .saturate(percent)
        .rgb();
      // return saturate(darken(color, percent), percent);
    } else {
      // Otherwise, don't add color where there wasn't any to start with
      return color.darken(percent).rgb();
      // return darken(color, percent);
    }
  };

  // Darken the color, but wash out the color a bit, for a more natural highlighted look
  const lighterColor = (color, percent) => {
    if (color.saturationl() > 10) {
      return color
        .lighten(percent)
        .desaturate(percent)
        .rgb();
    } else {
      // Otherwise, don't add color where there wasn't any to start with
      return color.lighten(percent).rgb();
    }
  };

  const mixWithActive = color => {
    return color.mix(
      styleOptions.buttonActiveMixBaseColor,
      styleOptions.buttonActiveMixDegree
    );
  };

  const mixWithActiveLabel = color => {
    return color.mix(
      styleOptions.buttonActiveMixBaseLabelColor,
      styleOptions.buttonActiveMixDegree
    );
  };

  // Create style for each property, in each state, under each processed condition
  if (styleOptions.buttonReactionStyle === "darken") {
    // Hover Styles
    styleTypes.hoverStyles["backgroundColor"] = darkerColor(
      styleOptions.buttonBackgroundColorBase,
      styleOptions.buttonHoverReactionDegree
    );
    styleTypes.hoverStyles["color"] = darkerColor(
      styleOptions.buttonLabelColorBase,
      styleOptions.buttonHoverReactionDegree
    );
    styleTypes.hoverStyles["borderColor"] = darkerColor(
      styleOptions.buttonBorderColorBase,
      styleOptions.buttonHoverReactionDegree
    );
    // Down Styles
    styleTypes.downStyles["backgroundColor"] = darkerColor(
      styleOptions.buttonBackgroundColorBase,
      styleOptions.buttonHoverReactionDegree +
        styleOptions.buttonDownReactionDegree
    );
    styleTypes.downStyles["color"] = darkerColor(
      styleOptions.buttonLabelColorBase,
      styleOptions.buttonHoverReactionDegree +
        styleOptions.buttonDownReactionDegree
    );
    styleTypes.downStyles["borderColor"] = darkerColor(
      styleOptions.buttonBorderColorBase,
      styleOptions.buttonHoverReactionDegree +
        styleOptions.buttonDownReactionDegree
    );
    // Active Styles
    styleTypes.activeStyles["backgroundColor"] = mixWithActive(
      darkerColor(
        styleOptions.buttonBackgroundColorBase,
        styleOptions.buttonActiveReactionDegree
      )
    );
    styleTypes.activeStyles["color"] = mixWithActiveLabel(
      darkerColor(
        styleOptions.buttonLabelColorBase,
        styleOptions.buttonActiveReactionDegree
      )
    );
    styleTypes.activeStyles["borderColor"] = darkerColor(
      mixWithActive(styleOptions.buttonBorderColorBase),
      styleOptions.buttonActiveReactionDegree +
        styleOptions.buttonDownReactionDegree
    );
    // Active Down Styles
    styleTypes.activeDownStyles["backgroundColor"] = mixWithActive(
      darkerColor(
        styleOptions.buttonBackgroundColorBase,
        styleOptions.buttonActiveReactionDegree +
          styleOptions.buttonDownReactionDegree
      )
    );
    styleTypes.activeDownStyles["color"] = mixWithActiveLabel(
      darkerColor(
        styleOptions.buttonLabelColorBase,
        styleOptions.buttonActiveReactionDegree +
          styleOptions.buttonDownReactionDegree
      )
    );
    styleTypes.activeDownStyles["borderColor"] = mixWithActive(
      darkerColor(
        styleOptions.buttonBorderColorBase,
        styleOptions.buttonActiveReactionDegree +
          styleOptions.buttonDownReactionDegree
      )
    );
  } else {
    // Assume button reaction style == lighten
    // Hover Styles
    styleTypes.hoverStyles["backgroundColor"] = lighterColor(
      styleOptions.buttonBackgroundColorBase,
      styleOptions.buttonHoverReactionDegree
    );
    styleTypes.hoverStyles["color"] = lighterColor(
      styleOptions.buttonLabelColorBase,
      styleOptions.buttonHoverReactionDegree
    );
    styleTypes.hoverStyles["borderColor"] = lighterColor(
      styleOptions.buttonBorderColorBase,
      styleOptions.buttonHoverReactionDegree
    );
    // Down Styles
    styleTypes.downStyles["backgroundColor"] = lighterColor(
      styleOptions.buttonBackgroundColorBase,
      styleOptions.buttonHoverReactionDegree +
        styleOptions.buttonDownReactionDegree
    );
    styleTypes.downStyles["color"] = lighterColor(
      styleOptions.buttonLabelColorBase,
      styleOptions.buttonHoverReactionDegree +
        styleOptions.buttonDownReactionDegree
    );
    styleTypes.downStyles["borderColor"] = lighterColor(
      styleOptions.buttonBorderColorBase,
      styleOptions.buttonHoverReactionDegree +
        styleOptions.buttonDownReactionDegree
    );
    // Active Styles
    styleTypes.activeStyles["backgroundColor"] = mixWithActive(
      lighterColor(
        styleOptions.buttonBackgroundColorBase,
        styleOptions.buttonActiveReactionDegree
      )
    );
    styleTypes.activeStyles["color"] = mixWithActiveLabel(
      lighterColor(
        styleOptions.buttonLabelColorBase,
        styleOptions.buttonActiveReactionDegree
      )
    );
    styleTypes.activeStyles["borderColor"] = mixWithActive(
      lighterColor(
        styleOptions.buttonBorderColorBase,
        styleOptions.buttonActiveReactionDegree
      )
    );
    // Active Down Styles
    styleTypes.activeDownStyles["backgroundColor"] = mixWithActive(
      lighterColor(
        styleOptions.buttonBackgroundColorBase,
        styleOptions.buttonActiveReactionDegree +
          styleOptions.buttonDownReactionDegree
      )
    );
    styleTypes.activeDownStyles["color"] = mixWithActiveLabel(
      lighterColor(
        styleOptions.buttonLabelColorBase,
        styleOptions.buttonActiveReactionDegree +
          styleOptions.buttonDownReactionDegree
      )
    );
    styleTypes.activeDownStyles["borderColor"] = mixWithActive(
      lighterColor(
        styleOptions.buttonBorderColorBase,
        styleOptions.buttonActiveReactionDegree +
          styleOptions.buttonDownReactionDegree
      )
    );
  }

  // Generation of outline styles based on styleOptions and styleTypes objects
  const buttonOutlineStyles = {
    raisedOutline: {
      staticStyles: {
        borderColor: darkerColor(
          styleTypes.staticStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderTopColor: lighterColor(
          styleTypes.staticStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 0.5
        ),
        borderBottomColor: darkerColor(
          styleTypes.staticStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 3
        )
      },
      hoverStyles: {
        borderColor: darkerColor(
          styleTypes.hoverStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderTopColor: lighterColor(
          styleTypes.hoverStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 0.5
        ),
        borderBottomColor: darkerColor(
          styleTypes.hoverStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 3
        )
      },
      downStyles: {
        borderColor: darkerColor(
          styleTypes.downStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderTopColor: lighterColor(
          styleTypes.downStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 0.5
        ),
        borderBottomColor: darkerColor(
          styleTypes.downStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 3
        )
      },
      activeStyles: {
        borderColor: darkerColor(
          styleTypes.activeStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderTopColor: lighterColor(
          styleTypes.activeStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 0.5
        ),
        borderBottomColor: darkerColor(
          styleTypes.activeStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 3
        )
      },
      activeDownStyles: {
        borderColor: darkerColor(
          styleTypes.activeDownStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderTopColor: lighterColor(
          styleTypes.activeDownStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 0.5
        ),
        borderBottomColor: darkerColor(
          styleTypes.activeDownStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth * 3
        )
      }
    },
    shadow: {
      staticStyles: {
        borderBottomColor: darkerColor(
          styleTypes.staticStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      hoverStyles: {
        borderBottomColor: darkerColor(
          styleTypes.hoverStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      downStyles: {
        borderBottomColor: darkerColor(
          styleTypes.downStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      activeStyles: {
        borderBottomColor: darkerColor(
          styleTypes.activeStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      activeDownStyles: {
        borderBottomColor: darkerColor(
          styleTypes.activeDownStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      }
    },
    raised: {
      staticStyles: {
        borderTopColor: lighterColor(
          styleTypes.staticStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderBottomColor: darkerColor(
          styleTypes.staticStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      hoverStyles: {
        borderTopColor: lighterColor(
          styleTypes.hoverStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderBottomColor: darkerColor(
          styleTypes.hoverStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      downStyles: {
        borderTopColor: lighterColor(
          styleTypes.downStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderBottomColor: darkerColor(
          styleTypes.downStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      activeStyles: {
        borderTopColor: lighterColor(
          styleTypes.activeStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderBottomColor: darkerColor(
          styleTypes.activeStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      activeDownStyles: {
        borderTopColor: lighterColor(
          styleTypes.activeDownStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        ),
        borderBottomColor: darkerColor(
          styleTypes.activeDownStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      }
    },
    outline: {
      staticStyles: {
        borderColor: darkerColor(
          styleTypes.staticStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      hoverStyles: {
        borderColor: darkerColor(
          styleTypes.hoverStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      downStyles: {
        borderColor: darkerColor(
          styleTypes.downStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      activeStyles: {
        borderColor: darkerColor(
          styleTypes.activeStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      },
      activeDownStyles: {
        borderColor: darkerColor(
          styleTypes.activeDownStyles.borderColor,
          styleOptions.buttonOutlineStyleDepth
        )
      }
    },
    none: {
      staticStyles: {
        borderColor: styleTypes.staticStyles.backgroundColor
      },
      activeStyles: {
        borderColor: styleTypes.activeStyles.backgroundColor
      }
    }
  };

  // Check if outline was provided, otherwise default to raisedOutline
  const outlineType =
    styleOptionsInputs["buttonOutlineStyle"] || "raisedOutline";
  // Distribute generated outline styles based on the input
  // by overwriting default generated outline styles
  const outlineOptionsTypes = buttonOutlineStyles[outlineType];
  const outlineOptionTypesKeys = Object.keys(outlineOptionsTypes);
  // Loop through generated buttonOutlineStyles that correspond to the input outline Style (raised, raisedOutline, none, shadow, etc.)
  for (let x = 0, len = outlineOptionTypesKeys.length; x < len; x++) {
    // Then look into each Type (static, active, activeDown) within
    // styleTypes object (which is the output that feeds the css styles at the bottom)
    // and either supplement or overwrite existing properties
    // based on the information that is within generated outline styles
    let outlineOptionKeys = Object.keys(
      outlineOptionsTypes[outlineOptionTypesKeys[x]]
    );
    for (let y = 0, len = outlineOptionKeys.length; y < len; y++) {
      styleTypes[outlineOptionTypesKeys[x]][outlineOptionKeys[y]] =
        outlineOptionsTypes[outlineOptionTypesKeys[x]][outlineOptionKeys[y]];
    }
  }

  return `
  ${
    styleOptions.buttonActiveStatus === true
      ? `
        background-color: ${styleTypes.activeStyles["backgroundColor"]};
        border-color: ${styleTypes.activeStyles["borderColor"]};
        border-top-color: ${styleTypes.activeStyles["borderTopColor"]};
        border-bottom-color: ${styleTypes.activeStyles["borderBottomColor"]};
        color: ${styleTypes.activeStyles["color"]};

        &:active {
          background-color: ${styleTypes.activeDownStyles["backgroundColor"]};
          border-color: ${styleTypes.activeDownStyles["borderColor"]};
          border-top-color: ${styleTypes.activeDownStyles["borderTopColor"]};
          border-bottom-color: ${
            styleTypes.activeDownStyles["borderBottomColor"]
          };
          color: ${styleTypes.activeDownStyles["color"]};
        }

        &:hover {
          background-color: ${styleTypes.activeStyles["backgroundColor"]};
          border-color: ${styleTypes.activeStyles["borderColor"]};
          border-top-color: ${styleTypes.activeStyles["borderTopColor"]};
          border-bottom-color: ${styleTypes.activeStyles["borderBottomColor"]};
          color: ${styleTypes.activeStyles["color"]};
        } 
      `
      : `
        background-color: ${styleTypes.staticStyles["backgroundColor"]};
        border-color: ${styleTypes.staticStyles["borderColor"]};
        border-top-color: ${styleTypes.staticStyles["borderTopColor"]};
        border-bottom-color: ${styleTypes.staticStyles["borderBottomColor"]};
        color: ${styleTypes.staticStyles["color"]};
        
        &:active {
          transition-duration: 0s;
          background-color: ${styleTypes.downStyles["backgroundColor"]};
          border-color: ${styleTypes.downStyles["borderColor"]};
          border-top-color: ${styleTypes.downStyles["borderTopColor"]};
          border-bottom-color: ${styleTypes.downStyles["borderBottomColor"]};
          color: ${styleTypes.downStyles["color"]};
        }

        &:hover {
          background-color: ${styleTypes.hoverStyles["backgroundColor"]};
          border-color: ${styleTypes.hoverStyles["borderColor"]};
          border-top-color: ${styleTypes.hoverStyles["borderTopColor"]};
          border-bottom-color: ${styleTypes.hoverStyles["borderBottomColor"]};
          color: ${styleTypes.hoverStyles["color"]};
        }
      `
  }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #0aab2a;
      z-index: 1;
    }

    &[disabled],
    &[disabled]:hover,
    &[disabled]:focus,
    &[disabled]:active {
      cursor: default;
      opacity: 0.8;
      background-color: ${darkerColor(
        styleOptions.buttonBackgroundColorBase.desaturate(1),
        styleOptions.buttonReactionDegree
      )};
      border-color: ${darkerColor(
        styleOptions.buttonBorderColorBase.desaturate(1),
        styleOptions.buttonReactionDegree
      )};
      color: ${darkerColor(
        styleOptions.buttonLabelColorBase.desaturate(1),
        styleOptions.buttonReactionDegree
      )};
    }
  `;
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

  &:not([disabled]) {
    &:focus {
      outline: none;
      box-shadow: inset 0 0 0 rgba(255, 255, 255, 0.5),
        0 0 0 1px transparentize(${COLOR_BRAND_PRIMARY.toString()}, 0.25),
        0 0 0 4px transparentize(${COLOR_BRAND_PRIMARY.toString()}, 0.75);
    }
  }

  > * {
    flex: 0 1 auto;
  }

  ${// Styles
  props =>
    props.type
      ? // has color (also code in props.outline and props.active)
        `
        ${functionButtonStyle({
          buttonOutlineStyle: camelCaseConverter(props.outline),
          buttonBackgroundColorBase: buttonTypeColors[props.type],
          buttonBorderColorBase: buttonTypeColors[props.type],
          buttonLabelColorBase: contrastColor(
            buttonTypeColors[props.type],
            100
          ),
          buttonActiveStatus: props.active
        })}  
      `
      : // no color
        ` 
        ${functionButtonStyle({
          buttonOutlineStyle: camelCaseConverter(props.outline),
          buttonActiveStatus: props.active
        })}
      `};

  ${// Sizes
  props =>
    props.size
      ? `${functionButtonSize(props.size)}` // has size
      : `${functionButtonSize()}`} ${// Icons // no size
    props =>
      props.iconSize
        ? `${functionButtonIconRatio(props.iconSize)}` // has iconSize
        : `${functionButtonIconRatio()}`} ${// Orientation // no iconSize
    props =>
      props.orientation
        ? `${functionButtonOrientation(props.orientation)}` // has orientation
        : `${functionButtonOrientation()}`}; // no orientation default horizontal
`;

// might have to add 'open' prop to satisfy condition in the functionButtonStyles.
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
  type: PropTypes.string
};

export default ButtonWrap;
