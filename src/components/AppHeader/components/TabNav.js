import { COLOR_ALT_BACKGROUND } from "style/styleVariables";
import styled from "styled-components";
import { contrastColor } from "style/styleFunctions";

const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);

const TabNav = styled.nav`
  display: flex;
  flex-flow: row wrap;
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE).string()};
  background-color: ${COLOR_ALT_BACKGROUND};
  background-image: linear-gradient(
      to bottom,
      rgba(0, 171, 42, 0.35),
      rgba(0, 146, 216, 0.48)
    ),
    linear-gradient(to right, #00ab2a, #e84fc7);
  background-color: #333;
  //
  background-image: none;
  background-color: #000;
  padding: 2px;
  overflow: hidden;
  position: relative;
`;

export default TabNav;
