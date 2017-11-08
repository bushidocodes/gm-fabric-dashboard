import styled from "styled-components";
import { PropTypes } from "prop-types";

import { contrastColor } from "style/styleFunctions";

const VizFill = styled.div`
  width: ${props => (props.width ? `${props.width}%` : "0%")};
  position: absolute;
  background-color: ${props =>
    props.width
      ? `${contrastColor("red", props.width / 100, "blue")}`
      : "currentColor"};
  border-radius: 0 1px 0 0;
  height: 2px;
  left: 0;
  bottom: 0;
`;

VizFill.propTypes = {
  width: PropTypes.number
};

export default VizFill;
