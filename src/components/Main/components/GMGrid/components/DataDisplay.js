import styled from "styled-components";
import { PropTypes } from "prop-types";

import { BORDER_RADIUS_BASE, TABLE_BORDER } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const DataDisplay = styled.div`
  border-radius: ${BORDER_RADIUS_BASE};
  height: 100%;
  padding: ${spacingScale(1)};
  margin: ${spacingScale(1)};
  border: 1px solid ${TABLE_BORDER};
  ${props => (props.table ? "text-align: right" : "")};
`;

DataDisplay.propTypes = {
  table: PropTypes.bool
};

export default DataDisplay;
