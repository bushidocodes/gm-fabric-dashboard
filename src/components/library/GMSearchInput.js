import styled from "styled-components";
import Magnifier from "../../images/icons/magnifier.svg";

const SearchInput = styled.input.attrs({
  type: "search"
})`
  position: relative;
  background-image: url(${Magnifier});
  background-repeat: no-repeat;
  text-indent: 20px;
`;

export default SearchInput;
