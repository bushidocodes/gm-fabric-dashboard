import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import React from "react";

NavButton.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.oneOf(["normal", "xs", "sm", "lg", "xl"]),
  label: PropTypes.string.isRequired,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  outline: PropTypes.oneOf([
    "raised",
    "outline",
    "outline-shadow",
    "shadow",
    "none"
  ]),
  prefix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(["normal", "xs", "sm", "lg", "xl"]),
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tabIndex: PropTypes.number,
  to: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["danger", "info", "primary", "secondary", "warning"])
};

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
        {prefix
          ? <span className="label-prefix">
              {prefix}
            </span>
          : ""}
        {label}
        {suffix
          ? <span className="label-suffix">
              {suffix}
            </span>
          : ""}
      </span>
    </NavLink>
  );
}

export default NavButton;
