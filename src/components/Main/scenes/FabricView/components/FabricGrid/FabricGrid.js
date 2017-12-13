import { Actions } from "jumpstate";
import _ from "lodash";
import { PropTypes } from "prop-types";
import qs from "query-string";
import React, { Component } from "react";

import { reportError } from "services/notification";
import {
  routerHistoryShape,
  routerLocationShape,
  routerMatchShape,
  serviceShape
} from "components/PropTypes";
import NotFoundError from "components/Main/components/NotFoundError";
import TableToolbar from "components/Main/components/TableToolbar";
import FabricMainView from "./components/FabricMainView";

class FabricGrid extends Component {
  static propTypes = {
    history: routerHistoryShape,
    location: routerLocationShape,
    match: routerMatchShape,
    services: PropTypes.arrayOf(serviceShape),
    statusView: PropTypes.bool
  };

  static defaultProps = {
    services: [],
    statusView: false
  };

  // Options for group and sort dropdowns rendered in TableToolbar
  static groupByOptions = [
    {
      value: "Owner",
      label: "Owner"
    },
    {
      value: "Capability",
      label: "Capability"
    },
    {
      value: "Status",
      label: "Status"
    },
    {
      value: "None",
      label: "None"
    }
  ];

  static sortByOptions = [
    {
      value: "Name",
      label: "Name"
    },
    {
      value: "Status",
      label: "Status"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      lastPushedQueryString: "",
      groupByAttribute: "Status",
      sortByAttribute: "Name",
      displayType: "Card",
      ascending: true
    };
    // Debounce
    this.debouncedPushHistory = _.debounce(this._pushHistory, 500);
  }

  componentWillMount() {
    this.popAndDecodeHistory(this.props.location.search);
  }

  componentDidMount() {
    const { location: { state }, history } = this.props;
    // Refresh services from the Fabric Server every time this loads
    Actions.fetchAndStoreFabricMicroservices();
    // State added by fabric router
    // Display message if one is found on state
    if (state && state.message) {
      // Disable polling and clear metrics cache
      Actions.stopPollingAndPurgeInstanceMetrics();
      // Display notification
      reportError(state.message);
      // Reset location state
      history.replace({
        state: ""
      });
    }
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

  setGroupByAttribute = groupByAttribute =>
    this.setState({ groupByAttribute }, () => {
      this.encodeAndPushHistory();
    });

  setSortByAttribute = sortByAttribute => {
    if (this.state.sortByAttribute === sortByAttribute) {
      this.setState({ ascending: !this.state.ascending });
    } else {
      this.setState({ sortByAttribute });
    }
  };

  setDisplayType = displayType =>
    this.setState({ displayType }, () => {
      this.encodeAndPushHistory();
    });

  /**
   * onChange event handler for the SearchInput field in FabricTableToolbar
   * Acts as a traditional controlled component, but periodically encodes and pushes
   * searchQueries to browser history
   * @param {string} searchQuery
   */
  onSearchInputChange = searchQuery => {
    // Since the user is interacting with a controlled component, we need to immediately
    // update local state before calling this.encodeAndPushHistory to update the browser's
    // query string
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
  encodeAndPushHistory = () => {
    // Clean local state
    const searchQuery = this.state.searchQuery.trim().toLowerCase();
    const viewType = this.state.displayType;
    const groupBy = this.state.groupByAttribute;
    const sortBy = this.state.sortByAttribute;
    // Only encode the truthy pieces of local state into a form ready to be pushed to the
    // browser's query string. If no local state is truthy, call debouncedPushHistory without
    // an argument to remove the search query from the URL.
    let objToEncode = {};

    if (searchQuery) {
      objToEncode.searchQuery = searchQuery;
    }

    // If viewType, sortBy, or groupBy are set to anything but the defaults, then push to the query string
    if (viewType !== "Card") {
      objToEncode.viewType = viewType;
    }
    if (sortBy !== "Name") {
      objToEncode.sortBy = sortBy;
    }
    if (groupBy !== "Status") {
      objToEncode.groupBy = groupBy;
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
    const {
      searchQuery = "",
      groupBy = "Status",
      viewType = "Card",
      sortBy = "Name"
    } = qs.parse(queryString);

    this.setState({
      searchQuery,
      groupByAttribute: groupBy,
      displayType: viewType,
      sortByAttribute: sortBy
    });
  };

  render() {
    const { services, statusView } = this.props;
    const { searchQuery = "", ascending } = this.state;
    const filteredServices = services.filter(service => {
      return (
        service.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );
    });

    // If we're not rendering a statusView,
    // then pass down sortBy props to render the sortBy dropdown
    const sortByProps = statusView
      ? null
      : {
          sortByOptions: FabricGrid.sortByOptions,
          sortByAttribute: this.state.sortByAttribute,
          setSortByAttribute: this.setSortByAttribute
        };

    if (services && services.length > 0) {
      return (
        <div>
          <TableToolbar
            displayTypeProps={{
              displayType: this.state.displayType,
              setDisplayType: this.setDisplayType
            }}
            searchInputProps={{
              filterString: this.state.searchQuery,
              setFilterString: this.onSearchInputChange,
              searchPlaceholder: "Search Services"
            }}
            groupByProps={{
              groupByOptions: FabricGrid.groupByOptions,
              groupByAttribute: this.state.groupByAttribute,
              setGroupByAttribute: this.setGroupByAttribute
            }}
            sortByProps={sortByProps}
          />
          {/* pass filtered services to FabricMainView */}
          <FabricMainView
            displayType={this.state.displayType}
            groupByAttribute={this.state.groupByAttribute}
            sortByAttribute={this.state.sortByAttribute}
            services={filteredServices}
            ascending={ascending}
          />
        </div>
      );
    } else {
      return <NotFoundError errorMsg={"No Services Found"} />;
    }
  }
}

export default FabricGrid;
