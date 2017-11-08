import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

import Icon from "components/Icon/index";

const ReadoutItemIconStyle = styled.div`
  flex: 0 0 ${spacingScale(10)};
  height: ${spacingScale(6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

ReadoutItemIcon.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

/**
 * ReadoutItemIcon wrapper that renders an Icon with Glyph component passed in as props.children
 * @function ReadoutItemIcon
 * @param {children }
 * @returns JSX.Element
 */
export default function ReadoutItemIcon({ children }) {
  return (
    <ReadoutItemIconStyle>
      <Icon>{children}</Icon>
    </ReadoutItemIconStyle>
  );
}
