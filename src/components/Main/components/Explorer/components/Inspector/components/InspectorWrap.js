import styled from "styled-components";

import { BORDER_RADIUS_BASE } from "style/styleVariables";

const InspectorWrap = styled.div`
  border-radius: ${BORDER_RADIUS_BASE};
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  left: 0;
  line-height: 1.2;
  position: absolute;
  right: 0;
  top: 0;
`;

export default InspectorWrap;
