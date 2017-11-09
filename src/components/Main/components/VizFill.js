import styled from "styled-components";
import { PropTypes } from "prop-types";

import { COLOR_SUCCESS, COLOR_DANGER } from "style/styleVariables";

const VizFill = styled.div`
  width: ${props => (props.width ? `${props.width}%` : "0%")};
  color: ${props =>
    props.colorDegree
      ? `${COLOR_SUCCESS.mix(COLOR_DANGER, props.colorDegree / 100)}`
      : "currentColor"};
  min-width: 2px;
  position: absolute;
  background-color: currentColor;
  border-radius: inherit;
  top: 0;
  bottom: 0;
  left: 0;
`;

VizFill.propTypes = {
  colorDegree: PropTypes.number,
  width: PropTypes.number
};

export default VizFill;
