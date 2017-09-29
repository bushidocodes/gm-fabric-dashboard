import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import FabricTableToolbar from "./FabricTableToolbar";
import FabricMainView from "./FabricMainView";

class FabricGrid extends Component {
  static propTypes = {
    services: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      filterString: "",
      groupByAttribute: "State",
      sortByAttribute: "Name",
      displayType: "Card"
    };
  }
  componentDidMount() {
    // Refresh services from the Fabric Server every time this loads
    Actions.fetchServices();
  }

  setFilterString = filterString => this.setState({ filterString });
  setGroupByAttribute = groupByAttribute => this.setState({ groupByAttribute });
  setSortByAttribute = sortByAttribute => this.setState({ sortByAttribute });
  setDisplayType = displayType => this.setState({ displayType });

  render() {
    const { services = [] } = this.props;
    const filteredServices = services.filter(
      service =>
        service.name
          .toLowerCase()
          .indexOf(this.state.filterString.toLowerCase()) !== -1
    );
    if (services && services.length > 0) {
      return (
        <div className="routes-table-container">
          <FabricTableToolbar
            displayType={this.state.displayType}
            setDisplayType={this.setDisplayType}
            filterString={this.state.filterString}
            setFilterString={this.setFilterString}
            groupByAttribute={this.state.groupByAttribute}
            setGroupByAttribute={this.setGroupByAttribute}
            sortByAttribute={this.state.sortByAttribute}
            setSortByAttribute={this.setSortByAttribute}
          />
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
