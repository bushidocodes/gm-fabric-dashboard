import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import React from "react";

NavButton.propTypes = {
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
  to: PropTypes.string.isRequired, // route the button should navigate to
  type: PropTypes.oneOf(["danger", "info", "primary", "secondary", "warning"])
};
/** 
 * General purpose button used for client-side navigation anywhere outside of sidebar
 * @param {Object} props - refer to propTypes
 * */
function NavButton({
  icon,
  iconSize,
  label,
  orientation,
  prefix,
  size,
  suffix,
  outline,
  tabIndex,
  type,
  to
}) {
  return (
    <NavLink
      activeClassName={"active"}
      className={
        "btn" +
        (type ? ` btn-type-${type}` : "") +
        (iconSize ? ` btn-icon-size-${iconSize}` : "") +
        (size ? ` btn-size-${size}` : "") +
        (outline ? ` btn-outline-${outline}` : "") +
        (orientation ? ` btn-orientation-${orientation}` : "")
      }
      tabIndex={tabIndex}
      title={label}
      to={to}
    >
      {icon && <span className="icon" data-uk-icon={`icon: ${icon};`} />}
      <span className="label">
        {prefix ? <span className="label-prefix">{prefix}</span> : ""}
        {label}
        {suffix ? <span className="label-suffix">{suffix}</span> : ""}
      </span>
    </NavLink>
  );
}

export default NavButton;
