import styled from "styled-components";

import { spacingScale, errorColor } from "style/styleFunctions";

const TableCol = styled.div`
  flex: 1 1 15%;
  min-height: ${spacingScale(4.5)};
  text-align: left;
  ${props =>
    props.errorPercent ? `color: ${errorColor(props.errorPercent)}` : ""};
`;

export default TableCol;
