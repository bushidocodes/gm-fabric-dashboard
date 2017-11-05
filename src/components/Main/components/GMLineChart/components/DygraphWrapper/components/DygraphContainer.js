import styled from "styled-components";

import {
  BORDER_RADIUS_BASE,
  COLOR_CONTENT,
  FONT_STACK_DATA,
  FONT_WEIGHT_BASE
} from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const DygraphContainer = styled.div`
  font-family: ${FONT_STACK_DATA};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: inherit;

  > * {
    background-color: inherit;
  }

  .dygraph-legend {
    text-align: right;
    position: absolute;
    color: ${COLOR_CONTENT.opaquer(0.2)
      .hsl()
      .string()};
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: ${BORDER_RADIUS_BASE};
    display: inline-block;
    z-index: 10000;
    right: 0 !important;
    left: auto !important;
    transition: all 0.2s ease, color 0.2s ease;
    /* color: transparent; */
    padding: ${spacingScale(1)} ${spacingScale(2)} ${spacingScale(1)};
    opacity: 0;
    min-width: 18em;

    /* TODO: Fix this selector */
    & [style*="bold"] {
      font-weight: ${FONT_WEIGHT_BASE} !important;
    }
  }

  &:hover .dygraph-legend {
    opacity: 1;
    color: ${COLOR_CONTENT.opaquer(0.2)
      .hsl()
      .string()};
    transition: all 0.2s ease, color 1s ease;
  }

  .dygraph-label {
    opacity: 0.8;
    color: ${COLOR_CONTENT};
  }
`;

export default DygraphContainer;
