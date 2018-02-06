import Dygraph from "dygraphs";
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
    timeSeries: PropTypes.array.isRequired
  };

  state = {
    options: {}
  };

  componentDidMount() {
    const [data, options] = this.props.timeSeries;
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ options: _.cloneDeep(options) }, () => {
      this.drawChart(this.div, data, this.state.options);
    });
  }

  /**
   * Instruct the existing Dygraph to update when new data is passed in as props or when labels change
   * All other changes in the options object are ignored
   * Also, resize the dygraph every time the component receives props
   * @param {Object} nextProps
   * @memberof DygraphWrapper
   */
  componentWillReceiveProps(nextProps) {
    const [newData, newOptions] = nextProps.timeSeries;
    if (!isEqual(this.state.options, newOptions)) {
      this.setState({ options: _.cloneDeep(newOptions) }, () => {
        this.graph.updateOptions(this.state.options);
      });
    }
    // Just pass the data each time because most renders are due to polling
    this.graph.updateOptions({ file: newData });
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
    options.labelsKMB = _.has(options, "labelsKMB") ? options.labelsKMB : true; // Abbreviate with KMB
    options.strokeWidth = options.strokeWidth || 2.0;
    options.legend = options.legend || "always";
    options.fillGraph = options.fillGraph || "true";
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
