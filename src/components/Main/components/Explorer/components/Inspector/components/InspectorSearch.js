import styled from "styled-components";

import { FONT_SIZE_BASE } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";
import { form_control } from "components/globalPatterns";

const InspectorSearch = styled.input`
  ${form_control};
  appearance: none;
  margin: 8px;
  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0),
    0 0 0 rgba(0, 0, 0, 0);
  font-size: ${FONT_SIZE_BASE};
  text-align: left;
  user-select: auto;
  width: calc(100% - ${spacingScale(2)});

  &[type="text"],
  &[type="search"] {
    cursor: text;

    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }

  &::placeholder {
    color: currentColor;
    opacity: 1;
    text-align: center;
  }

  &::-ms-expand {
    background-color: transparent;
    border: 0;
  }

  &:focus {
    outline: none;
  }
`;

export default InspectorSearch;
