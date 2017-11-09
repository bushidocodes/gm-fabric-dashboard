import React, { Component } from "react";
import NotificationSystem from "react-notification-system";

export default class Notification extends Component {
  componentDidMount() {
    window.addNotification = this.refs.notificationSystem.addNotification;
  }
  render() {
    return <NotificationSystem ref="notificationSystem" />;
  }
}
