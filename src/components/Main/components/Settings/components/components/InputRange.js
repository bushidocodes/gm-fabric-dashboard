import {
  FONT_SIZE_H2,
  FONT_STACK_BASE,
  FONT_SIZE_BASE,
  FONT_WEIGHT_REGULAR,
  COLOR_BRAND_PRIMARY,
  COLOR_WHITE
} from "style/styleVariables";
import { contrastColor } from "style/styleFunctions";

// Necessary classNames for 3rd party slider
const InputRange = `
  .input-range__label.input-range__label--value {
    color: ${COLOR_BRAND_PRIMARY.toString()};
    font-family: ${FONT_STACK_BASE};
    font-size: ${FONT_SIZE_H2};
    font-weight: ${FONT_WEIGHT_REGULAR};
    line-height: 0;
    margin-left: -50%;
    transform: translateX(-50%) translateY(4px);
    text-align: center;
    will-change: transform;

    .input-range__label-container {
      position: static;
    }
  }

  .label {
    bottom: 10px;
    font-size: ${FONT_SIZE_BASE};
    left: 0px;
    position: absolute;
    text-align: center;
    width: 100%;
  }

  .input-range__slider-container {
    transition: left 0;
    will-change: transform;
  }

  .input-range__slider {
    background: ${COLOR_BRAND_PRIMARY.toString()};
    border: none;
    border-radius: 0;
    transition: transform 0.3s ease;

    &:hover,
    &:focus,
    &:active {
      transform: scale(1.1);
    }
  }

  .input-range__slider:before {
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${COLOR_BRAND_PRIMARY.toString()};
    color: ${COLOR_BRAND_PRIMARY.toString()};
    content: "";
    height: 0;
    position: absolute;
    top: 100%;
    width: 0;
  }

  .input-range__track {
    background-color: ${contrastColor(COLOR_WHITE, 0.1)};
    border-radius: 20px;
  }
`;

export default InputRange;
