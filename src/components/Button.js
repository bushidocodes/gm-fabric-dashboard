import { PropTypes } from "prop-types";
import React from "react";

Button.propTypes = {
  active: PropTypes.bool,
  clickAction: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
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
  type: PropTypes.oneOf(["danger", "info", "primary", "secondary", "warning"])
};

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
    </button>
  );
}

export default Button;
