import Select from "react-select";
import styled from "styled-components";

import {
  ZINDEX_DROPDOWN,
  FONT_WEIGHT_SEMIBOLD,
  FONT_SIZE_BASE
} from "style/styleVariables";

import { spacingScale } from "style/styleFunctions";

// Import the Styles needed by React-Select
import "react-select/dist/react-select.css";

const ControlHeight = spacingScale(3.5);

const GMSelect = styled(Select)`
  flex-grow: 1;
  font-size: ${FONT_SIZE_BASE};
  font-weight: ${FONT_WEIGHT_SEMIBOLD};
  height: ${ControlHeight};
  position: relative;
  max-width: 10em;
  z-index: ${ZINDEX_DROPDOWN};

  .Select-control {
    height: ${ControlHeight} !important;

    .Select-placeholder {
      line-height: ${ControlHeight};
    }

    .Select-value {
      line-height: ${ControlHeight} !important;

      .Select-value-label {
        line-height: ${ControlHeight};
      }
    }

    .Select-input {
      height: ${ControlHeight};
    }
  }
  & + & {
    margin-left: ${spacingScale(1)};
  }
`;

export default GMSelect;
