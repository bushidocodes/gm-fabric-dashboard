import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import TableToolbar from "components/Main/components/TableToolbar";
import Table from "components/Main/components/Table";
import ErrorBoundary from "components/ErrorBoundary";
import { getRoutesTable } from "utils/jvm/selectors";
import NotFoundError from "components/Main/components/NotFoundError";

/**
 * Parent container of RoutesTable and RoutesTableToolbar
 * Contains sort and filter logic for RoutesTable
 * @class RoutesGrid
 * @extends {Component}
 */
class RoutesGrid extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  };

  // Options for sort dropdown rendered in TableToolbar
  static sortByOptions = [
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
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      filterString: "",
      keyToSortBy: "route",
      ascending: true
    };
    this.sort = this.sort.bind(this);
    this.setKeyToSortBy = this.setKeyToSortBy.bind(this);
  }

  /**
   * Helper function that takes the routes passed as props and sorts according to how keyToSortBy and ascending is set
   * in the local state object.
   * @param {Array} routes
   */
  sort(routes) {
    const { keyToSortBy, ascending } = this.state;
    return routes.sort((a, b) => {
      if (a[keyToSortBy] > b[keyToSortBy]) {
        return ascending ? 1 : -1;
      } else if (a[keyToSortBy] < b[keyToSortBy]) {
        return ascending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

  /**
   * Helper function used internally to either sort by the key if not yet used to sort or toggle ascending / descending
   * if the key is already active.
   * When sorting by latency and error percent and the sortKey is new, set the initial sort order to descending
   * @param {String} keyToSortBy
   */
  setKeyToSortBy(keyToSortBy) {
    if (this.state.keyToSortBy === keyToSortBy) {
      this.setState({ ascending: !this.state.ascending });
    } else if (
      keyToSortBy === "errorPercent" ||
      keyToSortBy.includes("latency")
    ) {
      this.setState({
        ascending: false,
        keyToSortBy
      });
    } else {
      this.setState({
        keyToSortBy
      });
    }
  }

  setFilterString = filterString => this.setState({ filterString });

  render() {
    if (this.props.routes && this.props.routes.length > 0) {
      return (
        <div>
          {
            <TableToolbar
              searchInputProps={{
                filterString: this.state.filterString,
                setFilterString: this.setFilterString,
                searchPlaceholder: "Search Routes"
              }}
              sortByProps={{
                sortByOptions: RoutesGrid.sortByOptions,
                sortByAttribute: this.state.keyToSortBy,
                setSortByAttribute: this.setKeyToSortBy
              }}
            />
          }
          <ErrorBoundary>
            <Table
              type={"Route"}
              items={this.sort(
                this.props.routes.filter(
                  routeObj =>
                    routeObj.route
                      .toLowerCase()
                      .indexOf(this.state.filterString.trim().toLowerCase()) !==
                    -1
                )
              )}
            />
          </ErrorBoundary>
        </div>
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

export default connect(mapStateToProps)(RoutesGrid);
