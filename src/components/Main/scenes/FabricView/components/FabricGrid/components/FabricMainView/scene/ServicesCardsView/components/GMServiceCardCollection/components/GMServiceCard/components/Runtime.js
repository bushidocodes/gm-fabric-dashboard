import styled from "styled-components";
import { PropTypes } from "prop-types";
import { spacingScale } from "style/styleFunctions";

const Runtime = styled.span`
  color: ${props => props.cardFontColor};
  font-weight: 600;
  text-align: left;
  flex: 1 1 100%;
  padding-right: ${spacingScale(1)};
`;

Runtime.propTypes = {
  cardFontColor: PropTypes.string
};

export default Runtime;
