import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Readout from "./Readout.js";
import Button from "./Button.js";
import ReadoutItem from "./ReadoutItem.js";
import UIkit from "uikit";
import objectSizeOf from "object-sizeof";
import filesize from "filesize";

import LayoutSection from "./LayoutSection";
import PollingSettings from "./PollingSettings";
import "react-input-range/lib/css/index.css";

SettingsGrid.propTypes = {
  metricsCacheSize: PropTypes.string,
  numberOfDashboards: PropTypes.number,
  settings: PropTypes.object
};

const clearCacheClickAction = () => {
  UIkit.modal
    .confirm(
      "Are you sure that you want to clear the cached metrics data? This action cannot be undone."
    )
    .then(() => Actions.clearMetrics());
};

const resetDashboardsClickAction = () => {
  UIkit.modal
    .confirm(
      "Are you sure that you want to clear dashboard state? This will revert all dashboards to default."
    )
    .then(() => Actions.setDashboardsToDefault());
};

function SettingsGrid({ metricsCacheSize, numberOfDashboards, settings }) {
  return (
    <div className="view-app-settings settings-grid">
      <PollingSettings
        interval={settings.interval}
        isPolling={settings.isPolling}
      />

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
    </div>
  );
}

function mapStateToProps({ settings, dashboards, metrics }) {
  return {
    settings,
    numberOfDashboards: Object.keys(dashboards).length,
    metricsCacheSize: filesize(objectSizeOf(metrics))
  };
}

export default connect(mapStateToProps)(SettingsGrid);
