import styled, { css } from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale } from "style/styleFunctions";

// -webkit-flex: 1 1 0; added as a fix for flex-item not centering in safari 10.1
// for "cacheCard", set minimum height to overrule media query for  child readoutItemContainer size.  flex-basis of 100% is overruled in the parent container.
const ItemDisplay = styled.div`
  position: relative;
  padding: ${spacingScale(1)};

  button {
    align-self: center;
    margin: ${spacingScale(1)} 0;
  }

  color: ${props => props.color};
  ${props =>
    props.flex &&
    css`
      flex: ${props => props.flex};
    `};
`;

ItemDisplay.propTypes = {
  color: PropTypes.string,
  flex: PropTypes.string
};

export default ItemDisplay;
