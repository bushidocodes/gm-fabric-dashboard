import styled from "styled-components";
import { COLOR_WHITE } from "style/styleVariables";

const LanguageSelectorWrap = styled.div`
  color: ${COLOR_WHITE.toString()};
  position: relative;
  cursor: pointer;
  user-select: none;

  > :first-child {
    ${props => (props.visible ? `opacity: 1;` : `opacity: 0.8;`)};
    :hover {
      opacity: 1;
    }
  }
`;

export default LanguageSelectorWrap;
