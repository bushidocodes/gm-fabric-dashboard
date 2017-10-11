import _ from "lodash";
import { PropTypes } from "prop-types";
import qs from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Inspector from "./Inspector";
import GMLineChart from "./library/GMLineChart";

import { getDygraphOfValue } from "../utils/dygraphs";
import { contrastColor, spacingScale } from "../style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "../style/styleVariables";

const ViewExplorer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 ${spacingScale(2)} ${spacingScale(2)};
  height: 100%;
  @media all and (min-width: 1200px) {
    flex-direction: row;
  }
`;

const MetricsList = styled.div`
  background-color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.04).string()};
  flex: 0 0 300px;
  position: relative;
  margin-bottom: ${spacingScale(2)};
  @media all and (min-width: 1200px) {
    flex: 0 0 40%;
    margin-right: ${spacingScale(2)};
    margin-bottom: 0;
  }
`;

const MetricsGraphDisplay = styled.div`
  background-color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.04).string()};
  flex: 1 1 100%;
  position: relative;
  @media all and (min-width: 1200px) {
    flex: 0 0 60%;
  }
  .chart {
    display: flex;
    align-items: stretch;
    .chart-title {
      flex: 0 0 auto;
    }
    .chart-content {
      flex: 1 1 100%;
      position: relative;
    }
  }
  > * {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: spacingScale(2);
    h3 {
      flex: 0 0 auto;
      word-break: break-all;
      white-space: normal;
      max-width: 100%;
      text-overflow: ellipsis;
      margin: spacingScale(1);
    }
  }
  p {
    text-align: center;
    opacity: 0.8;
    flex: 1 1 100%;
  }
`;

/**
 * General purpose component for rendering any arbitrary timeseries data stored in Redux
 * Uses Inspector to search and select keys.
 * @class Explorer
 * @extends {Component}
 */
class Explorer extends Component {
  static propTypes = {
    history: PropTypes.object,
    keys: PropTypes.array,
    location: PropTypes.object,
    match: PropTypes.object,
    metrics: PropTypes.object
  };

  shouldComponentUpdate(nextProps) {
    const { selection } = qs.parse(this.props.location.search);
    // Update If the keys are different in metrics
    if (!_.isEqual(nextProps.keys, this.props.keys)) {
      return true;
      // Or if the query string has changed at all
    } else if (this.props.location.search !== nextProps.location.search) {
      return true;
      // Or if the current metrics object doesn't have the select metric for some reason
    } else if (selection && !this.props.metrics[selection]) {
      return true;
      // Or if the selected metrics now has more timeseries metrics due to polling
    } else if (
      selection &&
      Object.keys(this.props.metrics[selection]).length !==
        Object.keys(nextProps.metrics[selection]).length
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Search function invoked by Inspector when user searches in the search bar
   * This is debounced inside of Inspector
   * @param {string} q - search query
   */
  onSearch(q) {
    // Parse the current query parameters
    const query = qs.parse(this.props.location.search);
    // update with the new search query
    const newQuery = qs.stringify({
      ...query,
      searchQuery: q.trim().toLowerCase()
    });
    // and push to router
    this.props.history.push({
      pathname: this.props.match.url,
      search: newQuery
    });
  }

  /**
   * click handler for selecting an Item in the Inspector component
   * @param {Object} clicked
   * @memberof Explorer
   */
  onClick(clicked) {
    // Parse the current query parameters
    const query = qs.parse(this.props.location.search);
    // Escape the slashed to avoid confusing the router
    const escapedMetricsPath = clicked.innerText.replace(/\//g, "%2F");
    // Generate the new query string object
    const newQuery = qs.stringify({
      ...query,
      selectedMetric: escapedMetricsPath
    });
    // Push the new state to the router
    this.props.history.push({
      pathname: this.props.match.url,
      search: newQuery
    });
  }

  render() {
    const { keys, location, metrics } = this.props;
    const query = qs.parse(location.search);
    const selectedMetric = query.selectedMetric
      ? query.selectedMetric.replace(/%2F/g, "/")
      : undefined;
    return (
      <ViewExplorer>
        <MetricsList>
          <Inspector
            data={keys}
            onClick={this.onClick.bind(this)}
            onSearch={this.onSearch.bind(this)}
            searchQuery={query.searchQuery || ""}
            selectedMetric={selectedMetric}
            tabIndex={0}
          />
        </MetricsList>
        <MetricsGraphDisplay>
          {selectedMetric && this.props.keys.indexOf(selectedMetric) !== -1 ? (
            <GMLineChart
              height={"max"}
              timeSeries={getDygraphOfValue(metrics, [selectedMetric])}
              title={selectedMetric}
            />
          ) : (
            <p>Select a metric to display</p>
          )}
        </MetricsGraphDisplay>
      </ViewExplorer>
    );
  }
}

function mapStateToProps({ metrics }) {
  return {
    metrics,
    keys: Object.keys(metrics).sort()
  };
}

export default connect(mapStateToProps)(Explorer);
