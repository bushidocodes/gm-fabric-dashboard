import styled from "styled-components";
import { PropTypes } from "prop-types";

const DocsLink = styled.a`
  justify-self: flex-end;
  margin-left: 0;
  cursor: pointer;
  pointer-events: auto;
  color: ${props => props.cardFontColor};
  transition: all 0.3s ease;
  transform: scale(1);
  will-change: transform;

  &:hover,
  &:focus {
    transform: scale(1.25);
    transition: all 0.1s ease;
    color: inherit;
  }

  &:active {
    transform: scale(1.1);
  }
`;

DocsLink.propTypes = {
  cardFontColor: PropTypes.string
};

export default DocsLink;
