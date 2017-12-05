import styled from "styled-components";

import { FONT_STACK_DATA, CONTENT_MAX_WIDTH } from "style/styleVariables";

const TableDisplay = styled.div`
  width: 100%;
  font-family: ${FONT_STACK_DATA};
  display: block;
  max-width: ${CONTENT_MAX_WIDTH};
  margin-left: auto;
  margin-right: auto;
`;

export default TableDisplay;
