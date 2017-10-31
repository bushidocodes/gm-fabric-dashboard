import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import RoutesTable from "./components/RoutesTable";
import RoutesTableToolbar from "./components/RoutesTableToolbar";

import { getRoutesTable } from "utils/go/selectors";
import ErrorBoundary from "components/library/ErrorBoundary";

import NotFoundError from "components/Main/components/NotFoundError";

/**
 * Go Routes Container
 * Parent of RoutesTable and RoutesTableToolbar
 * Contains sort and filter logic for RoutesTable
 * @class RoutesGrid
 * @extends {Component}
 */
class RoutesGrid extends Component {
  static propTypes = {
    routes: PropTypes.array
  };

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
   * @param {String} keyToSortBy
   */
  setKeyToSortBy(keyToSortBy) {
    if (this.state.keyToSortBy === keyToSortBy) {
      this.setState({ ascending: !this.state.ascending });
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
          <RoutesTableToolbar
            filterString={this.state.filterString}
            setFilterString={this.setFilterString}
            keyToSortBy={this.state.keyToSortBy}
            setKeyToSortBy={this.setKeyToSortBy}
          />
          <ErrorBoundary>
            <RoutesTable
              routes={this.sort(
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
