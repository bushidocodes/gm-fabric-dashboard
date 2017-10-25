import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import FunctionsTable from "./components/FunctionsTable";
import FunctionsTableToolbar from "./components/FunctionsTableToolbar";

import { getFunctionsTable } from "../../../../../../../../utils/go/selectors";
import ErrorBoundary from "../../../../../../../library/ErrorBoundary";

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
    if (this.props.funcs && this.props.funcs.length > 0) {
      return (
        <div className="routes-table-container">
          <FunctionsTableToolbar
            filterString={this.state.filterString}
            keyToSortBy={this.state.keyToSortBy}
            setFilterString={this.setFilterString}
            setKeyToSortBy={this.setKeyToSortBy}
          />
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
      return (
        <div className="no-routes-found-error">
          <div className="content">
            <span data-uk-icon="icon: warning; ratio: 1.8" />
            <span>No Functions Found </span>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    funcs: getFunctionsTable(state)
  };
}

export default connect(mapStateToProps)(FunctionsGrid);
