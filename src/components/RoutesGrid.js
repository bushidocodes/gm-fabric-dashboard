import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import RoutesTable from "./RoutesTable";

import { getRoutesTable } from "../utils/routes";

class RoutesGrid extends Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
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

  render() {
    return (
      <div className="routes-table-container">
        <div className="toolbar">
          <div className="toolbar-left">
            <form>
              <input
                className="form-control"
                onChange={evt =>
                  this.setState({ filterString: evt.target.value })}
                placeholder="Search Routes"
                type="search"
                value={this.state.filterString}
              />
            </form>
          </div>
          <div className="toolbar-right">
            <div className="uk-button-group">
              <button className="btn">
                <span className="label">Sort</span>
                <span className="icon" data-uk-icon="icon: triangle-down" />
              </button>
              <div data-uk-dropdown="mode: click; pos: bottom-right; boundary: ! .uk-button-group; boundary-align: true;">
                <ul className="uk-nav uk-dropdown-nav">
                  <li onClick={evt => this.setKeyToSortBy("route")}>Route</li>
                  <li onClick={evt => this.setKeyToSortBy("totalRequests")}>
                    Total Requests
                  </li>
                  <li onClick={evt => this.setKeyToSortBy("errorRate")}>
                    Error %
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <RoutesTable
          routes={this.sort(
            this.props.routes.filter(
              routeObj => routeObj.route.indexOf(this.state.filterString) !== -1
            )
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    routes: getRoutesTable(state)
  };
}

export default connect(mapStateToProps)(RoutesGrid);
