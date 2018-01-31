import { PropTypes } from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Table from "components/Main/components/Table";
import TableToolbar from "components/Main/components/TableToolbar";
import { getFunctionsTable } from "utils/go/selectors";
import ErrorBoundary from "components/ErrorBoundary";
import NotFoundError from "components/Main/components/NotFoundError";
import withUrlState from "components/withUrlState";

/**
 * Go Functions Container
 * Parent of FunctionsTable and FunctionsTableToolbar
 * Contains sort and filter logic for FunctionsTable
 * @class FunctionsGrid
 * @extends {Component}
 */

class FunctionsGrid extends Component {
  static propTypes = {
    funcs: PropTypes.array,
    setUrlState: PropTypes.func.isRequired,
    urlState: PropTypes.object.isRequired
  };
  /**
   *  Helper function that takes the funcs passed as props and sorts according to how sortByAttribute and ascending is set
   * in the url bar.
   * @param {Array} funcs
   */
  sort = routes => {
    const {
      ascending = "true",
      sortByAttribute = "func"
    } = this.props.urlState;
    const sortOrder = ascending === "true" ? ["asc"] : ["desc"];

    return _.orderBy(routes, sortByAttribute, sortOrder);
  };

  /**
   * Helper function used internally to either sort by the key if not yet used to sort or toggle ascending / descending
   * if the key is already active.
   *  When sorting by latency and error percent and the sortKey is new, set the initial sort order to descending
   * @param {String} newSortByAttribute
   */
  setSortByAttribute = newSortByAttribute => {
    const {
      urlState: { ascending = "true", sortByAttribute = "func" },
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
      urlState: { filterString = "", sortByAttribute = "func" },
      funcs
    } = this.props;

    if (funcs && funcs.length > 0) {
      return (
        <Fragment>
          <TableToolbar
            searchInputProps={{
              filterString,
              setFilterString: filterString => setUrlState({ filterString }),
              searchPlaceholder: "Search Functions"
            }}
            sortByProps={{
              sortByOptions: [
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
              ],
              sortByAttribute,
              setSortByAttribute: this.setSortByAttribute
            }}
          />
          <ErrorBoundary>
            <Table
              type={"Function"}
              items={this.sort(
                this.props.funcs.filter(
                  funcObj =>
                    funcObj.func
                      .toLowerCase()
                      .indexOf(filterString.trim().toLowerCase()) !== -1
                )
              )}
            />
          </ErrorBoundary>
        </Fragment>
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

export default connect(mapStateToProps)(withUrlState()(FunctionsGrid));
