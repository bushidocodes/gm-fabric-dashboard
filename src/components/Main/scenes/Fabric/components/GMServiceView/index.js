import React, { Component } from "react";
import { PropTypes } from "prop-types";

import GMServiceTable from "./components/GMServiceTable";
import GMServiceTableToolbar from "./components/GMServiceTableToolbar";
import ErrorBoundary from "components/library/ErrorBoundary";

import NotFoundError from "components/Main/components/NotFoundError";

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
        <ErrorBoundary>
          <GMServiceTable
            serviceName={serviceName}
            serviceVersion={serviceVersion}
            instances={instances.filter(
              ({ name }) => name.indexOf(filterString) !== -1
            )}
            status={status}
          />
        </ErrorBoundary>
      </div>
    ) : (
      <NotFoundError errorMsg={"No Instances Found"} />
    );
  }
}

export default GMServiceView;
