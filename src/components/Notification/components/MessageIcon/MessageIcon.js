import React from "react";
import PropTypes from "prop-types";

import MessageIconContainer from "./components/MessageIconContainer";

import Icon from "components/Icon";
import Exclamation from "components/Glyphs/Exclamation";

MessageIcon.propTypes = {
  level: PropTypes.oneOf(["info", "error", "warning", "success"])
};

// Choose an icon to display based on level If Error, show error icon, etc.
function MessageIcon({ level = "info" }) {
  return (
    <MessageIconContainer className="notification-dismiss">
      <Icon
        iconRatio="5"
        borderStyle="BorderTriangleSmall"
        borderOpacity="1"
        borderWidth="2"
      >
        <Exclamation />
      </Icon>
    </MessageIconContainer>
  );
}

export default MessageIcon;
