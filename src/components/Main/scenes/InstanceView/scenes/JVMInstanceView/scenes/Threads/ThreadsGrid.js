import { Actions, getState } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { injectIntl } from "react-intl";

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
    intl: PropTypes.object.isRequired,
    selectedInstanceID: PropTypes.string,
    selectedServiceSlug: PropTypes.string,
    setUrlState: PropTypes.func.isRequired,
    threads: PropTypes.array,
    threadsError: PropTypes.object,
    urlState: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      fabricServer,
      selectedServiceSlug,
      selectedInstanceID
    } = this.props;

    // If fabricServer is truthy, we are running with a "Fabric Server" discovery service,
    // so we need to dynamically build the endpoint for the threads API.
    if (fabricServer) {
      const services = getState().fabric.services;
      const { name, version } = services[selectedServiceSlug];
      Actions.fetchAndStoreInstanceThreads(
        `${fabricServer}/threads/${name}/${version}/${selectedInstanceID}`
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
      },
      intl
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
              searchPlaceholder: intl.formatMessage({
                id: "threadsGrid.searchPlaceholder",
                defaultMessage: "Search Threads",
                description: "Search placeholder"
              })
            }}
            sortByProps={{
              sortByOptions: [
                {
                  value: "state",
                  label: intl.formatMessage({
                    id: "threadsGrid.state",
                    defaultMessage: "State",
                    description: "Sort by dropdown option"
                  })
                },
                {
                  value: "name",
                  label: intl.formatMessage({
                    id: "threadsGrid.name",
                    defaultMessage: "Name",
                    description: "Sort by dropdown option"
                  })
                },
                {
                  value: "id",
                  label: intl.formatMessage({
                    id: "threadsGrid.id",
                    defaultMessage: "ID",
                    description: "Sort by dropdown option"
                  })
                }
              ],
              sortByAttribute: sortByAttribute,
              setSortByAttribute: this.setSortByAttribute
            }}
            groupByProps={{
              groupByOptions: [
                {
                  value: "state",
                  label: intl.formatMessage({
                    id: "threadsGrid.state",
                    defaultMessage: "State",
                    description: "Group by dropdown option"
                  })
                },
                {
                  value: "none",
                  label: intl.formatMessage({
                    id: "threadsGrid.none",
                    defaultMessage: "None",
                    description: "Group by dropdown option"
                  })
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
      return (
        <NotFoundError
          errorMsg={intl.formatMessage({
            id: "threadsGrid.errorNotFound",
            defaultMessage: "No Threads Found",
            description: "Error message"
          })}
        />
      );
    } else {
      return (
        <NotFoundError
          errorMsg={intl.formatMessage({
            id: "threadsGrid.errorFetchFail",
            defaultMessage: "Failed to Fetch Threads",
            description: "Error message"
          })}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  const {
    fabric: { selectedServiceSlug, selectedInstanceID },
    instance: { threadsError },
    settings: { fabricServer }
  } = state;
  return {
    fabricServer,
    threads: getVisibleThreads(state),
    threadsError,
    selectedServiceSlug,
    selectedInstanceID
  };
}

export default connect(mapStateToProps)(
  withUrlState()(injectIntl(ThreadsGrid))
);
