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

import TapeIcon from "images/icons/tape.svg";
import "react-input-range/lib/css/index.css";
import "./Settings.scss";

SettingsGrid.propTypes = {
  fabricPollingInterval: PropTypes.number,
  fabricServer: PropTypes.string,
  instancePollingInterval: PropTypes.number,
  isPollingFabric: PropTypes.bool,
  isPollingInstance: PropTypes.bool,
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
  isPollingInstance,
  metricsCacheSize,
  numberOfDashboards,
  instancePollingInterval
}) {
  const button = (
    <Button
      clickAction={clearCacheClickAction}
      icon="close"
      label="Clear Cache"
      tabIndex={0}
      style={{
        display: "block",
        margin: "20px auto 10px auto"
      }}
    />
  );
  return (
    <div className="view-app-settings settings-grid">
      <ErrorBoundary>
        {fabricServer && (
          <PollingSettings
            changePollingInterval={Actions.changeFabricPollingInterval}
            stopPolling={Actions.stopPollingFabric}
            startPolling={Actions.startPollingFabric}
            interval={fabricPollingInterval}
            isPollingInstance={isPollingFabric}
            title="Fabric Polling"
          />
        )}
        <PollingSettings
          changePollingInterval={Actions.changeInstancePollingInterval}
          stopPolling={Actions.stopPollingInstance}
          startPolling={Actions.startPollingInstance}
          interval={instancePollingInterval}
          isPollingInstance={isPollingInstance}
          title={fabricServer ? "Instance Polling" : "Polling"}
        />

        <LayoutSection icon={TapeIcon} title={"Metrics Cache"} flex>
          <div style={{ width: "20em", textAlign: "center" }}>
            <Readout
              readoutContainerStyle={{
                height: "150px"
              }}
              readoutItemsStyle={{
                paddingLeft: "0px"
              }}
              readoutItemsContainerStyle={{
                flex: " "
              }}
              readoutItems={[
                {
                  detail: "Cache Size",
                  title: " ",
                  value: `${metricsCacheSize}`,
                  children: button
                }
              ]}
            />
          </div>
        </LayoutSection>
      </ErrorBoundary>
    </div>
  );
}

function mapStateToProps({ settings, dashboards, metrics }) {
  return {
    fabricPollingInterval: settings.fabricPollingInterval,
    fabricServer: settings.fabricServer,
    instancePollingInterval: settings.instancePollingInterval,
    isPollingFabric: settings.isPollingFabric,
    isPollingInstance: settings.isPollingInstance,
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
