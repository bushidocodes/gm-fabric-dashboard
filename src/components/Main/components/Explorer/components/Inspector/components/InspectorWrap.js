import styled from "styled-components";

import { FONT_STACK_DATA, BORDER_RADIUS_BASE } from "style/styleVariables";

const InspectorWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-family: ${FONT_STACK_DATA};
  line-height: 1.2;
  height: 100%;
  border-radius: ${BORDER_RADIUS_BASE};
  display: flex;
  flex-direction: column;
`;

export default InspectorWrap;
