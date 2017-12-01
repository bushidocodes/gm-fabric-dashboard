import { spacingScale } from "style/styleFunctions";
import {
  NOTIFICATION_TRANSITION,
  NOTIFICATION_BACKGROUND_COLOR
} from "style/styleVariables";

const NotificationBody = `
  .notification {
    background-color: ${NOTIFICATION_BACKGROUND_COLOR.string()};
    overflow: hidden;
    border-radius: 2px;
    color: black;
    font-weight: 600;
    display: block;
    font-size: 14px;
    margin: 0;
    opacity: 0;
    position: relative;
    transform: translateY(1em) scale(0.8);
    transition: all ${NOTIFICATION_TRANSITION}s ease;
    width: 100%;
    z-index: 1;
    padding: 0 ${spacingScale(1)};
    margin: 0;
    flex: 0 0 0px;
    min-height: 0;
    line-height: 0;

    &[class*="-visible"] {
      flex: 1 1;
      opacity: 1;
      padding: ${spacingScale(1)};
      margin-top: ${spacingScale(1)};
      transform: translateY(0) scale(1);
      line-height: 1.4;
      filter: blur(0);

      > * {
        transform: translateY(0);
        opacity: 1;
      }
    }

    &[class*="-hidden"] {
      transition: all 1s ease;
      flex: 0 0 0px;
      transform: translateY(-0.5em);
      filter: blur(1px);

      .notification-title {
        transition: all ${NOTIFICATION_TRANSITION * 2}s ease;
        line-height: 0;
        margin: 0;
      }

      > * {
        transform: translateY(-1em);
        opacity: 0;
      }
    }

    > * {
      transition: opacity ${NOTIFICATION_TRANSITION * 2}s ease,
        transform ${NOTIFICATION_TRANSITION * 2}s ease;
      transform: translateY(100%) scale(0.8);
      opacity: 0;
    }
    span.notification-dismiss {
      display: none;
    }
  }
  .notification-message,
  .notification-action-wrapper,
  .notification-action-button {
    margin: 0;
    padding: 0;
  }
`;

export default NotificationBody;
