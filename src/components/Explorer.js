import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import GMLineChart from "./GMLineChart";
import Inspector from "./Inspector";
import { getDygraphOfValue } from "../utils/dygraphs";
import qs from "query-string";

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
      <div className="view-explorer">
        <div className="metrics-list">
          <Inspector
            data={keys}
            onClick={this.onClick.bind(this)}
            onSearch={this.onSearch.bind(this)}
            searchQuery={query.searchQuery || ""}
            selectedMetric={selectedMetric}
            tabIndex={20}
          />
        </div>
        <div className="metrics-graph-display">
          {selectedMetric && this.props.keys.indexOf(selectedMetric) !== -1
            ? <GMLineChart
                height={"max"}
                timeSeries={getDygraphOfValue(metrics, [selectedMetric])}
                title={selectedMetric}
              />
            : <p>Select a metric to display</p>}
        </div>
      </div>
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
