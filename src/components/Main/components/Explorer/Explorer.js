import _ from "lodash";
import { PropTypes } from "prop-types";
import qs from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import GMLineChart from "../GMLineChart";
import { getDygraphOfValue } from "utils/dygraphs";

import Inspector from "./components/Inspector";
import ViewExplorer from "./components/ViewExplorer";
import MetricsList from "./components/MetricsList";
import MetricsGraphDisplay from "./components/MetricsGraphDisplay";

import ErrorBoundary from "components/ErrorBoundary";
import {
  metricsShape,
  routerHistoryShape,
  routerLocationShape,
  routerMatchShape
} from "components/PropTypes";

/**
 * General purpose component for rendering any arbitrary timeseries data stored in Redux
 * Uses Inspector to search and select keys.
 * @class Explorer
 * @extends {Component}
 */

class Explorer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    history: routerHistoryShape,
    keys: PropTypes.arrayOf(PropTypes.string), // Metrics keys
    location: routerLocationShape,
    match: routerMatchShape,
    metrics: metricsShape
  };

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      lastPushedQueryString: "",
      hideZeroMetric: false,
      hideStaticMetric: false
    };
    // Debounce
    this.debouncedPushHistory = _.debounce(this._pushHistory, 500);
  }

  componentWillMount() {
    this.popAndDecodeHistory(this.props.location.search);
  }

  componentDidMount() {
    this._checkedOnInitialLoad();
  }

  componentWillReceiveProps(nextProps) {
    // We need to check to see if the query string props are the result of user interaction
    // with the search box. We do that by keeping track of the last thing the search box
    // pushed to the query string and filtering out those props. The only exception to this
    // is which the app router action was POP, which means the user hit the back button or
    // otherwise navigated using the client-side router history
    if (
      nextProps.location.search !== `?${this.state.lastPushedQueryString}` ||
      nextProps.history.action === "POP"
    ) {
      this.popAndDecodeHistory(nextProps.location.search);
    }
  }
  /**
   * One time purpose function for initially loading checkboxes 'checked' or nothing.
   * We may be able to get rid of document.querySelector if we restyle the 'checked' tick.
   * @class Explorer
   */
  _checkedOnInitialLoad() {
    // HTML attribute checked means: checked by default, when the page loads.
    // The DOM property checked is actually the current state of the checkbox
    // and is either true/false (exists or doesn't exist <input type=checkbox checked> or <input type=checkbox >),
    // and this will change when the checkbox is clicked, but isn't visible when you inspect the HTML.
    // This can be confusing because setting visible 'checked' attribute
    // on checkbox input fields does not set the actual html checked attribute,
    // but it refers to javascript checked property on the element.
    const { hideZeroMetric, hideStaticMetric } = qs.parse(
      this.props.location.search,
      {
        delimiter: "&"
      }
    );
    // display initial checkbox tick after page loads
    if (hideZeroMetric === "true") {
      const hideZeroInput = document.querySelector(
        'input[name="hideZeroMetric"]'
      );
      hideZeroInput.setAttribute("checked", hideZeroInput.checked);
    }

    if (hideStaticMetric === "true") {
      const hideStaticInput = document.querySelector(
        'input[name="hideStaticMetric"]'
      );
      hideStaticInput.setAttribute("checked", hideStaticInput.checked);
    }
  }

  /**
   * popAndDecodeHistory is used to decode and pull local state from the browser's query string
   * @memberof Explorer
   */
  popAndDecodeHistory = queryString => {
    // Parse the query string for the searchQuery parameter
    const { searchQuery = "", hideZeroMetric, hideStaticMetric } = qs.parse(
      queryString
    );
    // Update local state if needed
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery });
    }
    // hideZero and hideStatic params are string values of "true" or "false"
    // so it's necessary to check string value "true" manually instead of a boolean check
    hideZeroMetric === "true"
      ? this.setState({ hideZeroMetric: true })
      : this.setState({ hideZeroMetric: false });
    hideStaticMetric === "true"
      ? this.setState({ hideStaticMetric: true })
      : this.setState({ hideStaticMetric: false });
  };

  /**
   * encodeAndPushHistory encodes local state as a query string and invokes the debounced
   * version of _pushHistory to periodically write to browser history.
   * @param {string} newSearchQuery
   * @memberof Explorer
   */
  encodeAndPushHistory = newSearchQueryObj => {
    // Parse the current query parameters
    const currentParamsObj = qs.parse(this.props.location.search, {
      delimiter: "&"
    });

    // dynamically generate key:value pair from newSearchQueryObj, without prespecified key value
    let newKey = _.keys(newSearchQueryObj)[0];
    let newValue = _.values(newSearchQueryObj)[0];
    const newQueryStringObj = {};
    newQueryStringObj[newKey] = newValue;

    // retain existing params obj and overwrite/add new query obj
    // Technically the selected metric might not be in the filtered search results
    // but it would likely be jarring to deselect and unmount the graph
    const newParamsString = qs.stringify(
      _.merge(currentParamsObj, newQueryStringObj)
    );
    // push to router
    this.debouncedPushHistory(newParamsString);
  };

  /**
   * _pushHistory is used to push local state to the browser's query string. This function is not
   * called directly but via encodeAndPushHistory, which uses lodash's debounce to prevent individual
   * key strokes from polluting the browser history API.
   * @param {string} queryString
   * @memberof Explorer
   */
  _pushHistory = queryString => {
    // Save a query string to local state as lastPushedQueryString to prevent
    // accidental overwriting of user entry and then push the query string
    // to the browser history
    this.setState({ lastPushedQueryString: queryString }, () => {
      this.props.history.push({
        search: queryString
      });
    });
  };

  /**
   * onChange function invoked by Inspector when user checks one of the filter checkboxes below the search bar
   * reads the name attribute on input field and updates state with the name
   * @param {event}
   */
  onChange = (checked, name) => {
    var newFilterObj = {};
    newFilterObj[name] = checked;
    // no curly brackets, pass as object
    this.setState(newFilterObj, () => {
      this.encodeAndPushHistory(newFilterObj);
    });
  };

  /**
   * Search function invoked by Inspector when user searches in the search bar
   * This is debounced inside of Inspector
   * @param {string} q - search query
   */
  // pass object to encodeAndPushHistory
  onSearch = searchQuery => {
    this.setState({ searchQuery }, () => {
      this.encodeAndPushHistory({ searchQuery });
    });
  };

  /**
   * click handler for selecting an Item in the Inspector component
   * @param {Object} clicked
   * @memberof Explorer
   */
  onClick = rawMetricsKey => {
    // Escape the slashed to avoid confusing the router
    const escapedMetricsPath = rawMetricsKey.replace(/\//g, "%2F");
    this._appendToQueryString({ selectedMetric: escapedMetricsPath });
  };

  /**
   * Takes a object with key value pairs and adds/updates them on the query string
   * @param {Object} payload
   * @memberof Explorer
   */
  _appendToQueryString = payload => {
    // Parse the current query parameters
    const query = qs.parse(this.props.location.search);
    // Generate the new query string object
    const newQuery = qs.stringify({
      ...query,
      ...payload
    });
    // Push the new state to the router
    this.props.history.push({
      search: newQuery
    });
  };

  /**
   * Takes key object and metrics object and filter them on hide features
   * @param {Object}
   * @memberof Explorer
   */
  hideKeys = (rawKeys, metrics) => {
    const { hideZeroMetric, hideStaticMetric } = this.state;
    // Filter out the timestamps key, which does not point to valid timeseries
    // data but instead provides information about the range of time expressed
    const keys = rawKeys.filter(key => key !== "timestamps");

    // return original keys if hide features are turned off
    if (!hideZeroMetric && !hideStaticMetric) {
      return keys;
    } else if (hideStaticMetric) {
      // static filter is more inclusive than zero filter
      return keys.filter(key => {
        // Get the values associated with a key and only return if
        // there is more than one unique value
        const valuesOfKey = _.values(metrics[key]);
        return _.uniq(valuesOfKey).length > 1;
      });
    } else if (hideZeroMetric) {
      return keys.filter(key => {
        return !_.values(metrics[key]).every(val => val === 0);
      });
    } else return null;
  };

  render() {
    const { location, metrics } = this.props;
    let { keys } = this.props;
    const query = qs.parse(location.search);
    const selectedMetric = query.selectedMetric
      ? query.selectedMetric.replace(/%2F/g, "/")
      : undefined;
    const { searchQuery, hideZeroMetric, hideStaticMetric } = this.state;

    // filter keys if hide filter is on
    const filteredKeys = this.hideKeys(keys, metrics);

    return (
      <ErrorBoundary>
        <ViewExplorer>
          <MetricsList>
            <Inspector
              data={filteredKeys}
              hideZeroMetric={hideZeroMetric}
              hideStaticMetric={hideStaticMetric}
              onClick={this.onClick}
              onChange={this.onChange}
              onSearch={this.onSearch}
              searchQuery={searchQuery}
              selectedMetric={selectedMetric}
              tabIndex={0}
            />
          </MetricsList>
          <MetricsGraphDisplay>
            {selectedMetric &&
            this.props.keys.indexOf(selectedMetric) !== -1 ? (
              <GMLineChart
                height={"normal"}
                timeSeries={getDygraphOfValue(metrics, [selectedMetric])}
                title={selectedMetric}
              />
            ) : (
              <p>Select a metric to display</p>
            )}
          </MetricsGraphDisplay>
        </ViewExplorer>
      </ErrorBoundary>
    );
  }
}

function mapStateToProps({ instance: { metrics } }) {
  return {
    metrics,
    keys: Object.keys(metrics).sort()
  };
}

export default connect(mapStateToProps)(Explorer);
