import styled from "styled-components";

const BackgroundIcon = styled.img.attrs({
  src: props => props.iconUrl
})`
  opacity: ${props => (props.status === "Stable" ? "0.1" : "0.5")};
  width: 80px;
  position: absolute;
  top: -5px;
  right: 5px;
`;

export default BackgroundIcon;
