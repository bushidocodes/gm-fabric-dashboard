import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import ThreadsTable from "./components/ThreadsTable";
import TableToolbar from "components/Main/components/TableToolbar";

import ErrorBoundary from "components/ErrorBoundary";

// Importing external deps from src as WebPack Modules directory
import { getVisibleThreads } from "utils/jvm/selectors";

/**
 * Parent container of ThreadsTable and TableToolbar
 * @class ThreadsGrid
 * @extends {Component}
 */
class ThreadsGrid extends Component {
  static propTypes = {
    fabricServer: PropTypes.string,
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
      groupByAttribute: "none",
      sortByAttribute: "id",
      ascending: true
    };
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
        `${fabricServer}/threads/${selectedService}/${selectedServiceVersion}/${selectedInstance}`
      );
    } else {
      Actions.fetchAndStoreInstanceThreads(threadsEndpoint);
    }
  }

  /**
   * Helper function that takes the threads passed as props
   * and sorts according to how sortByAttribute and ascending
   * are set in the local state object.
   * @param {Array} threads
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

  setFilterString = filterString => this.setState({ filterString });

  setSortByAttribute = sortByAttribute => {
    if (sortByAttribute === this.state.sortByAttribute) {
      this.setState({ ascending: !this.state.ascending });
    } else {
      this.setState({ sortByAttribute });
    }
  };

  setGroupByAttribute = groupByAttribute => this.setState({ groupByAttribute });

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
