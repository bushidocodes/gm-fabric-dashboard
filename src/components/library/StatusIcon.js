import React from "react";
import PropTypes from "prop-types";
import ShapeIcon from "./ShapeIcon";
import {
  COLOR_SUCCESS,
  COLOR_DANGER,
  COLOR_WARNING
} from "../../style/styleVariables";

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired
};

export default function StatusIcon({ status = "down" }) {
  if (status.toLowerCase() === "down") {
    return <ShapeIcon color={COLOR_DANGER.string()} shape="square" />;
  } else if (status.toLowerCase() === "warning") {
    return <ShapeIcon color={COLOR_WARNING.string()} shape="triangle" />;
  } else if (status.toLowerCase() === "stable") {
    return <ShapeIcon color={COLOR_SUCCESS.string()} shape="circle" />;
  }
}
