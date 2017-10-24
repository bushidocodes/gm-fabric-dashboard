import styled from "styled-components";
import { spacingScale } from "../../../../../style/styleFunctions";
import {
  COLOR_ALT_CONTENT,
  PADDING_BASE
} from "../../../../../style/styleVariables";

const SIDEBAR_TEXT = COLOR_ALT_CONTENT.string();

const SummaryBarCardBody = styled.div`
  padding: 0 0;
  margin-top: -${spacingScale(0.25)};
  color: ${SIDEBAR_TEXT}};
  transition: all 0.15s ease;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  ${props => (props.open ? "max-height: 100vh; opacity: 1;" : "")};
  > *:last-child {
    margin-bottom: ${PADDING_BASE};
  }
`;

export default SummaryBarCardBody;
