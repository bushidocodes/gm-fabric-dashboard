import styled from "styled-components";
import {
  COLOR_ALT_CONTENT,
  FONT_WEIGHT_BASE,
  FONT_SIZE_BASE
} from "../../../../../style/styleVariables";

const SIDEBAR_TEXT = COLOR_ALT_CONTENT.string();

export const SummaryBarCardHeading = styled.h1`
  font-size: ${FONT_SIZE_BASE};
  font-weight: ${FONT_WEIGHT_BASE + 100};
  margin: 0.2em 0 0;
  flex: 1 1 100%;
  align-self: stretch;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
  color: ${SIDEBAR_TEXT};
`;

export default SummaryBarCardHeading;
