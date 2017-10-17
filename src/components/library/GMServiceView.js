import React, { Component } from "react";
import { PropTypes } from "prop-types";

import GMServiceTable from "./GMServiceTable";
import GMServiceTableToolbar from "./GMServiceTableToolbar";

class GMServiceView extends Component {
  static propTypes = {
    instances: PropTypes.array.isRequired,
    serviceName: PropTypes.string.isRequired,
    serviceVersion: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      filterString: ""
    };
  }

  setFilterString = filterString => this.setState({ filterString });

  render() {
    const { instances, serviceName, serviceVersion, status } = this.props;
    const { filterString } = this.state;
    return instances && instances.length ? (
      <div>
        <GMServiceTableToolbar
          setFilterString={this.setFilterString}
          filterString={filterString}
          serviceName={serviceName}
        />
        <GMServiceTable
          serviceName={serviceName}
          serviceVersion={serviceVersion}
          instances={instances.filter(instance => {
            return instance.indexOf(filterString) !== -1;
          })}
          status={status}
        />
      </div>
    ) : (
      <div className="no-routes-found-error">
        <div className="content">
          <span data-uk-icon="icon: warning; ratio: 1.8" />
          <span>No Instances Found </span>
        </div>
      </div>
    );
  }
}

export default GMServiceView;
