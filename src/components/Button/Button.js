import { PropTypes } from "prop-types";
import React from "react";
import "./Button.scss";

import Icon from "components/Icon";
import Glyph from "components/Glyphs/";

Button.propTypes = {
  active: PropTypes.bool, // If the button should be style as active or not
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  clickAction: PropTypes.any.isRequired, // click handler
  disabled: PropTypes.bool, // disables the button
  glyph: PropTypes.string, // Glyph to display in the button
  glyphColor: PropTypes.string, // Color for the glyph
  glyphRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Relative size for the glyph
  label: PropTypes.string.isRequired, // label for the button
  orientation: PropTypes.oneOf(["vertical", "horizontal"]), // Vertical: Icon top, label bottom; Horizontal: Icon left, label right;
  outline: PropTypes.oneOf([
    "raised", // Add highlight effect to top edge and shadow effect to bottom edge
    "outline", // Add outline effect
    "outline-shadow", // Add outline effect, and add shadow effect to bottom edge
    "shadow", // Add shadow effect to bottom edge
    "none" // No effects
  ]),
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Add prefix text to button label
  size: PropTypes.oneOf(["normal", "xs", "sm", "lg", "xl"]), // Relative size of the button
  style: PropTypes.object, // style prop
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Add suffix text to button label
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf([
    "danger",
    "info",
    "primary",
    "secondary",
    "warning",
    "polling"
  ])
};

/**
 * General purpose button
 * @param {Object} props - see propTypes
 * @returns JSX.Element
 */
function Button({
  active,
  children,
  clickAction,
  disabled,
  glyph,
  glyphRatio,
  glyphColor,
  label,
  orientation,
  prefix,
  size,
  style,
  suffix,
  outline,
  tabIndex,
  type
}) {
  return (
    <button
      className={
        "btn" +
        (active ? ` active` : "") +
        (type ? ` btn-type-${type}` : "") +
        (size ? ` btn-size-${size}` : "") +
        (outline ? ` btn-outline-${outline}` : "") +
        (orientation ? ` btn-orientation-${orientation}` : "")
      }
      disabled={disabled}
      onClick={clickAction}
      tabIndex={tabIndex}
      title={label}
      style={style}
    >
      {glyph && (
        <Icon>
          <Glyph glyphColor={glyphColor} name={glyph} ratio={glyphRatio} />
        </Icon>
      )}
      {children}
      <span className="label">
        {prefix ? <span className="label-prefix">{prefix}</span> : ""}
        {label}
        {suffix ? <span className="label-suffix">{suffix}</span> : ""}
      </span>
    </button>
  );
}

export default Button;
