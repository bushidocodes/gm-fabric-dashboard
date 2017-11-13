import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Icon from "components/Icon";
import Exclamation from "components/Glyphs/Exclamation";

MessageIcon.propTypes = {
  level: PropTypes.oneOf(["info", "error", "warning", "success"])
};

const MessageIconContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 0;

  svg {
    opacity: 0.05;
  }
`;

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
