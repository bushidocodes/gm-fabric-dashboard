import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale } from "style/styleFunctions";

const ReadoutItemContainer = styled.div`
  flex: ${props => (props.flex ? props.flex : "0 1 100%")};
  min-height: 75px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${spacingScale(1)} ${spacingScale(0.5)};

  & + &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    border-top: 1px solid currentColor;
    opacity: 0.125;
  }
`;

ReadoutItemContainer.propTypes = {
  flex: PropTypes.string
};

export default ReadoutItemContainer;
