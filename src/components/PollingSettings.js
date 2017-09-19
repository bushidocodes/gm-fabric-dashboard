import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import InputRange from "react-input-range";

import Button from "./library/Button.js";

/** 
 * Control to start/stop polling and change the polling rate
 * Styled to resemble a Readout and intended to be a child of SettingsGrid
 */
class PollingSettings extends Component {
  static propTypes = {
    changePollingInterval: PropTypes.func.isRequired,
    interval: PropTypes.number.isRequired,
    isPollingInstance: PropTypes.bool.isRequired,
    startPolling: PropTypes.func.isRequired,
    stopPolling: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  };

  // Use local state to have a "loosely" controlled component whereby the slider
  // slides smoothly and changes to Redux are debounced.
  state = {
    localInterval: this.props.interval / 1000,
    debouncedSetInterval: _.debounce(this.props.changePollingInterval, 1000)
  };

  render() {
    const { isPollingInstance, stopPolling, startPolling, title } = this.props;
    const buttonIcon = isPollingInstance ? "ban" : "play-circle";
    const buttonLabel = isPollingInstance ? "Stop Polling" : "Resume Polling";
    return (
      <section className="layout-section settings-group-polling">
        <header>
          <span
            className="section-icon"
            data-uk-icon={`icon: grid; ratio: 1`}
          />
          <h3 className="section-title">{title}</h3>
        </header>
        <div className="section-content">
          <div className="control-group control-group-polling-start-stop">
            <Button
              clickAction={() => {
                if (isPollingInstance) {
                  stopPolling();
                } else {
                  startPolling();
                }
              }}
              icon={buttonIcon}
              iconSize={"xl"}
              label={buttonLabel}
              orientation={"vertical"}
              outline={"none"}
              tabIndex={20}
              type={"primary"}
            />
          </div>

          <div className="control-group control-group-polling-interval">
            <InputRange
              aria-labelledby="polling interval-name"
              maxValue={120}
              minValue={5}
              onChange={value => {
                this.setState({ localInterval: value });
                this.state.debouncedSetInterval(value * 1000);
              }}
              tabIndex={21}
              value={this.state.localInterval}
            />
            <span className="label" id="interval-name">
              {"Polling Interval (seconds)"}
            </span>
          </div>
        </div>
      </section>
    );
  }
}

export default PollingSettings;
