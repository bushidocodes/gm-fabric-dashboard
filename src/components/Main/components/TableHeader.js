import styled from "styled-components";

import {
  COLOR_CONTENT_BACKGROUND,
  FONT_WEIGHT_SEMIBOLD,
  TABLE_BORDER
} from "style/styleVariables";

const TableHeader = styled.div`
  align-items: center;
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  display: flex;
  flex-wrap: wrap;
  font-weight: ${FONT_WEIGHT_SEMIBOLD};
  overflow: visible;
  width: 100%;
`;

export default TableHeader;
