import PropTypes from "prop-types";
import React from "react";

import { convertMS } from "utils";

export default class UpTime extends React.Component {
  static propTypes = {
    render: PropTypes.func.isRequired,
    startTime: PropTypes.number.isRequired
  };

  state = {
    startTime: this.props.startTime,
    uptime: []
  };

  // start timer in componentDidMount
  // in setInterval, call setState which triggers re-render
  componentDidMount() {
    this.timer = setInterval(() => this.onChangeUptime(), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime !== this.props.startTime) {
      this.setState({
        startTime: nextProps.startTime
      });
    }
  }

  // call clearInterval() to cancel the timer
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onChangeUptime() {
    const uptime =
      this.state.startTime > 0 ? Date.now() - this.state.startTime : 0;

    this.setState({
      uptime: convertMS(uptime)
    });
  }

  render() {
    return this.props.render(this.state.uptime);
  }
}
