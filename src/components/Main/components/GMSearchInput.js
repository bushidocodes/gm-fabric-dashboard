import styled from "styled-components";

import Magnifier from "images/icons/magnifier.svg";
import { FONT_WEIGHT_REGULAR, FONT_SIZE_BASE } from "style/styleVariables";
import { form_control } from "components/globalPatterns";

const SearchInput = styled.input.attrs({
  type: "search"
})`
  background-image: url(${Magnifier});
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
  text-indent: 20px;
  &::-webkit-search-cancel-button {
    cursor: pointer;
  }
  font-size: ${FONT_SIZE_BASE};
  font-weight: ${FONT_WEIGHT_REGULAR};
  line-height: 1.1;

  ${form_control};
`;

export default SearchInput;
