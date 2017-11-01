import styled from "styled-components";

const ButtonDetails = styled.button`
  background-color: transparent;
  border-color: transparent;
  border-top-color: transparent;
  border-bottom-color: transparent;
  color: white;
  padding: 0;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  > span > svg {
    ${props => (props.open ? "transform: rotate(-90deg);" : "")};
    transition: transform 0.05s ease;
  }
`;

export default ButtonDetails;
