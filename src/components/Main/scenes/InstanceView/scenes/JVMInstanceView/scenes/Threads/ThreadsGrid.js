import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import ThreadsTable from "./components/ThreadsTable";

import ErrorBoundary from "components/ErrorBoundary";
import TableToolbar from "components/Main/components/TableToolbar";
import NotFoundError from "components/Main/components/NotFoundError";
import withUrlState from "components/withUrlState";
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
    setUrlState: PropTypes.func.isRequired,
    threads: PropTypes.array,
    threadsError: PropTypes.object,
    urlState: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      fabricServer,
      selectedService,
      selectedServiceVersion,
      selectedInstance
    } = this.props;

    // If fabricServer is truthy, we are running with a "Fabric Server" discovery service,
    // so we need to dynamically build the endpoint for the threads API.
    if (fabricServer) {
      Actions.fetchAndStoreInstanceThreads(
        `${fabricServer}/threads/${selectedService}/${selectedServiceVersion}/${selectedInstance}`
      );
    }
  }

  setSortByAttribute = newSortByAttribute => {
    const {
      urlState: { ascending = "true", sortByAttribute = "id" },
      setUrlState
    } = this.props;
    if (newSortByAttribute === sortByAttribute) {
      setUrlState({
        ascending: !JSON.parse(ascending)
      });
    } else {
      setUrlState({
        sortByAttribute: newSortByAttribute,
        ascending: true
      });
    }
  };

  /**
   * Helper function that takes the threads passed as props
   * and sorts according to how sortByAttribute and ascending
   * are set in the local state object.
   * @param {Array} threads
   */
  sort(threads = []) {
    const { ascending, sortByAttribute = "id" } = this.props.urlState;
    let sortOrder = ascending === "true" ? ["asc"] : ["desc"];
    // thread["id"] is a string, so we need to convert to an int to sort properly
    const sortFunc = thread => {
      return sortByAttribute === "id"
        ? parseInt(thread["id"], 10)
        : thread[sortByAttribute].toLowerCase();
    };
    return _.orderBy(threads, sortFunc, sortOrder);
  }

  render() {
    const {
      setUrlState,
      threads,
      threadsError,
      urlState: {
        filterString = "",
        groupByAttribute = "none",
        sortByAttribute = "id"
      }
    } = this.props;
    const filteredThreads = threads.filter(
      thread =>
        thread.name.toLowerCase().indexOf(filterString.trim().toLowerCase()) !==
        -1
    );

    if (threads && threads.length > 0) {
      return (
        <ErrorBoundary>
          <TableToolbar
            searchInputProps={{
              filterString: filterString,
              setFilterString: filterString => setUrlState({ filterString }),
              searchPlaceholder: "Search Threads"
            }}
            sortByProps={{
              sortByOptions: [
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
              ],
              sortByAttribute: sortByAttribute,
              setSortByAttribute: this.setSortByAttribute
            }}
            groupByProps={{
              groupByOptions: [
                {
                  value: "state",
                  label: "State"
                },
                {
                  value: "none",
                  label: "None"
                }
              ],
              groupByAttribute: groupByAttribute,
              setGroupByAttribute: groupByAttribute =>
                setUrlState({ groupByAttribute })
            }}
          />
          <ThreadsTable
            groupByAttribute={groupByAttribute}
            filteredThreadData={this.sort(filteredThreads)}
          />
        </ErrorBoundary>
      );
    } else if (_.isEmpty(threadsError)) {
      return <NotFoundError errorMsg="No Threads Found" />;
    } else {
      return <NotFoundError errorMsg="Failed to Fetch Threads" />;
    }
  }
}

function mapStateToProps(state) {
  return {
    fabricServer: state.settings.fabricServer,
    threads: getVisibleThreads(state),
    threadsError: state.instance.threadsError,
    selectedService: state.fabric.selectedService,
    selectedServiceVersion: state.fabric.selectedServiceVersion,
    selectedInstance: state.fabric.selectedInstance
  };
}

export default connect(mapStateToProps)(withUrlState()(ThreadsGrid));
