import styled from "styled-components";

import { contrastColor, spacingScale } from "style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND, TABLE_BORDER } from "style/styleVariables";

const TableBody = styled.ol`
  display: block;
  list-style: none;
  margin: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 ${spacingScale(1)} ${spacingScale(1)};
`;

export default TableBody;
