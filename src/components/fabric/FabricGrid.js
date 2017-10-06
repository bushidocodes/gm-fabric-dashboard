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
    this.updateUrl = _.debounce(this.updateUrl, 500);
  }

  componentWillMount() {
    // Parse the current query parameter
    const { searchQuery = "" } = qs.parse(this.props.location.search);

    // when the page is hard refreshed with a query parameter, set the query as the url parameter
    if (searchQuery && this.state.query === "") {
      this.setState({ query: searchQuery });
    }
  }

  componentDidMount() {
    // Refresh services from the Fabric Server every time this loads
    Actions.fetchServices();
  }

  componentWillReceiveProps(nextProps) {
    // Parse the nextProps query parameter
    const { searchQuery = "" } = qs.parse(nextProps.location.search);

    // when the user hits backspace button, the url updates to the previous query.  if the previous query is not the current query, update this.state.query.  this updates the search
    if (searchQuery !== this.state.query) {
      this.setState({ query: searchQuery });
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
      this.updateUrl();
    });
  };

  /**
   * updateUrl debounces input and executes search after waiting 500 ms
   * @memberof FabricGrid
   */
  updateUrl = () => {
    // takes an obj and flattens into a string text: {searchQuery: "latency"} => "searchQuery=latency"
    const query = qs.stringify({
      searchQuery: this.state.query.trim().toLowerCase()
    });
    // push a parsed query parameter to router
    this.props.history.push({
      pathname: this.props.match.url,
      search: query
    });
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
