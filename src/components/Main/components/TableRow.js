import styled from "styled-components";
import { PropTypes } from "prop-types";

import {
  spacingScale,
  contrastColor,
  rowChildSpacing
} from "style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  TABLE_BORDER,
  TABLE_HOVER
} from "style/styleVariables";

const TableRow = styled.li.attrs({
  tabIndex: 0
})`
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
      : contrastColor(COLOR_CONTENT_BACKGROUND, 0).string()};
  height: ${props => (props.selectable ? "auto" : "default")};

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
