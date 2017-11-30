import styled from "styled-components";

import {
  COLOR_CONTENT_BACKGROUND,
  CONTENT_MAX_WIDTH
} from "style/styleVariables";
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
  max-width: ${CONTENT_MAX_WIDTH};
  margin-left: auto;
  margin-right: auto;

  @media all and (min-width: ${CONTENT_MAX_WIDTH}) {
    &:after {
      content: "";
      pointer-events: none;
      height: inherit;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      background-color: inherit;
      z-index: 1;
    }

    > * {
      position: relative;
      z-index: 2;
    }
  }
`;

export default Toolbar;
