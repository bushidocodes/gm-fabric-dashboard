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
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    services: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      groupByAttribute: "Status",
      sortByAttribute: "Name",
      displayType: "Card"
    };
    this.onChange = this.onChange.bind(this);
    // Debounce
    this.debouncedPushHistory = _.debounce(this.pushHistory, 500);
  }

  componentWillMount() {
    this.popAndDecodeHistory(this.props.location.search);
  }

  componentDidMount() {
    // Refresh services from the Fabric Server every time this loads
    Actions.fetchServices();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.history.action, nextProps.history.length);
    // If the app router action was POP, the user hit the back button or otherwise
    // navigated using the client-side router history, so the state of the view
    // should be set to the state of the searchQuery
    if (nextProps.history.action === "POP") {
      // Parse the nextProps query parameter for state
      this.popAndDecodeHistory(nextProps.location.search);
    }
  }

  setGroupByAttribute = groupByAttribute => this.setState({ groupByAttribute });
  setSortByAttribute = sortByAttribute => this.setState({ sortByAttribute });
  setDisplayType = displayType => this.setState({ displayType });

  /**
   * onChange function invoked in FabricTableToolbar
   * @param {string} query
   */
  onChange = query => {
    // placing a callback to verify that the state is updated before calling this.updateUrl
    this.setState({ query }, () => {
      this.encodeAndPushHistory();
    });
  };

  /**
   * 
   * 
   * @memberof FabricGrid
   */
  encodeAndPushHistory = query => {
    // Clean local state
    const searchQuery = this.state.query.trim().toLowerCase();
    // Only encode the truthy pieces of local state into a form ready to be pushed to the
    // browser's query string. If no local state is truthy, call debouncedPushHistory without
    // an argument to remove the search query from the URL.
    if (searchQuery) {
      this.debouncedPushHistory(
        qs.stringify({
          searchQuery
        })
      );
    } else {
      this.debouncedPushHistory();
    }
  };

  /**
   * pushHistory is used to push local state to the browser's query string. This function is not
   * called directly but via encodeAndPushHistory, which uses lodash's debounce to prevent individual 
   * key strokes from polluting the browser history API.
   * @memberof FabricGrid
   */
  pushHistory = queryString => {
    // If passed an encoded query string, push that to browser history
    if (queryString) {
      this.props.history.push({
        pathname: this.props.match.url,
        search: queryString
      });
      // Otherwise, clear the query string from the URL bar
    } else {
      this.props.history.push({
        pathname: this.props.match.url,
        search: ""
      });
    }
  };

  /**
   * pushHistory is used to decode and pull local state from the browser's query string
   * @memberof FabricGrid
   */
  popAndDecodeHistory = queryString => {
    // Parse the query string for the searchQuery parameter
    const { searchQuery = "" } = qs.parse(queryString);
    // Update local state if needed
    if (searchQuery && searchQuery !== this.state.query) {
      this.setState({ query: searchQuery });
    }
  };

  render() {
    const { services = [] } = this.props;
    const { query = "" } = this.state;

    const filteredServices = services.filter(service => {
      return service.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    if (services && services.length > 0) {
      return (
        <div className="routes-table-container">
          <FabricTableToolbar
            displayType={this.state.displayType}
            setDisplayType={this.setDisplayType}
            query={this.state.query}
            onChange={this.onChange}
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
