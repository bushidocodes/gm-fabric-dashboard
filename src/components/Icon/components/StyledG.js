import styled from "styled-components";

const StyledG = styled.g.attrs({
  fill: "currentColor"
})`
  transform: scale(${props => props.ratio});
`;

export default StyledG;
