import TableCol from "./TableCol";

import { spacingScale, rowChildSpacing } from "style/styleFunctions";

const TableColDaemon = TableCol.extend`
  flex: 0 1 8em;
  padding-right: ${spacingScale(2)};
  text-align: right;
  ${props => (props.header ? `${rowChildSpacing()}` : "")};
`;

export default TableColDaemon;
