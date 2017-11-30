import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const InspectorData = styled.ul`
  flex: 1 1 100%;
  width: 100%;
  overflow-scroll: touch;
  margin: 0 auto;
  overflow-y: scroll;
  word-break: break-all;
  padding: 0 ${spacingScale(1)};
`;

export default InspectorData;
