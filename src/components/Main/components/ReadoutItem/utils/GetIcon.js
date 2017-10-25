import React from "react";
import { PropTypes } from "prop-types";
import ShapeIcon from "../../../ShapeIcon";
// import other icons here

/**
 * Takes an icon's name, shape, color and other parameters
 * and returns a react component that renders svg element
 * @param {any} name, shape, color....
 * @returns react component
 */
const GetIcon = ({ iconName, iconShape, iconColor }) => {
  if (iconName === "ShapeIcon")
    return <ShapeIcon shape={iconShape} color={iconColor} />;
};

GetIcon.propTypes = {
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  iconShape: PropTypes.string
};

export default GetIcon;
