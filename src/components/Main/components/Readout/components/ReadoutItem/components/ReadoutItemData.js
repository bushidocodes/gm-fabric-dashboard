import styled from "styled-components";
import { PropTypes } from "prop-types";

import { spacingScale } from "style/styleFunctions";

const ReadoutItemData = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: ${spacingScale(1)} 0;

  &:first-child {
    padding-left: ${props =>
      props.paddingLeft ? props.paddingLeft : spacingScale(2)};
  }
`;

ReadoutItemData.propTypes = {
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ReadoutItemData;
