import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";

import { contrastColor, spacingScale } from "../../../style/styleFunctions";
import {
  FONT_SIZE_HERO,
  FONT_SIZE_BASE,
  BORDER_RADIUS_BASE,
  COLOR_ALT_BACKGROUND
} from "../../../style/styleVariables";

Banner.propTypes = {
  extras: PropTypes.array,
  hideBackground: PropTypes.bool,
  title: PropTypes.string.isRequired
};

export const HeaderContainer = styled.div`
  background: ${props =>
    props.hideBackground ? "transparent" : COLOR_ALT_BACKGROUND.string()};
  color: ${contrastColor(COLOR_ALT_BACKGROUND, 1).string()};
  padding: ${spacingScale(2)} ${spacingScale(3)} ${spacingScale(3)};
`;

export const Header = styled.h1`
  font-size: ${FONT_SIZE_HERO};
  margin: 0;
  position: relative;
  display: inline-block;
  z-index: 0;

  &:after {
    content: "";
    background-color: ${COLOR_ALT_BACKGROUND.fade(0.5).string()};
    position: absolute;
    left: 0.25em;
    right: 0.25em;
    bottom: 0.25em;
    top: 0.25em;
    z-index: -1;
    filter: blur(10px);
  }
`;

export const Extra = styled.a`
  z-index: 2;
  position: relative;
  display: inline-block;
  font-size: ${FONT_SIZE_BASE};
  color: ${contrastColor(COLOR_ALT_BACKGROUND, 0.9).string()}};
  background-color: ${contrastColor(COLOR_ALT_BACKGROUND, 0.2).string()}};
  padding: ${spacingScale(0.25)} ${spacingScale(1)};
  border-radius: ${BORDER_RADIUS_BASE};
  transition: all 0.15s ease;

  &:not(:last-child) {
    margin-right: ${spacingScale(1)};
  }

  &:hover {
    background-color: ${contrastColor(COLOR_ALT_BACKGROUND, 0.25).string()}};
    color: ${contrastColor(COLOR_ALT_BACKGROUND, 1).string()}};
  }

  &:active {
    background-color: ${contrastColor(COLOR_ALT_BACKGROUND, 0).string()}};
    color: ${contrastColor(COLOR_ALT_BACKGROUND, 1).string()}};
  }
`;

export const ExtrasLine = styled.div``;

/**
 * Stateless functional React component that renders the banner in AppHeader
 * @param {String} props - See propTypes
 * @returns JSX.Element
 */
function Banner({ title, extras, hideBackground }) {
  return (
    <HeaderContainer hideBackground={hideBackground}>
      <Header>{title}</Header>
      {extras && (
        <ExtrasLine>
          {extras.map(extra => (
            <Extra href={extra.path} key={extra.title}>
              {extra.title}
            </Extra>
          ))}
        </ExtrasLine>
      )}
    </HeaderContainer>
  );
}

export default Banner;
