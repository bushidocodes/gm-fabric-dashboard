import { PropTypes } from "prop-types";
import React from "react";
Button.propTypes = {
  active: PropTypes.bool, // If the button should be style as active or not
  clickAction: PropTypes.any.isRequired, // click handler
  disabled: PropTypes.bool, // disables the button
  icon: PropTypes.string, // string of UIKit Icon to use for button
  iconSize: PropTypes.oneOf(["normal", "xs", "sm", "lg", "xl"]), // Relative size of the icon
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
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Add suffix text to button label
  tabIndex: PropTypes.number,
  type: PropTypes.oneOf(["danger", "info", "primary", "secondary", "warning"])
};

/**
 * General purpose button
 * @param {Object} props - see propTypes 
 * @returns JSX.Element
 */
function Button({
  active,
  clickAction,
  disabled,
  icon,
  iconSize,
  label,
  orientation,
  prefix,
  size,
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
        (iconSize ? ` btn-icon-size-${iconSize}` : "") +
        (size ? ` btn-size-${size}` : "") +
        (outline ? ` btn-outline-${outline}` : "") +
        (orientation ? ` btn-orientation-${orientation}` : "")
      }
      disabled={disabled}
      onClick={clickAction}
      tabIndex={tabIndex}
      title={label}
    >
      {icon && <span className="icon" data-uk-icon={`icon: ${icon};`} />}
      <span className="label">
        {prefix ? <span className="label-prefix">{prefix}</span> : ""}
        {label}
        {suffix ? <span className="label-suffix">{suffix}</span> : ""}
      </span>
    </button>
  );
}

export default Button;