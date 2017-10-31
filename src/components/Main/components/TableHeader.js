import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";

import { FONT_WEIGHT_BASE, TABLE_BORDER } from "style/styleVariables";

const TableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  box-shadow: inset 0 -1px ${TABLE_BORDER};
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  overflow: hidden;
  font-weight: ${FONT_WEIGHT_BASE};
`;

export default TableHeader;
