import styled from "styled-components";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

export const ServiceLink = styled(Link)`
  &,
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: inherit;
    cursor: not-allowed;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
  }

  &:not([disabled]) {
    cursor: pointer;
  }
`;

ServiceLink.propTypes = {
  cardBackgroundColor: PropTypes.string,
  cardHighlightColor: PropTypes.string,
  cursor: PropTypes.string
};

export const ServiceInfo = ServiceLink.withComponent("div");
