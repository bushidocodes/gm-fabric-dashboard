import {
  FONT_SIZE_H2,
  FONT_STACK_BASE,
  FONT_SIZE_BASE,
  FONT_WEIGHT_BASE,
  COLOR_BRAND_PRIMARY,
  COLOR_WHITE
} from "style/styleVariables";
import { contrastColor } from "style/styleFunctions";

// Necessary classNames for 3rd party slider
const InputRange = `
  .input-range__label.input-range__label--value {
    font-family: ${FONT_STACK_BASE};
    text-align: center;
    font-weight: ${FONT_WEIGHT_BASE} + 100;
    color: ${COLOR_BRAND_PRIMARY.toString()};
    font-size: ${FONT_SIZE_H2};
    line-height: 0;
    margin-left: -50%;
    will-change: transform;
    transform: translateX(-50%) translateY(4px);

    .input-range__label-container {
      position: static;
    }
  }

  .label {
    font-size: ${FONT_SIZE_BASE};
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
    left: 0px;
  }

  .input-range__slider-container {
    transition: left 0;
    will-change: transform;
  }

  .input-range__slider {
    transition: transform 0.3s ease;
    background: ${COLOR_BRAND_PRIMARY.toString()};
    border: none;
    border-radius: 0;

    &:hover,
    &:focus,
    &:active {
      transform: scale(1.1);
    }
  }

  .input-range__slider:before {
    color: ${COLOR_BRAND_PRIMARY.toString()};
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid ${COLOR_BRAND_PRIMARY.toString()};
    top: 100%;
    content: "";
    position: absolute;
  }

  .input-range__track {
    border-radius: 20px;
    background-color: ${contrastColor(COLOR_WHITE, 0.1)};
  }
`;

export default InputRange;
