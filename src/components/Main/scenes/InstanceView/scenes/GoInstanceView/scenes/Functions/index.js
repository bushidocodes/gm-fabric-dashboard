import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import FunctionsTable from "./components/FunctionsTable";
import TableToolbar from "components/Main/components/TableToolbar";

import { getFunctionsTable } from "utils/go/selectors";
import ErrorBoundary from "components/ErrorBoundary";

import NotFoundError from "components/Main/components/NotFoundError";

/**
 * Go Functions Container
 * Parent of FunctionsTable and FunctionsTableToolbar
 * Contains sort and filter logic for FunctionsTable
 * @class FunctionsGrid
 * @extends {Component}
 */
class FunctionsGrid extends Component {
  static propTypes = {
    funcs: PropTypes.array
  };

  // Options for sort dropdown rendered in TableToolbar
  static sortByOptions = [
    {
      value: "func",
      label: "Function"
    },
    {
      value: "requests",
      label: "Requests"
    },
    {
      value: "errorCount",
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
  ];

  constructor(props) {
    super(props);
    this.state = {
      filterString: "",
      keyToSortBy: "func",
      ascending: true
    };
    this.sort = this.sort.bind(this);
    this.setKeyToSortBy = this.setKeyToSortBy.bind(this);
  }

  /**
   * Helper function that takes the funcs passed as props and sorts according to how keyToSortBy and ascending is set
   * in the local state object.
   * @param {Array} funcs
   */
  sort(funcs) {
    const { keyToSortBy, ascending } = this.state;

    return funcs.sort((a, b) => {
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
   *  When sorting by latency and error percent and the sortKey is new, set the initial sort order to descending
   * @param {String} keyToSortBy
   */
  setKeyToSortBy(keyToSortBy) {
    //
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
    if (this.props.funcs && this.props.funcs.length > 0) {
      return (
        <div>
          {
            <TableToolbar
              searchInputProps={{
                filterString: this.state.filterString,
                setFilterString: this.setFilterString,
                searchPlaceholder: "Search Functions"
              }}
              sortByProps={{
                sortByOptions: FunctionsGrid.sortByOptions,
                sortByAttribute: this.state.keyToSortBy,
                setSortByAttribute: this.setKeyToSortBy
              }}
            />
          }
          <ErrorBoundary>
            <FunctionsTable
              funcs={this.sort(
                this.props.funcs.filter(
                  funcObj =>
                    funcObj.func
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
      return <NotFoundError errorMsg={"No Functions Found"} />;
    }
  }
}

function mapStateToProps(state) {
  return {
    funcs: getFunctionsTable(state)
  };
}

export default connect(mapStateToProps)(FunctionsGrid);
