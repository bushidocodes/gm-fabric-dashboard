import TableCol from "./TableCol";
import PropTypes from "prop-types";

const TableColThread = TableCol.extend`
  flex: 0 1 5em;
  ${props =>
    props.right
      ? `text-align: right; justify-content: flex-end; flex: 0 1 7em;`
      : `text-align: center; justify-content: center;`}:
`;

TableColThread.propTypes = {
  right: PropTypes.string
};

export default TableColThread;
