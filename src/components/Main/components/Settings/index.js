import filesize from "filesize";
import { Actions } from "jumpstate";
import objectSizeOf from "object-sizeof";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import UIkit from "uikit";

import PollingSettings from "./components/PollingSettings";

import Button from "components/Button";
import LayoutSection from "components/LayoutSection";
import ErrorBoundary from "components/ErrorBoundary";
import Readout from "components/Main/components/Readout";

import "react-input-range/lib/css/index.css";
import "./Settings.scss";

SettingsGrid.propTypes = {
  fabricPollingInterval: PropTypes.number,
  fabricServer: PropTypes.string,
  instanceMetricsPollingInterval: PropTypes.number,
  isPollingFabric: PropTypes.bool,
  isPollingInstanceMetrics: PropTypes.bool,
  metricsCacheSize: PropTypes.string,
  numberOfDashboards: PropTypes.number
};

/**
 * Settings Page containing controls for things like polling rate, local storage, etc.
 * @param {Object} props - See proptypes for details
 */
function SettingsGrid({
  fabricPollingInterval,
  fabricServer,
  isPollingFabric,
  isPollingInstanceMetrics,
  metricsCacheSize,
  numberOfDashboards,
  instanceMetricsPollingInterval
}) {
  const button = (
    <Button
      clickAction={clearCacheClickAction}
      icon="close"
      label="Clear Cache"
      tabIndex={0}
    />
  );
  return (
    <div className="view-app-settings settings-grid">
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
            title="Fabric Polling"
          />
        )}
        <PollingSettings
          changePollingInterval={Actions.changeInstanceMetricsPollingInterval}
          stopPolling={Actions.stopPollingInstanceMetrics}
          startPolling={Actions.startPollingInstanceMetrics}
          interval={instanceMetricsPollingInterval}
          isPolling={isPollingInstanceMetrics}
          title={fabricServer ? "Instance Polling" : "Polling"}
        />

        <LayoutSection icon={"Tape"} title={"Metrics Cache"} flex>
          <Readout
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
    numberOfDashboards: Object.keys(dashboards).length,
    metricsCacheSize: filesize(objectSizeOf(metrics))
  };
}

export default connect(mapStateToProps)(SettingsGrid);

const clearCacheClickAction = () => {
  UIkit.modal
    .confirm(
      "Are you sure that you want to clear the cached metrics data? This action cannot be undone."
    )
    .then(() => Actions.clearMetrics());
};

// Disabled for intitial release
// const resetDashboardsClickAction = () => {
//   UIkit.modal
//     .confirm(
//       "Are you sure that you want to clear dashboard state? This will revert all dashboards to default."
//     )
//     .then(() => Actions.setDashboardsToDefault());
// };
