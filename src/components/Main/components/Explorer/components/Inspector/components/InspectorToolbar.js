import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";
import { edgeColor, spacingScale } from "style/styleFunctions";

const InspectorToolbar = styled.div`
  flex: 0 0 ${spacingScale(7)};
  padding: ${spacingScale(1)};
  display: flex;
  align-items: stretch;
  box-shadow: 0 1px 0 0 ${edgeColor(COLOR_CONTENT_BACKGROUND).string()};
`;

export default InspectorToolbar;
