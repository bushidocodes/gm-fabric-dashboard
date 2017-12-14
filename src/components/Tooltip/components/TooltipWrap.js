import styled from "styled-components";
import {
  COLOR_HIGHLIGHT,
  COLOR_WHITE,
  ZINDEX_TOOLTIP
} from "style/styleVariables";

const TooltipWrap = styled.div`
  border-bottom: 1px dotted ${COLOR_HIGHLIGHT.mix(COLOR_WHITE, 0.3).string()};
  cursor: help;
  display: inline-block;
  position: relative;

  :hover > :last-child {
    opacity: 0.8;
    visibility: visible;
    z-index: ${ZINDEX_TOOLTIP};
  }
`;

export default TooltipWrap;
