import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND } from "../../style/styleVariables";
import {
  contrastColor,
  edgeColor,
  spacingScale
} from "../../style/styleFunctions";

const TOOLBAR_BACKGROUND_COLOR = contrastColor(COLOR_CONTENT_BACKGROUND, 0.04)
  .hsl()
  .string();

export const Toolbar = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  flex-direction: row;
  background-color: ${TOOLBAR_BACKGROUND_COLOR};
  box-shadow: inset 0 1px ${edgeColor(TOOLBAR_BACKGROUND_COLOR).string()},
    inset 0 -1px ${edgeColor(TOOLBAR_BACKGROUND_COLOR).string()};
  padding: ${spacingScale(0.25)} ${spacingScale(2)};
`;

export const ToolbarLeft = styled.div`
  flex: 1 1 33%;
  display: flex;
  justify-content: flex-start;
`;

export const ToolbarCenter = styled.div`
  flex: 1 1 33%;
  display: flex;
  justify-content: center;
`;

export const ToolbarRight = styled.div`
  flex: 1 1 33%;
  display: flex;
  justify-content: flex-end;
`;
