import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Inspector from "react-json-inspector";
import { connect } from "react-redux";

import GMLineChart from "./GMLineChart";
import { getDygraphOfValue } from "../utils/dygraphs";

class Explorer extends Component {
  static propTypes = {
    keys: PropTypes.array,
    metrics: PropTypes.object
  };

  state = {
    selectedMetrics: "",
    headers: []
  };

  componentWillMount() {
    this.setState({ headers: this.props.keys.sort() });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.keys, this.props.keys)) {
      this.setState({ headers: nextProps.keys.sort() });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Update If the keys are different in metrics
    if (!_.isEqual(nextState.headers, this.state.headers)) {
      return true;
      // Or if the selected object has changed
    } else if (this.state.selectedMetrics !== nextState.selectedMetrics) {
      return true;
      // Or if the current metrics object doesn't have the select metric for some reason
    } else if (!this.props.metrics[this.state.selectedMetrics]) {
      return true;
      // Or if the selected metrics now has more timeseries metrics due to polling
    } else if (
      Object.keys(this.props.metrics[this.state.selectedMetrics]).length !==
      Object.keys(nextProps.metrics[this.state.selectedMetrics]).length
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { metrics } = this.props;
    return (
      <div className="view-explorer">
        <div className="metrics-list">
          <Inspector
            data={this.state.headers}
            onClick={clicked =>
              this.setState({ selectedMetrics: clicked.value })}
            tabIndex={20}
          />
        </div>
        <div className="metrics-graph-display">
          {this.state.selectedMetrics !== ""
            ? <GMLineChart
                timeSeries={getDygraphOfValue(metrics, [
                  this.state.selectedMetrics
                ])}
                title={this.state.selectedMetrics}
              />
            : <p>Select a metric to display</p>}
        </div>
      </div>
    );
  }
}

// TODO: Only pass in the selected metrics objects, not the entire metrics stores
// This should reduce renders
function mapStateToProps({ metrics }) {
  return {
    metrics,
    keys: Object.keys(metrics)
  };
}

export default connect(mapStateToProps)(Explorer);
