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

import "react-input-range/lib/css/index.css";

SettingsGrid.propTypes = {
  isPolling: PropTypes.bool,
  metricsCacheSize: PropTypes.string,
  numberOfDashboards: PropTypes.number,
  pollingInterval: PropTypes.number
};

/**
 * Settings Page containing controls for things like polling rate, local storage, etc.
 * @param {Object} props - See proptypes for details
 */
function SettingsGrid({
  isPolling,
  metricsCacheSize,
  numberOfDashboards,
  pollingInterval
}) {
  return (
    <div className="view-app-settings settings-grid">
      <PollingSettings interval={pollingInterval} isPolling={isPolling} />

      <LayoutSection
        className={"settings-group-metrics-cache"}
        title={"Metrics Cache"}
      >
        <Readout align={"center"}>
          <ReadoutItem title={"Cache Size"} value={metricsCacheSize} />
          <Button
            clickAction={clearCacheClickAction}
            icon="close"
            label="Clear Metrics Cache"
            tabIndex={30}
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
    pollingInterval: settings.interval, // TODO: Inverval is too vague. Rename
    isPolling: settings.isPolling,
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
