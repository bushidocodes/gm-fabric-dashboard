import styled from "styled-components";
import {
  contrastColor,
  spacingScale
} from "../../../../../style/styleFunctions";
import { COLOR_ALT_BACKGROUND } from "../../../../../style/styleVariables";

const Footer = styled.footer`
  text-align: center;
  color: ${contrastColor(COLOR_ALT_BACKGROUND).string()};
  position: relative;
  flex: 0 0 auto;
  margin-top: ${spacingScale(1)};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;

  > * {
    flex: 0 0 auto;
  }
`;

export default Footer;
