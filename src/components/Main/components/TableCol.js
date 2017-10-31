import styled from "styled-components";

import {
  rowChildSpacing,
  spacingScale,
  errorColor
} from "style/styleFunctions";

// text-align aligns to left unless specified otherwise.  pass 'right' or 'center'
const TableCol = styled.div`
  flex: ${props => (props.sm ? "1 1 5%" : props.lg ? "1 1 30%" : "1 1 15%")};
  min-height: ${spacingScale(4.5)};
  ${props => (props.header ? `${rowChildSpacing()}` : "")};
  ${props => (props.vizBar ? `position:relative` : "")};
  ${props =>
    props.errorPercent ? `color: ${errorColor(props.errorPercent)}` : ""};
  text-align: ${props => (props.textAlign ? props.textAlign : `left`)};
`;

export default TableCol;
