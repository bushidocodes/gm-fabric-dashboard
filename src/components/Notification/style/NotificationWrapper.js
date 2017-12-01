import { spacingScale } from "style/styleFunctions";
import { NOTIFICATION_WIDTH } from "style/styleVariables";

const NotificationWrapper = `
  [class^="notifications-"] {
    position: fixed;
    width: ${NOTIFICATION_WIDTH};
    padding: 0 ${spacingScale(0.5)} ${spacingScale(0.5)};
    transition: all 0.2s ease;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    z-index: 9998;
    height: auto;

    // Top-aligned items
    &[class*="-t"] {
      top: 0;
      bottom: auto;
    }
    // Bottom-aligned items
    &[class*="-b"] {
      top: auto;
      bottom: 0;
    }
    // Center-aligned items
    &[class$="c"] {
      margin: 0 auto;
      left: 50%;
      transform: translateX(-50%);
    }
    // Left-aligned items
    &[class$="l"] {
      left: 0;
    }
    // Right-aligned items
    &[class$="r"] {
      right: 0;
    }
  }
`;

export default NotificationWrapper;
