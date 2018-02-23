import styled from "styled-components";

import {
  COLOR_WHITE,
  COLOR_HIGHLIGHT,
  FONT_SIZE_BASE,
  BORDER_RADIUS_BASE,
  COLOR_CONTENT_BACKGROUND
} from "style/styleVariables";
import { spacingScale, contrastColor } from "style/styleFunctions";
import { form_control } from "components/globalPatterns";

const InspectorSearch = styled.input`
  appearance: none;
  margin: ${spacingScale(1)};
  border: 1px solid ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.2).string()};
  border-radius: ${BORDER_RADIUS_BASE};
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
