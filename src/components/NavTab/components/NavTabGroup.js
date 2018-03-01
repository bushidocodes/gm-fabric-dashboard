import { PropTypes } from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

import { spacingScale } from "style/styleFunctions";

NavTabGroup.propTypes = {
  align: PropTypes.oneOf(["start", "center", "end"]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  stretch: PropTypes.bool
};

NavTabGroup.defaultProps = {
  align: "start",
  position: "top",
  stretch: false
};

const NavTabGroupWrap = styled.nav`
  display: flex;
  align-items: stretch;
  flex-direction: row;
  min-height: ${spacingScale(5)};
  justify-content: ${props => props.align};

  & > a {
    ${props =>
      props.stretch &&
      `
        flex: 1 1 100%;
      `};
  }
`;

/**
 * Navigation Tab Group
 * @param {Object} props - see propTypes
 * @returns JSX.Element
 */
export default function NavTabGroup({ children, stretch, align, position }) {
  let setAlignment = "";
  switch (align) {
    case "start":
      setAlignment = "flex-start";
      break;
    case "end":
      setAlignment = "flex-end";
      break;
    case "center":
    default:
      setAlignment = "center";
  }

  return (
    <NavTabGroupWrap align={setAlignment} position={position} stretch={stretch}>
      {children}
    </NavTabGroupWrap>
  );
}
