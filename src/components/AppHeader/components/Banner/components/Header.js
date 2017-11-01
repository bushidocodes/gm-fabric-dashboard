import styled from "styled-components";
import {
  FONT_SIZE_HERO,
  COLOR_ALT_BACKGROUND
} from "../../../../../style/styleVariables";

const Header = styled.h1`
  font-size: ${FONT_SIZE_HERO};
  margin: 0;
  position: relative;
  display: inline-block;
  z-index: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-transform: capitalize;
  &:after {
    content: "";
    background-color: ${COLOR_ALT_BACKGROUND.fade(0.5).string()};
    position: absolute;
    left: 0.25em;
    right: 0.25em;
    bottom: 0.25em;
    top: 0.25em;
    z-index: -1;
    filter: blur(10px);
  }
`;

export default Header;
