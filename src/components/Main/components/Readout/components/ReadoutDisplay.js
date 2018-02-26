import styled from "styled-components";
import { PropTypes } from "prop-types";
import Color from "color";

import { BORDER_RADIUS_BASE } from "style/styleVariables";
import { contrastColor, spacingScale } from "style/styleFunctions";

const COLOR_PRIMARY_READOUT = "#000";
const COLOR_TYPICAL_READOUT = "#222";

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
  margin: 0;
  position: relative;
  overflow: hidden;
  margin-right: ${spacingScale(1)};
  margin-bottom: ${spacingScale(1)};

  &:before {
    content: "";
    background-color: ${props => props.overallColor.fade(0.8).string()};
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
    border-bottom: 3px solid ${props => props.overallColor.string()};
  }

  &:first-child:last-child {
    flex-grow: 0;
  }

  ${props =>
    props.primary &&
    `
      color: ${contrastColor(COLOR_PRIMARY_READOUT, 1).string()};
      color: #000;
  `};
`;

ReadoutDisplay.propTypes = {
  overallColor: PropTypes.color,
  primary: PropTypes.bool
};

export default ReadoutDisplay;
