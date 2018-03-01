import { PropTypes } from "prop-types";
import React from "react";
import Color from "color";
import styled from "styled-components";

import Glyph from "components/Glyphs/";
import Icon from "components/Icon";

import {
  COLOR_HIGHLIGHT,
  COLOR_CONTENT_BACKGROUND
} from "style/styleVariables";
import { spacingScale, contrastColor } from "style/styleFunctions";

NavTab.propTypes = {
  active: PropTypes.bool, // If the button should be style as active or not
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  clickAction: PropTypes.any.isRequired, // click handler
  disabled: PropTypes.bool, // disables the button
  glyph: PropTypes.string, // Glyph to display in the button
  glyphColor: PropTypes.string, // Color for the glyph
  glyphRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Relative size for the glyph
  iconSize: PropTypes.string,
  label: PropTypes.string.isRequired // label for the button
};

NavTab.defaultProps = {
  active: false,
  clickAction: null,
  glyphRation: "1",
  iconSize: "1",
  label: "Label"
};

const COLOR_TAB_HIGHLIGHT_INACTIVE = contrastColor(
  COLOR_CONTENT_BACKGROUND,
  0.5
).string();
const COLOR_TAB_HIGHLIGHT_ACTIVE = COLOR_HIGHLIGHT;

const NavTabWrap = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacingScale(1)} ${spacingScale(2)};
  flex: 0 1 auto;
  cursor: pointer;
  line-height: 0;
  transition: all 0.15s ease;

  &:hover {
    box-shadow: inset 0 -1px ${Color(COLOR_TAB_HIGHLIGHT_INACTIVE)
        .fade(0.5)
        .string()};

    &:active {
      box-shadow: inset 0 -1.5px ${COLOR_TAB_HIGHLIGHT_INACTIVE};
      user-select: none;
    }
  }

  ${props =>
    props.active &&
    `
    &,
    &:hover {
      box-shadow: inset 0 -2px ${COLOR_TAB_HIGHLIGHT_ACTIVE.string()};

      &:active {
        box-shadow: inset 0 -2px ${Color(COLOR_TAB_HIGHLIGHT_ACTIVE)
          .darken(0.2)
          .string()};
      }

  `};

  ${props =>
    props.disabled &&
    `
    &,
    &:hover,
    &:focus,
    &:active {
      opacity: .5;
    }
  `};

  & > svg:first-child {
    margin-left: -${spacingScale(0.5)};
  }

  & > svg:last-child {
    margin-right: -${spacingScale(0.5)};
  }
`;

/**
 * General purpose button
 * @param {Object} props - see propTypes
 * @returns JSX.Element
 */
function NavTab({
  active,
  children,
  clickAction,
  disabled,
  glyph,
  glyphRatio,
  glyphColor,
  label,
  iconSize
}) {
  return (
    <NavTabWrap
      active={active}
      disabled={disabled}
      onClick={clickAction}
      title={label}
      iconSize={iconSize}
    >
      {glyph && (
        <Icon>
          <Glyph glyphColor={glyphColor} name={glyph} ratio={glyphRatio} />
        </Icon>
      )}
      {children}
      <span>{label}</span>
    </NavTabWrap>
  );
}

export default NavTab;
