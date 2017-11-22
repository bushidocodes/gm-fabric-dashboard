import styled from "styled-components";

import Magnifier from "images/icons/magnifier.svg";
import { form_control } from "components/globalPatterns";

const SearchInput = styled.input.attrs({
  type: "search"
})`
  position: relative;
  background-image: url(${Magnifier});
  background-repeat: no-repeat;
  background-size: contain;
  text-indent: 20px;
  &::-webkit-search-cancel-button {
    cursor: pointer;
  }
  ${form_control};
`;

export default SearchInput;
