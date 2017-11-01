import styled from "styled-components";

import { COLOR_GREEN, COLOR_WHITE } from "../../../../../style/styleVariables";

const SkipNav = styled.button`
  background-color: ${COLOR_GREEN.string()};
  color: ${COLOR_WHITE.string()};
  position: absolute;
  font-size: 14px;
  text-transform: uppercase;
  border: none;
  padding: 0.6em;
  transition: top 0.5s ease;
  top: -10em;
  left: 0;
  &:focus {
    top: 0;
  }
`;

export default SkipNav;
