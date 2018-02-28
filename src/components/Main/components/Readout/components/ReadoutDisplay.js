import styled from "styled-components";
import { PropTypes } from "prop-types";

import {
  COLOR_CONTENT_BACKGROUND,
  BORDER_RADIUS_BASE
} from "style/styleVariables";
import { contrastColor, spacingScale } from "style/styleFunctions";

// TO-DO: remove cacheCard props passed to readout- styled-components after implementing reusable card component
// for "cacheCard", overrule flex-basis of 100%
const ReadoutDisplay = styled.div`
  align-items: stretch;
  background-color: ${props =>
    props.primary
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0.8).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 0.1).string()};
  border-radius: ${BORDER_RADIUS_BASE};
  color: ${props =>
    props.primary
      ? contrastColor(COLOR_CONTENT_BACKGROUND, 0).string()
      : contrastColor(COLOR_CONTENT_BACKGROUND, 1).string()};
  display: flex;
  flex: 1 1 300px;
  flex-direction: column;
  margin: ${props => (props.primary ? 0 : spacingScale(0.5))};

  @media all and (max-width: 1000px) {
    flex: ${props => (props.cacheCard ? "0 0 300px" : "0 0 100%")};
    order: ${props => (props.primary ? 0 : 1)};
  }
  &:first-child:last-child {
    flex-grow: 0;

    > * {
      text-align: center;

      > :first-child {
        padding-left: 0;
      }
    }
  }
`;

ReadoutDisplay.propTypes = {
  primary: PropTypes.bool
};

export default ReadoutDisplay;
