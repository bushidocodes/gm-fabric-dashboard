import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import qs from "query-string";

import ThreadsTable from "./components/ThreadsTable";
import TableToolbar from "components/Main/components/TableToolbar";
import ErrorBoundary from "components/ErrorBoundary";

// Importing external deps from src as WebPack Modules directory
import { getVisibleThreads } from "utils/jvm/selectors";
import {
  routerHistoryShape,
  routerLocationShape,
  routerMatchShape
} from "components/PropTypes";

/**
 * Parent container of ThreadsTable and TableToolbar
 * @class ThreadsGrid
 * @extends {Component}
 */
class ThreadsGrid extends Component {
  static propTypes = {
    fabricServer: PropTypes.string,
    history: routerHistoryShape,
    location: routerLocationShape,
    match: routerMatchShape,
    selectedInstance: PropTypes.string,
    selectedService: PropTypes.string,
    selectedServiceVersion: PropTypes.string,
    threads: PropTypes.array,
    threadsEndpoint: PropTypes.string
  };

  // Options for sort dropdown rendered in TableToolbar
  static sortByOptions = [
    {
      value: "state",
      label: "State"
    },
    {
      value: "name",
      label: "Name"
    },
    {
      value: "id",
      label: "ID"
    }
  ];

  static groupByOptions = [
    {
      value: "state",
      label: "State"
    },
    {
      value: "none",
      label: "None"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      filterString: "",
      lastPushedFilterString: "",
      groupByAttribute: "none",
      sortByAttribute: "id",
      ascending: true
    };
    // Debounce
    this.debouncedPushHistory = _.debounce(this._pushHistory, 500);
  }

  componentWillMount() {
    this.popAndDecodeHistory(this.props.location.search);
  }

  componentDidMount() {
    const {
      fabricServer,
      selectedService,
      selectedServiceVersion,
      selectedInstance,
      threadsEndpoint
    } = this.props;

    // If fabricServer is truthy, we are running with a "Fabric Server" discovery service,
    // so we need to dynamically build the endpoint for the threads API. If falsy, we can just
    // pull the static configuration value from Redux via threadsEndpoint.
    // Technically Actions.fetchThreads defaults to the static threadsEndpoint, so this is
    // redundant, but we are showing it here just to be more explicit about the logic.

    if (this.props.fabricServer) {
      Actions.fetchAndStoreInstanceThreads(
        `${fabricServer}/threads/${selectedService}/${selectedServiceVersion}/${
          selectedInstance
        }`
      );
    } else {
      Actions.fetchAndStoreInstanceThreads(threadsEndpoint);
    }
  }

  componentWillReceiveProps(nextProps) {
    // We need to check to see if the query string props are the result of user interaction
    // with the search box. We do that by keeping track of the last thing the search box
    // pushed to the query string and filtering out those props. The only expection to this
    // is which the app router action was POP, which means the user hit the back button or
    // otherwise navigated using the client-side router history
    if (
      nextProps.location.search !== `?${this.state.lastPushedQueryString}` ||
      nextProps.history.action === "POP"
    ) {
      this.popAndDecodeHistory(nextProps.location.search);
    }
  }

  setFilterString = filterString =>
    this.setState({ filterString }, () => {
      this.encodeAndPushHistory();
    });

  setSortByAttribute = sortByAttribute => {
    if (sortByAttribute === this.state.sortByAttribute) {
      this.setState({ ascending: !this.state.ascending }, () => {
        this.encodeAndPushHistory();
      });
    } else {
      this.setState({ sortByAttribute }, () => {
        this.encodeAndPushHistory();
      });
    }
  };

  setGroupByAttribute = groupByAttribute =>
    this.setState({ groupByAttribute }, () => {
      this.encodeAndPushHistory();
    });

