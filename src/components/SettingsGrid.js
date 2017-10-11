import filesize from "filesize";
import { Actions } from "jumpstate";
import objectSizeOf from "object-sizeof";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import UIkit from "uikit";

import PollingSettings from "./PollingSettings";

import Readout from "./library/Readout.js";
import Button from "./library/Button.js";
import ReadoutItem from "./library/ReadoutItem.js";
import LayoutSection from "./library/LayoutSection";
import TapeIcon from "../images/icons/tape.svg";

import "react-input-range/lib/css/index.css";

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
  return (
    <div className="view-app-settings settings-grid">
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

      <LayoutSection
        className={"settings-group-metrics-cache"}
        icon={TapeIcon}
        title={"Metrics Cache"}
      >
        <Readout align={"center"}>
          <ReadoutItem title={"Cache Size"} value={metricsCacheSize} />
          <Button
            clickAction={clearCacheClickAction}
            icon="close"
            label="Clear Metrics Cache"
            tabIndex={0}
          />
        </Readout>
      </LayoutSection>

      {/** Disabled for initial release
      <LayoutSection
        className={"settings-group-user-dashboards"}
        title={"Custom Dashboards"}
      >
        <Readout align={"center"}>
          <ReadoutItem title={"Custom Dashboards"} value={numberOfDashboards} />
          <Button
            clickAction={resetDashboardsClickAction}
            icon="close"
            label="Reset Dashboards"
            tabIndex={31}
            type="danger"
          />
        </Readout>
      </LayoutSection>
      **/}
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
