import React from "react";
import PropTypes from "prop-types";
import ShapeIcon from "./ShapeIcon";

StatusIcon.propTypes = {
  status: PropTypes.string.isRequired
};

export default function StatusIcon({ status = "down" }) {
  if (status.toLowerCase() === "down") {
    return <ShapeIcon color="red" shape="square" />;
  } else if (status.toLowerCase() === "warning") {
    return <ShapeIcon color="yellow" shape="triangle" />;
  } else if (status.toLowerCase() === "stable") {
    return <ShapeIcon color="green" shape="circle" />;
  }
}
