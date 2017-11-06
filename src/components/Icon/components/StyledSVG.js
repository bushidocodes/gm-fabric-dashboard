import styled from "styled-components";

const VIEWBOXSIZE = 24;

const StyledSVG = styled.svg.attrs({
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  viewBox: "0 0 24 24"
})`
  z-index: 1;
  height: ${props => props.iconRatio * VIEWBOXSIZE}px;
  width: ${props => props.iconRatio * VIEWBOXSIZE}px;
  color: ${props => props.glyphColor};
  word-spacing: 0;

  &:not(:root) {
    overflow: visible;
  }
`;

export default StyledSVG;
