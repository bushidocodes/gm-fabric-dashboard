import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";

import { contrastColor, spacingScale } from "../../../style/styleFunctions";
import {
  FONT_SIZE_SM,
  FONT_SIZE_LG,
  COLOR_ALT_BACKGROUND,
  COLOR_HIGHLIGHT
} from "../../../style/styleVariables";
import { NavLink } from "react-router-dom";

Banner.propTypes = {
  title: PropTypes.string,
  extra: PropTypes.string
};

export const HeaderWrap = styled.div`
  color: ${contrastColor(COLOR_ALT_BACKGROUND, 1).string()};
  padding: ${spacingScale(2)} ${spacingScale(3)};
`;

export const Header = styled.h1``;

export const Extra = styled.p``;

/**
 * Stateless functional React component that renders the header in AppHeader
 * @param {String} props - See propTypes
 * @returns JSX.Element
 */
function Banner({ title, extra }) {
  return (
    <HeaderWrap>
      <Header>{title}</Header>
      {extra ? <Extra>{extra}</Extra> : null}
    </HeaderWrap>
  );
}

export default Banner;
