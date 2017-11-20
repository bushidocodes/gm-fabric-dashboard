import filesize from "filesize";
import { Actions } from "jumpstate";
import objectSizeOf from "object-sizeof";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import PollingSettings from "./components/PollingSettings";

import Button from "components/Button";
import LayoutSection from "components/LayoutSection";
import ErrorBoundary from "components/ErrorBoundary";
import ConfirmationModal from "components/ConfirmationModal";
import Readout from "components/Main/components/Readout";

import "react-input-range/lib/css/index.css";
import "./Settings.scss";

/**
 * Settings Page containing controls for things like polling rate, local storage, etc.
 * @param {Object} props - See proptypes for details
 */
class SettingsGrid extends Component {
  static propTypes = {
    fabricPollingInterval: PropTypes.number,
    fabricServer: PropTypes.string,
    instanceMetricsPollingInterval: PropTypes.number,
    isPollingFabric: PropTypes.bool,
    isPollingInstanceMetrics: PropTypes.bool,
    metricsCacheSize: PropTypes.string
  };

  state = {
    isClearCacheModelOpen: false
  };
  clearCacheClickAction = () => {
    this.setState({ isClearCacheModelOpen: true });
  };

  render() {
    const {
      fabricPollingInterval,
      fabricServer,
      isPollingFabric,
      isPollingInstanceMetrics,
      metricsCacheSize,
      instanceMetricsPollingInterval
    } = this.props;
    const button = (
      <Button
        clickAction={this.clearCacheClickAction}
        glyph="Close"
        label="Clear Cache"
        tabIndex={0}
      />
    );
    return (
      <div className="view-app-settings settings-grid">
        <ConfirmationModal
          isOpen={this.state.isClearCacheModelOpen}
          onCancel={() => this.setState({ isClearCacheModelOpen: false })}
          onConfirm={() => {
            Actions.clearMetrics();
            this.setState({ isClearCacheModelOpen: false });
          }}
          question="Are you sure that you want to clear the cached metrics data?"
          secondary="This action cannot be undone."
        />
        <ErrorBoundary>
          {fabricServer && (
            <PollingSettings
              changePollingInterval={
                Actions.changeFabricMicroservicesPollingInterval
              }
              stopPolling={Actions.stopPollingFabricMicroservices}
              startPolling={Actions.startPollingFabricMicroservices}
              interval={fabricPollingInterval}
              isPolling={isPollingFabric}
              glyph="Fabric"
              title="Fabric Polling"
            />
          )}
          <PollingSettings
            changePollingInterval={Actions.changeInstanceMetricsPollingInterval}
            stopPolling={Actions.stopPollingInstanceMetrics}
            startPolling={Actions.startPollingInstanceMetrics}
            interval={instanceMetricsPollingInterval}
            isPolling={isPollingInstanceMetrics}
            glyph="ServiceInstance"
            title={fabricServer ? "Instance Polling" : "Polling"}
          />

          <LayoutSection icon={"Tape"} title={"Metrics Cache"} flex>
            <Readout
              readoutItemsContainerStyle={{
                minHeight: "125px"
              }}
              //below is necessary to over rule a media query under 1000px applying to all Readout container, making them flex 100%
              readoutContainerStyle={{
                flex: "0 0 300px"
              }}
              readoutItems={[
                {
                  title: "Cache Size",
                  value: `${metricsCacheSize}`,
                  children: button
                }
              ]}
            />
          </LayoutSection>
        </ErrorBoundary>
      </div>
    );
  }
}

function mapStateToProps({
  settings: { fabricServer },
  dashboards,
  fabric: { fabricPollingInterval, isPollingFabric },
  instance: {
    metrics,
    instanceMetricsPollingInterval,
    isPollingInstanceMetrics
  }
}) {
  return {
    fabricPollingInterval,
    fabricServer,
    instanceMetricsPollingInterval,
    isPollingFabric,
    isPollingInstanceMetrics,
    metricsCacheSize: filesize(objectSizeOf(metrics))
  };
}

export default connect(mapStateToProps)(SettingsGrid);
