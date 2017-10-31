import React from "react";
import PropTypes from "prop-types";
// import ShapeIcon from "./ShapeIcon";
// import {
//   COLOR_SUCCESS,
//   COLOR_DANGER,
//   COLOR_WARNING
// } from "style/styleVariables";
import StatusStableIcon from "images/icons/status-stable.svg";
import StatusWarningIcon from "images/icons/status-warning.svg";
import StatusDownIcon from "images/icons/status-down.svg";
import ServicesIcon from "images/icons/services.svg";

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired
};

export default function StatusIcon({ status = "down" }) {
  if (status.toLowerCase() === "down") {
    return <img src={StatusDownIcon} alt="" />;
    // return <ShapeIcon color={COLOR_DANGER.string()} shape="square" />;
  } else if (status.toLowerCase() === "warning") {
    return <img src={StatusWarningIcon} alt="" />;
    // return <ShapeIcon color={COLOR_WARNING.string()} shape="triangle" />;
  } else if (status.toLowerCase() === "stable") {
    return <img src={StatusStableIcon} alt="" />;
    // return <ShapeIcon color={COLOR_SUCCESS.string()} shape="circle" />;
  } else {
    return <img src={ServicesIcon} alt="" />;
  }
}
