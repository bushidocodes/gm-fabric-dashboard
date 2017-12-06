import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale } from "style/styleFunctions";

// -webkit-flex: 1 1 0; added as a fix for flex-item not centering in safari 10.1
const ReadoutItemContainer = styled.div`
  flex: ${props => (props.flex ? props.flex : "0 1 100%")};
  min-height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${spacingScale(1)} ${spacingScale(0.5)};
  -webkit-flex: 1 1 0; /* stylelint-disable-line */

  & + &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    border-top: 1px solid currentColor;
    opacity: 0.125;
  }

  button {
    margin: ${spacingScale(1)} 0;
    align-self: center;
  }
`;

ReadoutItemContainer.propTypes = {
  flex: PropTypes.string
};

export default ReadoutItemContainer;
