import styled from "styled-components";
import Color from "color";

import { COLOR_CONTENT_BACKGROUND, TABLE_BORDER } from "style/styleVariables";
import { contrastColor, spacingScale } from "style/styleFunctions";

const Toolbar = styled.div`
  align-items: center;
  border-bottom: 1px solid ${TABLE_BORDER};
  justify-content: center;
  display: flex;
  flex-direction: row;
  height: ${spacingScale(5)};
  width: 100%;
  padding: ${spacingScale(0.25)} ${spacingScale(2)};
  margin: ${spacingScale(2)} 0 ${spacingScale(1)};
`;

export default Toolbar;
