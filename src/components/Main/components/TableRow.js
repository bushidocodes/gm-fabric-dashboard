import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale, rowChildSpacing } from "style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  BORDER_RADIUS_BASE,
  TABLE_BORDER
} from "style/styleVariables";

const TableRow = styled.li.attrs({
  tabIndex: 0
})`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  min-height: ${spacingScale(4.5)};
  flex: 0 0 100%;
  cursor: ${props => (props.selectable ? `pointer` : `default`)};
  transition: all 0.2s ease;
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  margin: ${spacingScale(1)} 0 0;
  border-radius: ${BORDER_RADIUS_BASE};
  box-shadow: 0 0 0 1px ${TABLE_BORDER};

  &:focus {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus:active:hover {
    outline: 0;
  }

  > * {
    ${rowChildSpacing()};
    ${props => (props.overflowVisible ? `overflow: visible;` : "")};
  }
`;

TableRow.propTypes = {
  open: PropTypes.bool,
  overflowVisible: PropTypes.bool // used for overriding rowChildSpacing in order to render a tooltip
};

export default TableRow;
