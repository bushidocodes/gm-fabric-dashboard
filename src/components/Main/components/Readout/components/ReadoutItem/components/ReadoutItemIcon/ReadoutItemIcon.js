import React from "react";
import PropTypes from "prop-types";

import ReadoutItemIconStyle from "./components/ReadoutItemIconStyle";

import Icon from "components/Icon/index";

ReadoutItemIcon.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  iconBorderStyle: PropTypes.string,
  iconBorderWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

/**
 * ReadoutItemIcon wrapper that renders an Icon with Glyph component passed in as props.children
 * @function ReadoutItemIcon
 * @param {children }
 * @returns JSX.Element
 */
export default function ReadoutItemIcon({
  children,
  iconBorderStyle = null,
  iconBorderWidth = "1"
}) {
  return (
    <ReadoutItemIconStyle>
      <Icon
        iconRatio="1"
        borderStyle={iconBorderStyle}
        borderWidth={iconBorderWidth}
        backgroundOpacity=".2"
      >
        {children}
      </Icon>
    </ReadoutItemIconStyle>
  );
}
