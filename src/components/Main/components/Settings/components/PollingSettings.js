import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import InputRange from "react-input-range";

import Button from "components/Button";
import LayoutSection from "components/LayoutSection";

import PollIcon from "images/icons/poll.svg";

/**
 * Control to start/stop polling and change the polling rate
 * Styled to resemble a Readout and intended to be a child of SettingsGrid
 */
class PollingSettings extends Component {
  static propTypes = {
    changePollingInterval: PropTypes.func.isRequired,
    interval: PropTypes.number.isRequired,
    isPolling: PropTypes.bool.isRequired,
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
    const { isPolling, stopPolling, startPolling, title } = this.props;
    const buttonGlyph = isPolling ? "Pause" : "Play";
    const buttonLabel = isPolling ? "Pause Updates" : "Resume Updates";
    return (
      <LayoutSection title={title} icon={PollIcon} flex>
        <div
          className="control-group control-group-polling-start-stop"
          id={`ctrl-btn-${title}`}
        >
          <Button
            clickAction={() => {
              if (isPolling) {
                stopPolling();
              } else {
                startPolling();
              }
            }}
            glyph={buttonGlyph}
            label={buttonLabel}
            orientation={"vertical"}
            outline={"raised"}
            tabIndex={0}
            type={"polling"}
            style={{
              width: "100%",
              height: "100%",
              position: "relative"
            }}
          />
        </div>

        <div
          className="control-group control-group-polling-interval"
          id={`ctrl-slider-${title}`}
        >
          <InputRange
            aria-labelledby="polling interval-name"
            maxValue={120}
            minValue={5}
            onChange={value => {
              this.setState({ localInterval: value });
              this.state.debouncedSetInterval(value * 1000);
            }}
            value={this.state.localInterval}
          />
          <span className="label" id={`interval-name-${title}`}>
            {"Updates Per Minute"}
          </span>
        </div>
      </LayoutSection>
    );
  }
}

export default PollingSettings;
