import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const VizBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: ${spacingScale(2)};
  height: 4px;
  content: "";
  border-bottom: 1px solid;
`;

export default VizBar;
