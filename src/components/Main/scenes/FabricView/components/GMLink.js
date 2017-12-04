import { Link } from "react-router-dom";
import styled from "styled-components";
import { PropTypes } from "prop-types";

import { COLOR_HIGHLIGHT, COLOR_CONTENT_MUTED } from "style/styleVariables";

const GMLink = styled(Link)`
  width: 100%;
  cursor: ${props => props.cursor};
  text-decoration: none;
  color: black;
  display: flex;
  cursor: pointer;

  &:focus {
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:focus:active:hover {
    outline: 0;
  }

  ${props =>
    props.disabled &&
    `
      color: ${COLOR_CONTENT_MUTED.string()};
      cursor: not-allowed;

  `} &:hover {
    ${props =>
      props.disabled
        ? `
        color: ${COLOR_CONTENT_MUTED.string()};
        cursor: not-allowed;
    `
        : `
        color: ${COLOR_HIGHLIGHT.string()};
    `};
  }
`;

GMLink.propTypes = {
  disabled: PropTypes.bool
};

export default GMLink;
