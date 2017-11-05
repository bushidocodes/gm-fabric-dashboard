import React from "react";
import PropTypes from "prop-types";

import StatusStableIcon from "images/icons/status-stable.svg";
import StatusWarningIcon from "images/icons/status-warning.svg";
import StatusDownIcon from "images/icons/status-down.svg";
import ServicesIcon from "images/icons/services.svg";

StatusIcon.propTypes = {
  status: PropTypes.string
};

export default function StatusIcon({ status = "down" }) {
  if (status.toLowerCase() === "down") {
    return <img src={StatusDownIcon} alt="" />;
  } else if (status.toLowerCase() === "warning") {
    return <img src={StatusWarningIcon} alt="" />;
  } else if (status.toLowerCase() === "stable") {
    return <img src={StatusStableIcon} alt="" />;
  } else {
    return <img src={ServicesIcon} alt="" />;
  }
}
