import TableCol from "./TableCol";

import { spacingScale } from "style/styleFunctions";

const TableColThread = TableCol.extend`
  flex: 0 1 4em;
  ${props => (props.paddingLeft ? `padding-left: ${spacingScale(2)};` : "")};
  ${props => (props.paddingRight ? `padding-right: ${spacingScale(2)};` : "")};
`;

export default TableColThread;
