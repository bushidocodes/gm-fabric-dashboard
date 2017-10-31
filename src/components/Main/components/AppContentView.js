import styled from "styled-components";
import { edgeColor } from "style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";

const AppContentView = styled.div`
  flex: 1 1 100%;
  overflow-y: scroll;
  overflow-scrolling: touch;
  position: relative;
  z-index: 1;
  padding-top: 1px;
  outline: none;
  &:before,
  &:after {
    content: "";
    background-color: ${COLOR_CONTENT_BACKGROUND};
    pointer-events: none;
    height: 1px;
    position: absolute;
    top: -134px;
    height: 135px;
    bottom: auto;
    left: 0;
    right: 0;
    z-index: 1001;
  }

  &:after {
    position: fixed;
    background-color: ${edgeColor(COLOR_CONTENT_BACKGROUND, 0.3).fade(0.7)});
    z-index: 1000;
    height: 1px;
    top: 34px; 
  }
`;

export default AppContentView;
