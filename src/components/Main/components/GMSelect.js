import Select from "react-select";
import styled from "styled-components";
// Import the Styles needed by React-Select
import "react-select/dist/react-select.css";

const GMSelect = styled(Select)`
  flex-grow: 1;
  max-width: 125px;
  height: 28px;
  font-weight: 600;
  font-size: 14px;
  font-family: "Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
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
