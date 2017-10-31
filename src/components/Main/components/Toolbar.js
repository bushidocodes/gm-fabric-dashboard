import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";
import { contrastColor, spacingScale } from "style/styleFunctions";

const TOOLBAR_BACKGROUND_COLOR = contrastColor(COLOR_CONTENT_BACKGROUND, 0.04)
  .hsl()
  .string();

const Toolbar = styled.div`
  display: flex;
  height: ${spacingScale(4.5)};
  align-items: center;
  flex-direction: row;
  background-color: ${TOOLBAR_BACKGROUND_COLOR};
  padding: ${spacingScale(0.25)} ${spacingScale(2)};
`;

export default Toolbar;
