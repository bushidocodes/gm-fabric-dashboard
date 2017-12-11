import styled from "styled-components";

import {
  COLOR_CONTENT_BACKGROUND,
  FONT_WEIGHT_BASE,
  TABLE_BORDER
} from "style/styleVariables";

const TableHeader = styled.div`
  align-items: flex-start;
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  box-shadow: inset 0 -1px ${TABLE_BORDER};
  display: flex;
  flex-wrap: wrap;
  font-weight: ${FONT_WEIGHT_BASE};
  overflow: hidden;
  width: 100%;
`;

export default TableHeader;
