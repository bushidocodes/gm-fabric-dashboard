import React, { Component } from "react";
import NotificationSystem from "react-notification-system";

import "./notifications.scss";

export default class Notification extends Component {
  componentDidMount() {
    window.addNotification = this.refs.notificationSystem.addNotification;
  }
  render() {
    // Note: React Notification uses an unusual syntax for disabling
    // default styles, which forces us to overtime this eslint rule
    // eslint-disable-next-line react/style-prop-object
    return <NotificationSystem ref="notificationSystem" style={false} />;
  }
}
