import TableCol from "./TableCol";

import { spacingScale, rowChildSpacing } from "style/styleFunctions";

const TableColHeader = TableCol.extend`
  ${props => (props.paddingLeft ? `padding-left: ${spacingScale(2)};` : "")};
  ${props => (props.paddingRight ? `padding-right: ${spacingScale(2)};` : "")};
  ${rowChildSpacing()};
`;
export default TableColHeader;
