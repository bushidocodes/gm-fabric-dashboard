import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import Inspector from "react-json-inspector";
import { connect } from "react-redux";

import GMLineChart from "./GMLineChart";
import { getDygraphOfValue } from "../utils/dygraphs";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

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
      <div>
        <ResponsiveReactGridLayout
          breakpoints={{ lg: 1200, md: 996, sm: 768 }}
          cols={{ lg: 12, md: 8, sm: 4 }}
          isDraggable={false}
          isResizable={false}
          rowHeight={60}
        >
          <div
            data-grid={{ x: 0, y: 0, w: 4, h: 11, minW: 3, minH: 4 }}
            key="tree"
            style={{
              overflow: "scroll"
            }}
          >
            <Inspector
              data={this.state.headers}
              onClick={clicked =>
                this.setState({ selectedMetrics: clicked.value })}
              tabIndex={20}
            />
          </div>
          <div
            data-grid={{ x: 4, y: 0, w: 8, h: 11, minW: 3, minH: 4 }}
            key="graph"
            style={{
              overflow: "hidden"
            }}
          >
            {this.state.selectedMetrics !== ""
              ? <GMLineChart
                  timeSeries={getDygraphOfValue(metrics, [
                    this.state.selectedMetrics
                  ])}
                  title={this.state.selectedMetrics}
                />
              : <h2>Select a metric</h2>}
          </div>
        </ResponsiveReactGridLayout>
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
