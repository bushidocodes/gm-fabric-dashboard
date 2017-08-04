import Dygraph from "dygraphs/index.es5.js";
import { isEqual } from "lodash";
import { PropTypes } from "prop-types";
import React from "react";

/**
 * Reuseable Dygraph-based Line Chart component for rendering a time series
 *
 * Required Props include title (the string to show at that top of the card) and time series (the data to render).
 * Optional props include any number of detailLines, an array of strings listed below the line chart.
 */
export default class DygraphContainer extends React.Component {
  static propTypes = {
    timeSeries: PropTypes.array.isRequired
  };

  componentDidMount() {
    const [data, options] = this.props.timeSeries;
    this.drawChart(this.div, data, options);
  }

  componentWillReceiveProps(nextProps) {
    const [oldData, oldOptions] = this.props.timeSeries;
    const [newData, newOptions] = nextProps.timeSeries;
    if (!isEqual(oldOptions.labels, newOptions.labels)) {
      this.graph.updateOptions({
        labels: newOptions.labels,
        file: newData
      });
    }
    if (!isEqual(oldData, newData)) {
      this.graph.updateOptions({ file: newData });
    }
    // This is getting called when not needed. Need to determine if Dygraph
    // handles this sufficiently or if we need to call this selectively
    this.graph.resize();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    // Clean up the dygraph
    this.graph.destroy();
    delete this.graph;
  }

  drawChart(elem, data, options) {
    // Dygraph Options
    options.labelsKMB = true; // Abbreviate with KMB
    options.strokeWidth = 2.0; // Abbreviate with KMB
    this.graph = new Dygraph(elem, data, options);
  }

  render() {
    return (
      <div
        className="dygraph-container"
        ref={elem => {
          this.div = elem;
        }}
        style={{ width: "100%", height: "100%", paddingTop: "0px" }}
      />
    );
  }
}
