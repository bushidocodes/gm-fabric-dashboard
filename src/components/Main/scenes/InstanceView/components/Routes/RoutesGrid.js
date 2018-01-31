import { PropTypes } from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Table from "components/Main/components/Table";
import TableToolbar from "components/Main/components/TableToolbar";
import ErrorBoundary from "components/ErrorBoundary";
import NotFoundError from "components/Main/components/NotFoundError";

import { getRoutesTable } from "utils/go/selectors";
import withUrlState from "components/withUrlState";

/**
 * Routes Container
 * Parent of RoutesTable and RoutesTableToolbar
 * Contains sort and filter logic for RoutesTable
 * @class RoutesGrid
 * @extends {Component}
 */

class RoutesGrid extends Component {
  static propTypes = {
    routes: PropTypes.array,
    setUrlState: PropTypes.func.isRequired,
    urlState: PropTypes.object.isRequired
  };

  /**
   * Helper function that takes the routes passed as props and sorts according to how sortByAttribute and ascending is set
   * in the url bar.
   * @param {Array} routes
   */
  sort = routes => {
    const {
      ascending = "true",
      sortByAttribute = "route"
    } = this.props.urlState;
    const sortOrder = ascending === "true" ? ["asc"] : ["desc"];

    return _.orderBy(routes, sortByAttribute, sortOrder);
  };

  /**
   * Helper function used internally to either sort by the key if not yet used to sort or toggle ascending / descending
   * if the key is already active.
   * When sorting by latency and error percent and the sortKey is new, set the initial sort order to descending
   * @param {String} newSortByAttribute
   */
  setSortByAttribute = newSortByAttribute => {
    const {
      urlState: { ascending = "true", sortByAttribute = "route" },
      setUrlState
    } = this.props;

    if (sortByAttribute === newSortByAttribute) {
      setUrlState({
        ascending: !JSON.parse(ascending)
      });
    } else if (
      newSortByAttribute === "errorPercent" ||
      newSortByAttribute.includes("latency")
    ) {
      setUrlState({
        sortByAttribute: newSortByAttribute,
        ascending: false
      });
    } else {
      setUrlState({
        sortByAttribute: newSortByAttribute
      });
    }
  };

  render() {
    const {
      setUrlState,
      urlState: { filterString = "", sortByAttribute = "route" },
      routes
    } = this.props;

    if (routes && routes.length > 0) {
      return (
        <Fragment>
          <TableToolbar
            searchInputProps={{
              filterString,
              setFilterString: filterString => setUrlState({ filterString }),
              searchPlaceholder: "Search Routes"
            }}
            sortByProps={{
              sortByOptions: [
                {
                  value: "route",
                  label: "Route"
                },
                {
                  value: "requests",
                  label: "Requests"
                },
                {
                  value: "errorPercent",
                  label: "Error %"
                },
                {
                  value: "latency50",
                  label: "Latency 50%"
                },
                {
                  value: "latency99",
                  label: "Latency 99%"
                }
              ],
              sortByAttribute,
              setSortByAttribute: this.setSortByAttribute
            }}
          />
          <ErrorBoundary>
            <Table
              type={"Route"}
              items={this.sort(
                this.props.routes.filter(
                  routeObj =>
                    routeObj.route
                      .toLowerCase()
                      .indexOf(filterString.trim().toLowerCase()) !== -1
                )
              )}
            />
          </ErrorBoundary>
        </Fragment>
      );
    } else {
      return <NotFoundError errorMsg={"No Routes Found"} />;
    }
  }
}

function mapStateToProps(state) {
  return {
    routes: getRoutesTable(state)
  };
}

export default connect(mapStateToProps)(withUrlState()(RoutesGrid));
