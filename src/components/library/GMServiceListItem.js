import React from "react";
import PropTypes from "prop-types";
import IndicatorIcon from "./IndicatorIcon";

GMServiceListItem.propTypes = {
  // docsLink: PropTypes.string,
  name: PropTypes.string.isRequired,
  state: PropTypes.string,
  version: PropTypes.string
};

export default function GMServiceListItem({ name, state, version }) {
  // Style based on the state of the service
  let indicatorIconColor;
  switch (state) {
    case "error":
      indicatorIconColor = "DarkRed";
      break;
    case "warning":
      indicatorIconColor = "orange";
      break;
    case "healthy":
    default:
      indicatorIconColor = "white";
  }
  return (
    <li>
      <IndicatorIcon color={indicatorIconColor} diameter={10} />
      <span style={{ marginLeft: "5px", width: "100px" }}>{name}</span>
      <span style={{ marginLeft: "5px" }}>{version}</span>
    </li>
  );
}
