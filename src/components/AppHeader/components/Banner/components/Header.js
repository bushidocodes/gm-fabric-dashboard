import styled from "styled-components";

import { FONT_SIZE_TITLE, FONT_GROUP_MAIN_TEXT } from "style/styleVariables";

const Header = styled.h1`
  font-size: ${FONT_SIZE_TITLE};
  font-family: ${FONT_GROUP_MAIN_TEXT};
  margin: 0;
  position: relative;
  display: inline-block;
  z-index: 0;
  max-width: 100%;
  overflow: hidden;
  text-transform: capitalize;
  line-height: 1.2;
`;

export default Header;
