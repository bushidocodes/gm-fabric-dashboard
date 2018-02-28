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
  align: "end",
  position: "top",
  stretch: false
};

const NavTabGroupWrap = styled.nav`
  display: flex;
  align-items: stretch;
  flex-direction: row;
  min-height: ${spacingScale(5)};

  & > a {
    ${props =>
      props.stretch &&
      `
        flex: 1 1 100%;
      `};
  }

  ${(props => props.align === "end") &&
    css(`
    justify-content: flex-end;
  `)};

  ${(props => props.align === "start") &&
    css(`
    justify-content: flex-start;
  `)};
  ${(props => props.align === "center") &&
    css(`
    justify-content: center;
  `)};
`;

/**
 * Navigation Tab Group
 * @param {Object} props - see propTypes
 * @returns JSX.Element
 */
export default function NavTabGroup({ children, stretch, align, position }) {
  return (
    <NavTabGroupWrap align={align} position={position} stretch={stretch}>
      {children}
    </NavTabGroupWrap>
  );
}
