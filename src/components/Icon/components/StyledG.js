import styled from "styled-components";

const StyledG = styled.g.attrs({
  title: props => props.glyphName,
  fill: "currentColor"
})`
  transform: scale(${props => props.ratio});
`;

export default StyledG;
