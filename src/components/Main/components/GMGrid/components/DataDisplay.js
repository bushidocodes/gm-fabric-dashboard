import styled from "styled-components";
import { PropTypes } from "prop-types";

import { FONT_SIZE_BASE, BORDER_RADIUS_BASE } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const DataDisplay = styled.div`
  border-radius: ${BORDER_RADIUS_BASE};
  font-size: ${FONT_SIZE_BASE}; // LG
  height: 100%;
  padding: ${spacingScale(1)};
  padding-top: ${spacingScale(6)};
  ${props => (props.table ? "text-align: right" : "")};
`;

DataDisplay.propTypes = {
  table: PropTypes.bool
};

export default DataDisplay;
