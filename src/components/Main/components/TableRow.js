import styled from "styled-components";
import { PropTypes } from "prop-types";

import {
  spacingScale,
  contrastColor,
  rowChildSpacing
} from "style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  TABLE_HOVER,
  TABLE_BORDER
} from "style/styleVariables";

const TableRow = styled.li.attrs({
  tabIndex: 0
})`
  align-items: center;
  background-color: ${props =>
    props.open
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0.04).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 0).string()};
  box-shadow: inset 0 -1px ${TABLE_BORDER};
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  height: ${props => (props.selectable ? "auto" : "default")};
  min-height: ${spacingScale(4.5)};
  width: 100%;

  &:hover {
    background-color: ${TABLE_HOVER};
  }

  &:focus {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus:active:hover {
    outline: 0;
  }

  > * {
    ${rowChildSpacing()};
  }
`;

TableRow.propTypes = {
  open: PropTypes.bool
};

export default TableRow;
