import styled from "styled-components";
import { edgeColor } from "../style/styleFunctions";
import { COLOR_SIDEBAR_BACKGROUND } from "../style/styleVariables";
import mesh from "../images/gm-fabric-bg.jpg";

const SIDEBAR_WIDTH_BASE = "230px";

const Sidebar = styled.nav`
  background-image: url(${mesh});
  background-size: 300% auto;
  background-repeat: no-repeat;
  background-position: bottom -50px center;
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  height: 100vh;
  flex: 1 0 ${SIDEBAR_WIDTH_BASE};
  display: flex;
  flex-direction: column;
  background-color: ${COLOR_SIDEBAR_BACKGROUND.string()};
  position: relative;
  z-index: 2;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-right: 1px solid ${edgeColor(COLOR_SIDEBAR_BACKGROUND)};
  }
`;

export default Sidebar;
