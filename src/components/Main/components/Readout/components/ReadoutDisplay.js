import styled from "styled-components";
import { PropTypes } from "prop-types";

import { BORDER_RADIUS_BASE } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

// TO-DO: remove cacheCard props passed to readout- styled-components after implementing reusable card component
// for "cacheCard", overrule flex-basis of 100%
const ReadoutDisplay = styled.div`
  color: #333;
  display: flex;
  flex: 1 1 300px;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  border-radius: ${BORDER_RADIUS_BASE};
  margin: 0 ${spacingScale(1)} ${spacingScale(1)} 0;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    opacity: 0.2;
    background-color: ${props => props.color.string()};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom: 3px solid ${props => props.color.string()};
  }

  @media all and (max-width: 1000px) {
    flex-basis: 100%;
    order: ${props => (props.primary ? 0 : 1)};
  }

  &:first-child:last-child {
    flex-grow: 0;
  }

  ${props =>
    props.primary &&
    `
    &:before {
      opacity: 0.3;
    }
  `};
`;

ReadoutDisplay.propTypes = {
  color: PropTypes.string,
  primary: PropTypes.bool
};

export default ReadoutDisplay;
