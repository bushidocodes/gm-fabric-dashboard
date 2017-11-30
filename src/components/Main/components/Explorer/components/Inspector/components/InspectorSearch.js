import styled from "styled-components";

import { COLOR_WHITE, COLOR_HIGHLIGHT } from "style/styleVariables";
import { form_control } from "components/globalPatterns";

const InspectorSearch = styled.input`
  ${form_control};

  appearance: none;
  user-select: auto;
  text-align: left;
  box-shadow: inset 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0),
    0 0 0 rgba(0, 0, 0, 0);
  width: 100%;

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
    box-shadow: inset 0 0 0 rgba(255, 255, 255, 0.5),
      0 0 0 1px ${COLOR_HIGHLIGHT.mix(COLOR_WHITE, 0.25).string()},
      0 0 0 4px ${COLOR_HIGHLIGHT.mix(COLOR_WHITE, 0.75).string()};
  }
`;

export default InspectorSearch;
