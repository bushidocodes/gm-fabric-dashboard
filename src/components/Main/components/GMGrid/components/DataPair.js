import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale } from "style/styleFunctions";

const DataPair = styled.div`
  display: flex;
  flex-direction: row;
  margin: ${spacingScale(1)};
  position: relative;
  ${props => (props.priority === "primary" ? dataPairPrimary() : "")};
`;

DataPair.propTypes = {
  priority: PropTypes.oneOf(["primary", "secondary", "normal"])
};

const dataPairPrimary = () => {
  return `
    overflow: hidden;
    font-weight: 600;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 4em;
      right: 4em;
    }
`;
};

export default DataPair;
