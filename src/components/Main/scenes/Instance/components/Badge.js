import styled from "styled-components";
import { FONT_SIZE_XS } from "style/styleVariables";

const Badge = styled.span`
  font-size: ${FONT_SIZE_XS};
  font-weight: 500;
  left: -0.5em;
  top: -0.25em;
  text-align: center;
  overflow: visible;
  position: relative;
  letter-spacing: 0.04em;
  display: inline-block;
  transform: rotateZ(-40deg);
`;

export default Badge;
