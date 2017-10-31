import styled from "styled-components";
import { spacingScale } from "style/styleFunctions";
const BackgroundIcon = styled.img.attrs({
  src: props => props.iconUrl
})`
  opacity: ${props => (props.status === "Stable" ? "0.1" : "0.5")};
  width: ${spacingScale(10)};
  position: absolute;
  top: -5px;
  right: 5px;
  z-index: 0;
  pointer-events: none;
`;

export default BackgroundIcon;
