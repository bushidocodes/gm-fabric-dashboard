import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import qs from "query-string";

import FabricTableToolbar from "./FabricTableToolbar";
import FabricMainView from "./FabricMainView";

class FabricGrid extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    services: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      groupByAttribute: "Status",
      sortByAttribute: "Name",
      displayType: "Card"
    };
    // Debounce
    this.debouncedPushHistory = _.debounce(this._pushHistory, 500);
  }

  componentWillMount() {
    this.popAndDecodeHistory(this.props.location.search);
  }

  componentDidMount() {
    // Refresh services from the Fabric Server every time this loads
    Actions.fetchServices();
  }

  componentWillReceiveProps(nextProps) {
    // We need to check to see if the query string props are the result of user interaction
    // with the search box. We do that by keeping track of the last thing the search box
    // pushed to the query string and filtering out those props. The only expection to this
    // is which the app router action was POP, which means the user hit the back button or
    // otherwise navigated using the client-side router history
    if (
      nextProps.location.search !== `?${this.state.lastPushedQueryString}` ||
      nextProps.history.action === "POP"
    ) {
      this.popAndDecodeHistory(nextProps.location.search);
    }
  }

  setGroupByAttribute = groupByAttribute => this.setState({ groupByAttribute });
  setSortByAttribute = sortByAttribute => this.setState({ sortByAttribute });
  setDisplayType = displayType => this.setState({ displayType });

  /**
   * onChange event handler for the SearchInput field in FabricTableToolbar
   * Acts as a traditional controlled component, but periodically encodes and pushes 
   * searchQueries to browser history
   * @param {string} searchQuery
   */
  onSearchInputChange = searchQuery => {
    // placing a callback to verify that the state is updated before calling this.updateUrl
    this.setState({ searchQuery }, () => {
      this.encodeAndPushHistory();
    });
  };

  /**
   * encodeAndPushHistory encodes local state as a query string and invokes the debounced
   * version of _pushHistory to periodically write to browser history.
   * 
   * @memberof FabricGrid
   */
  encodeAndPushHistory = searchQuery => {
    // Clean local state
    searchQuery = this.state.searchQuery.trim().toLowerCase();
    // Only encode the truthy pieces of local state into a form ready to be pushed to the
    // browser's query string. If no local state is truthy, call debouncedPushHistory without
    // an argument to remove the search query from the URL.
    let objToEncode = {};
    if (searchQuery) {
      objToEncode = { searchQuery, ...objToEncode };
    }
    this.debouncedPushHistory(qs.stringify(objToEncode));
  };

  /**
   * _pushHistory is used to push local state to the browser's query string. This function is not
   * called directly but via encodeAndPushHistory, which uses lodash's debounce to prevent individual 
   * key strokes from polluting the browser history API.
   * @memberof FabricGrid
   */
  _pushHistory = queryString => {
    // Save a query string to local state as lastPushedQueryString to prevent
    // accidental overwriting of user entry and then push the query string
    // to the browser history
    this.setState({ lastPushedQueryString: queryString }, () => {
      this.props.history.push({
        pathname: this.props.match.url,
        search: queryString
      });
    });
  };

  /**
   * popAndDecodeHistory is used to decode and pull local state from the browser's query string
   * @memberof FabricGrid
   */
  popAndDecodeHistory = queryString => {
    // Parse the query string for the searchQuery parameter
    const { searchQuery = "" } = qs.parse(queryString);
    // Update local state if needed
    if (searchQuery !== this.state.searchQuery) {
      this.setState({ searchQuery });
    }
  };

  render() {
    const { services = [] } = this.props;
    const { searchQuery = "" } = this.state;

    const filteredServices = services.filter(service => {
      return (
        service.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    });

    if (services && services.length > 0) {
      return (
        <div className="routes-table-container">
          <FabricTableToolbar
            displayType={this.state.displayType}
            setDisplayType={this.setDisplayType}
            searchQuery={this.state.searchQuery}
            onSearchInputChange={this.onSearchInputChange}
            groupByAttribute={this.state.groupByAttribute}
            setGroupByAttribute={this.setGroupByAttribute}
            sortByAttribute={this.state.sortByAttribute}
            setSortByAttribute={this.setSortByAttribute}
          />
          {/* pass filtered services to FabricMainView */}
          <FabricMainView
            displayType={this.state.displayType}
            groupByAttribute={this.state.groupByAttribute}
            sortByAttribute={this.state.sortByAttribute}
            services={filteredServices}
          />
        </div>
      );
    } else {
      return (
        <div className="no-routes-found-error">
          <div className="content">
            <span data-uk-icon="icon: warning; ratio: 1.8" />
            <span>No Services Found </span>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ fabric: { services } }) {
  return { services: _.values(services) };
}

export default connect(mapStateToProps)(FabricGrid);
