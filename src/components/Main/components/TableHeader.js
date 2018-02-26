import styled from "styled-components";
import { spacingScale } from "style/styleFunctions";

import {
  COLOR_CONTENT_BACKGROUND,
  FONT_WEIGHT_SEMIBOLD
} from "style/styleVariables";

const TableHeader = styled.div`
  align-items: center;
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  display: flex;
  flex-wrap: wrap;
  font-weight: ${FONT_WEIGHT_SEMIBOLD};
  overflow: visible;
  width: 100%;
  padding-left: ${spacingScale(1)};
  padding-right: ${spacingScale(1)};
`;

export default TableHeader;
