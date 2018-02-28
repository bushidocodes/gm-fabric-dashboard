import styled from "styled-components";
import { PropTypes } from "prop-types";

import { BORDER_RADIUS_BASE } from "style/styleVariables";

const DataDisplay = styled.div`
  border-radius: ${BORDER_RADIUS_BASE};
  height: 100%;
  ${props => (props.table ? "text-align: right" : "")};
`;

DataDisplay.propTypes = {
  table: PropTypes.bool
};

export default DataDisplay;
