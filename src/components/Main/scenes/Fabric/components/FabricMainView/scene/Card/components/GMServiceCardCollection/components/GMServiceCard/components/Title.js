import styled from "styled-components";
import {
  FONT_SIZE_BASE,
  FONT_STACK_DATA
} from "../../../../../../../../../../../../../style/styleVariables";

const Title = styled.div`
  text-align: left;
  font-size: ${FONT_SIZE_BASE};
  font-family: ${FONT_STACK_DATA};
  line-height: 1.25;
  overflow: hidden;
  font-weight: ${props => props.cardFontWeight};
  position: relative;
  z-index: 2;
`;

export default Title;
