import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale, errorColor } from "style/styleFunctions";

const TableCol = styled.div`
  flex: 1 1 12%;
  min-height: ${spacingScale(4.5)};
  text-align: left;
  ${props =>
    props.errorPercent ? `color: ${errorColor(props.errorPercent)}` : ""};
`;

TableCol.propTypes = {
  errorPercent: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TableCol;
