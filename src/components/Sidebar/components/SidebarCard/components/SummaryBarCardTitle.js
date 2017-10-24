import styled from "styled-components";
import { spacingScale } from "../../../../../style/styleFunctions";
import {
  COLOR_SIDEBAR_BACKGROUND,
  COLOR_SIDEBAR_CONTENT,
  COLOR_WHITE
} from "../../../../../style/styleVariables";

const SIDEBAR_TEXT = COLOR_SIDEBAR_CONTENT.string();
const SIDEBAR_BORDER = COLOR_SIDEBAR_BACKGROUND.mix(COLOR_WHITE, 0.1).string();

const SummaryBarCardTitle = styled.div`
  color: ${SIDEBAR_TEXT};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: ${spacingScale(1)} ${spacingScale(0.5)};
  border-top: 1px solid ${SIDEBAR_BORDER};
  position: relative;
  > * {
    flex: 0 0 ${spacingScale(3)};
  }
`;

export default SummaryBarCardTitle;