  /**
   * encodeAndPushHistory encodes local state as a query string and invokes the debounced
   * version of _pushHistory to periodically write to browser history.
   *
   * @memberof ThreadsGrid
   */
  encodeAndPushHistory = () => {
    // Clean local state
    const filterString = this.state.filterString.trim().toLowerCase();
    const groupBy = this.state.groupByAttribute;
    const sortBy = this.state.sortByAttribute;
    // Only encode the truthy pieces of local state into a form ready to be pushed to the
    // browser's query string. If no local state is truthy, call debouncedPushHistory without
    // an argument to remove the search query from the URL.
    let objToEncode = {};

    if (filterString) {
      objToEncode.filterString = filterString;
    }

    // If sortBy or groupBy are set to anything but the defaults,
    // then push to the query string
    if (sortBy !== "id") {
      objToEncode.sortBy = sortBy;
    }
    if (groupBy !== "none") {
      objToEncode.groupBy = groupBy;
    }

    this.debouncedPushHistory(qs.stringify(objToEncode));
  };

  /**
   * _pushHistory is used to push local state to the browser's query string. This function is not
   * called directly but via encodeAndPushHistory, which uses lodash's debounce to prevent individual
   * key strokes from polluting the browser history API.
   * @memberof ThreadsGrid
   */
  _pushHistory = filterString => {
    // Save a query string to local state as lastPushedFilterString to prevent
    // accidental overwriting of user entry and then push the query string
    // to the browser history
    this.setState({ lastPushedFilterString: filterString }, () => {
      this.props.history.push({
        pathname: this.props.match.url,
        search: filterString
      });
    });
  };

  /**
   * popAndDecodeHistory is used to decode and pull local state from the browser's query string
   * @memberof ThreadsGrid
   */
  popAndDecodeHistory = queryString => {
    // Parse the query string for the filterString parameter
    const { filterString = "", groupBy = "none", sortBy = "id" } = qs.parse(
      queryString
    );

    this.setState({
      filterString,
      groupByAttribute: groupBy,
      sortByAttribute: sortBy
    });
  };

  /**
   * Helper function that takes the threads passed as props
   * and sorts according to how sortByAttribute and ascending
   * are set in the local state object.
   * @param {Array} threads
   * @memberof ThreadsGrid
   */
  sort = threads => {
    const { sortByAttribute, ascending } = this.state;
    const sortOrder = ascending ? ["asc"] : ["desc"];
    // thread["id"] is a string, so we need to convert to an int to sort properly
    const sortFunc = thread => {
      return sortByAttribute === "id"
        ? parseInt(thread["id"], 10)
        : thread[sortByAttribute].toLowerCase();
    };
    return _.orderBy(threads, sortFunc, sortOrder);
  };

  render() {
    const { threads } = this.props;
    const filteredThreads = threads.filter(
      thread =>
        thread.name
          .toLowerCase()
          .indexOf(this.state.filterString.trim().toLowerCase()) !== -1
    );

    return (
      <div>
        <ErrorBoundary>
          <TableToolbar
            searchInputProps={{
              filterString: this.state.filterString,
              setFilterString: this.setFilterString,
              searchPlaceholder: "Search Threads"
            }}
            sortByProps={{
              sortByOptions: ThreadsGrid.sortByOptions,
              sortByAttribute: this.state.sortByAttribute,
              setSortByAttribute: this.setSortByAttribute
            }}
            groupByProps={{
              groupByOptions: ThreadsGrid.groupByOptions,
              groupByAttribute: this.state.groupByAttribute,
              setGroupByAttribute: this.setGroupByAttribute
            }}
          />
          <ThreadsTable
            groupByAttribute={this.state.groupByAttribute}
            filteredThreadData={this.sort(filteredThreads)}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fabricServer: state.settings.fabricServer,
    threads: getVisibleThreads(state),
    threadsEndpoint: state.settings.threadsEndpoint,
    selectedService: state.fabric.selectedService,
    selectedServiceVersion: state.fabric.selectedServiceVersion,
    selectedInstance: state.fabric.selectedInstance
  };
}

export default connect(mapStateToProps)(ThreadsGrid);
