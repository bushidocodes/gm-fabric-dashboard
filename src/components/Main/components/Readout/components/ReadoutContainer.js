import styled from "styled-components";

import {
  COLOR_CONTENT_BACKGROUND,
  BORDER_RADIUS_BASE,
  FONT_STACK_BASE
} from "style/styleVariables";
import { contrastColor, spacingScale } from "style/styleFunctions";

const ReadoutContainer = styled.div`
  border-radius: ${BORDER_RADIUS_BASE};
  flex: 1 1 300px;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin: ${props => (props.primary ? 0 : spacingScale(0.5))};
  background-color: ${props =>
    props.primary
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0.8).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 0.1).string()};
  color: ${props =>
    props.primary
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 1).string()};
  font-family: ${FONT_STACK_BASE};

  @media all and (max-width: 1000px) {
    flex: 0 0 100%;
    order: ${props => (props.primary ? 0 : 1)};
`;

export default ReadoutContainer;
