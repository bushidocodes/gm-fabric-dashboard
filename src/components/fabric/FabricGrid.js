import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import FabricTable from "./FabricTable";
import FabricTableToolbar from "./FabricTableToolbar";

class FabricGrid extends Component {
  static propTypes = {
    services: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      filterString: ""
    };
  }
  componentDidMount() {
    // Refresh services from the Fabric Server every time this loads
    Actions.fetchServicesFromServer();
  }

  setFilterString = filterString => this.setState({ filterString });

  render() {
    const { services } = this.props;
    if (services && services.length > 0) {
      return (
        <div className="routes-table-container">
          <FabricTableToolbar
            filterString={this.state.filterString}
            setFilterString={this.setFilterString}
          />
          <FabricTable
            services={services.filter(
              service =>
                service.name
                  .toLowerCase()
                  .indexOf(this.state.filterString.trim().toLowerCase()) !== -1
            )}
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
