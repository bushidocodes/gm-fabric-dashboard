import Dygraph from "dygraphs/index.es5.js";
import { isEqual } from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import _ from "lodash";

import DygraphContainer from "./components/DygraphContainer";

/**
 * Reuseable Dygraph-based Line Chart component for rendering time series data
 *
 * Required Props include title (the string to show at that top of the card) and time series (the data to render).
 *
 * Optional props include detailLines, an array of strings listed below the line chart.
 *
 * @export
 * @class DygraphWrapper
 * @extends {React.Component}
 */
export default class DygraphWrapper extends React.Component {
  static propTypes = {
    height: PropTypes.number,
    timeSeries: PropTypes.array.isRequired
  };

  componentDidMount() {
    const [data, options] = this.props.timeSeries;
    options.height = this.props.height;
    this.drawChart(this.div, data, options);
  }

  /**
   * Instruct the existing Dygraph to update when new data is passed in as props or when labels change
   * All other changes in the options object are ignored
   * Also, resize the dygraph every time the component receives props
   * @param {Object} nextProps
   * @memberof DygraphWrapper
   */
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

  /** Block React from ever updating and use Dygraph methods to update the physical DOM */
  shouldComponentUpdate() {
    return false;
  }

  /** Clean up when the component unmounts */
  componentWillUnmount() {
    this.graph.destroy();
    delete this.graph;
  }

  /**
   * Renders a dygraph to a physical DOM node
   *
   * @param {any} elem - Physical DOM node where the Dygraph should render
   * @param {any} data - Timeseries data powering the Dygraph
   * @param {any} options - Various options for how a Dygraph should look at feel.
   * @memberof DygraphWrapper
   */
  drawChart(elem, data, options) {
    // Default Dygraph Options
    options.height = options.height || 200;
    options.labelsKMB = _.has(options, "labelsKMB") ? options.labelsKMB : true; // Abbreviate with KMB
    options.strokeWidth = options.strokeWidth || 2.0;
    options.legend = options.legend || "always";
    options.axisLineColor = options.axisLineColor || "rgb(200, 200, 200)";
    options.gridLineColor = options.gridLineColor || "rgb(200, 200, 200)";
    options.colors = options.colors || ["#0aab2a", "#002e6e", "#FF5733"];
    options.gridLinePattern = options.gridLinePattern || [1, 3];
    options.animatedZooms = _.has(options, "animatedZooms")
      ? options.animatedZooms
      : true;
    options.drawAxesAtZero = _.has(options, "drawAxesAtZero")
      ? options.drawAxesAtZero
      : true;
    options.labelsSeparateLines = _.has(options, "labelsSeparateLines")
      ? options.labelsSeparateLines
      : true;
    options.includeZero = _.has(options, "includeZero")
      ? options.includeZero
      : true;
    this.graph = new Dygraph(elem, data, options);
  }

  render() {
    return (
      <DygraphContainer
        innerRef={elem => {
          this.div = elem;
        }}
      />
    );
  }
}
