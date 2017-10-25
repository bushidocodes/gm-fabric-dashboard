import styled from "styled-components";
import {
  FONT_SIZE_BASE,
  FONT_STACK_DATA
} from "../../../../../../../../../../../../../style/styleVariables";

const Title = styled.div`
  text-align: left;
  font-size: ${FONT_SIZE_BASE};
  font-family: ${FONT_STACK_DATA};
  font-weight: ${props => props.cardFontWeight};
`;

export default Title;
