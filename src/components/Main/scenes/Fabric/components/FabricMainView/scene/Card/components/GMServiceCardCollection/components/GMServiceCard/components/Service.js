import styled from "styled-components";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export const ServiceLink = styled(Link)`
  &,
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    cursor: ${props => props.cursor};
    color: ${props => props.cardFontColor};
  }

  &:not([disabled]) {
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 5;
    }

    &:before {
      transition: all 0.3s ease;
      content: "";
      position: absolute;
      top: -2px;
      right: -2px;
      bottom: -2px;
      left: -2px;
      border: 2px solid ${props => props.cardHighlightColor};
      pointer-events: none;
      opacity: 0;
      z-index: 20;
    }

    &:hover {
      &:before {
        transition: all 0.1s ease;
        opacity: 1;
      }
    }

    &:hover {
      color: ${props => props.cardFontColor};
    }
  }
`;

ServiceLink.propTypes = {
  cardFontColor: PropTypes.string,
  cardHighlightColor: PropTypes.string,
  cursor: PropTypes.string
};

export const ServiceInfo = ServiceLink.withComponent("div");
