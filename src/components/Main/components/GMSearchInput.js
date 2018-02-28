import styled from "styled-components";

import Magnifier from "images/icons/magnifier.svg";
import {
  COLOR_CONTENT_BACKGROUND,
  FONT_WEIGHT_REGULAR,
  FONT_SIZE_BASE,
  BORDER_RADIUS_BASE
} from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const SearchInput = styled.input.attrs({
  type: "search"
})`
  background-image: url(${Magnifier});
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  text-indent: 20px;
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: ${BORDER_RADIUS_BASE};
  text-align: left;
  background-color: ${COLOR_CONTENT_BACKGROUND};
  font-size: ${FONT_SIZE_BASE};
  font-weight: ${FONT_WEIGHT_REGULAR};
  line-height: 1.1;
  width: 22em;
  flex: 1 1 22em;
  padding: ${spacingScale(0.75)} ${spacingScale(1)};

  &::-webkit-search-cancel-button {
    cursor: pointer;
  }

  &::placeholder {
    color: inherit;
    opacity: 1;
  }
`;

export default SearchInput;
