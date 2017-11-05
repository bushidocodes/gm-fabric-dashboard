import styled from "styled-components";

import { FONT_SIZE_SM, COLOR_WHITE, COLOR_GREEN } from "style/styleVariables";

const SkipNav = styled.button.attrs({
  onKeyDown: props => evt => {
    if (evt.keyCode === 13 || evt.keyCode === 32) {
      document.getElementById(props.skipToId).focus();
    }
  }
})`
  position: absolute;
  text-transform: uppercase;
  border: none;
  padding: 0.6em;
  transition: top 0.5s ease;
  top: -10em;
  left: 0;
  background-color: ${COLOR_GREEN.string()};
  color: ${COLOR_WHITE.string()};
  font-size: ${FONT_SIZE_SM};

  &:focus {
    top: 0;
  }
`;

export default SkipNav;
