import styled from "styled-components";

const StyledG = styled.g.attrs({
  title: props => props.glyphName
})`
  transform: ${props => props.transform};
`;

export default StyledG;
