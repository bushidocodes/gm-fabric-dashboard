import { COLOR_ALT_BACKGROUND } from "style/styleVariables";
import styled from "styled-components";
import { contrastColor } from "style/styleFunctions";

const COLOR_TAB_BACKGROUND_BASE = contrastColor(COLOR_ALT_BACKGROUND, 0.175);

const TabNav = styled.nav`
  display: flex;
  flex-flow: row wrap;
  color: ${contrastColor(COLOR_TAB_BACKGROUND_BASE).string()};
  background-color: ${COLOR_TAB_BACKGROUND_BASE};
  padding: 2px;
  overflow: hidden;
  position: relative;
`;

export default TabNav;
