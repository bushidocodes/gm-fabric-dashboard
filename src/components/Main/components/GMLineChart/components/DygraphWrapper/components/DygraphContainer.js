import styled from "styled-components";

import {
  BORDER_RADIUS_BASE,
  COLOR_CONTENT,
  FONT_WEIGHT_SEMIBOLD
} from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const DygraphContainer = styled.div`
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
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: ${BORDER_RADIUS_BASE};
    color: ${COLOR_CONTENT.opaquer(0.2)
      .hsl()
      .string()};
    display: inline-block;
    left: auto !important;
    right: 0;
    min-width: 18em;
    padding: ${spacingScale(1)} ${spacingScale(2)} ${spacingScale(1)};
    position: absolute;
    opacity: 1;
    text-align: right;
    transition: all 0.2s ease, color 0.2s ease;
    z-index: 10000;

    /* TODO: Fix this selector */
    & [style*="bold"] {
      font-weight: ${FONT_WEIGHT_SEMIBOLD} !important;
    }
  }

  .dygraph-label {
    color: ${COLOR_CONTENT};
    opacity: 0.8;
  }
`;

export default DygraphContainer;
