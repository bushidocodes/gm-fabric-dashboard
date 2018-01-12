import Select from "react-select";
import styled from "styled-components";

import { ZINDEX_DROPDOWN } from "style/styleVariables";

// Import the Styles needed by React-Select
import "react-select/dist/react-select.css";

const GMSelect = styled(Select)`
  font-family: "NunitoSans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  flex-grow: 1;
  font-size: 14px;
  font-weight: 600;
  height: 28px;
  max-width: 125px;
  position: relative;
  width: 100%;
  z-index: ${ZINDEX_DROPDOWN};

  .Select-control {
    height: 28px !important;

    .Select-placeholder {
      line-height: 28px;
    }

    .Select-value {
      line-height: 28px !important;

      .Select-value-label {
        line-height: 28px;
      }
    }

    .Select-input {
      height: 28px;
    }
  }
`;

export default GMSelect;
