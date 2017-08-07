import _ from "lodash";
import ms from "ms";
import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { getLatestAttribute, parseJSONString } from "../utils/latestAttribute";
import { getServicename } from "../utils/head";
import {
  getSparkLineOfValue,
  getSparkLineOfNetChange
} from "../utils/sparklines";
import SummaryBarCard from "./SummaryBarCard";

SummaryBar.propTypes = {
  dashboards: PropTypes.object.isRequired,
  interval: PropTypes.number.isRequired,
  metrics: PropTypes.object.isRequired,
  runtime: PropTypes.string
};

function SummaryBar({ dashboards, metrics, interval, runtime }) {
  return (
    <div className="summary-bar">
      <div className="nav-widget">
        <a className="nav-go-up">
          <span
            className="icon"
            data-uk-icon={`icon: chevron-left; ratio: 1`}
          />
          <span className="label">
            {getServicename()}
          </span>
        </a>
        <a className="nav-siblings">
          <span className="label">
            {"Instance 1"}
          </span>
          <span
            className="icon"
            data-uk-icon={`icon: triangle-down; ratio: 1`}
          />
        </a>
        <div
          className="nav-siblings-dropdown"
          data-uk-dropdown="mode: click; pos: bottom-justify; boundary: .nav-widget; boundary-align: true; offset: 1;"
        >
          <ol className="instances">
            {Array(15).fill("shanberg").map((val, idx) =>
              <li key={idx}>
                <Link to="">
                  Instance {idx + 1}
                </Link>
              </li>
            )}
          </ol>
        </div>
      </div>

      {runtime === "JVM" &&
        <SummaryBarCard
          href="/summary"
          lines={[
            {
              name: "Uptime",
              value: ms(getLatestAttribute(metrics, "jvm/uptime"))
            }
          ]}
          tabIndex={1}
          title="Summary"
        />}
      {runtime === "JVM" &&
        <SummaryBarCard href="/route" tabIndex={3} title="Routes" />}
      {runtime === "JVM" &&
        <SummaryBarCard
          chartData={getSparkLineOfValue(metrics, "jvm/thread/count")}
          href="/threads"
          lines={[
            {
              name: "# Threads",
              value: getLatestAttribute(metrics, "jvm/thread/count")
            }
          ]}
          tabIndex={4}
          title="Threads"
        />}
      {_.toPairs(dashboards).map(([key, value]) => {
        const hasValidChart = _.has(value, "summaryCard.chart.type"); // && _.has(dashboard, 'summaryCard.chart.dataAttribute')
        const lines = value.summaryCard.lines.map(line => ({
          name: line.name,
          value: parseJSONString(line.value, metrics)
        }));
        let chartData, chartTitle;
        if (hasValidChart && value.summaryCard.chart.type === "value") {
          chartTitle = value.summaryCard.chart.title;
          chartData = getSparkLineOfValue(
            metrics,
            value.summaryCard.chart.dataAttribute
          );
        } else if (
          hasValidChart &&
          value.summaryCard.chart.type === "netChange"
        ) {
          chartTitle = value.summaryCard.chart.title;
          chartData = getSparkLineOfNetChange(
            metrics,
            value.summaryCard.chart.dataAttribute
          );
        } else {
          chartTitle = undefined;
          chartData = undefined;
        }
        return (
          <SummaryBarCard
            chartData={chartData}
            chartTitle={chartTitle}
            href={`/dashboard/${key}`}
            icon={value.summaryCard.icon}
            key={`/dashboard/${key}`}
            lines={lines}
            tabIndex={9}
            title={value.name}
          />
        );
      })}
      <SummaryBarCard href={`/explorer`} tabIndex={8} title="Explorer" />
    </div>
  );
}

function mapStateToProps({
  dashboards,
  metrics,
  settings: { interval, runtime }
}) {
  return { dashboards, metrics, interval, runtime };
}

export default withRouter(connect(mapStateToProps)(SummaryBar));
