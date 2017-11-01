import styled from "styled-components";

import {
  FONT_SIZE_SM,
  FONT_STACK_DATA
} from "../../../../../style/styleVariables";

const ReadoutItemTitle = styled.h2`
  font-size: ${FONT_SIZE_SM};
  font-family: ${FONT_STACK_DATA};
  margin: 0;
  padding: 0;
  font-weight: 500;
  min-height: 1em;
`;

export default ReadoutItemTitle;
