import styled from "styled-components";

import {
  spacingScale,
  contrastColor,
  rowChildSpacing
} from "../../../style/styleFunctions";

import {
  COLOR_CONTENT_BACKGROUND,
  TABLE_BORDER,
  TABLE_HOVER
} from "../../../style/styleVariables";

const TableRow = styled.li`
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-shadow: inset 0 -1px ${TABLE_BORDER};
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  flex-wrap: wrap;
  cursor: pointer;
  min-height: ${spacingScale(4.5)};
  background-color: ${props =>
    props.open
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0.04).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 0.02).string()};
      height: ${props => (props.open ? "auto" : "default")}
  &:hover {
    background-color: ${TABLE_HOVER};
  }
  > * {
    ${rowChildSpacing()};
  }
`;

export default TableRow;
