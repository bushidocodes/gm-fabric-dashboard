import React, { Component } from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

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
      filterString: "",
      sortByAttribute: "name" // name or start_time
    };
  }

  setFilterString = filterString => this.setState({ filterString });
  setSortByAttribute = sortByAttribute => this.setState({ sortByAttribute });

  render() {
    const { instances, serviceName, serviceVersion, status } = this.props;
    const { filterString, sortByAttribute } = this.state;
    return instances && instances.length ? (
      <div>
        <GMServiceTableToolbar
          setFilterString={this.setFilterString}
          setSortByAttribute={this.setSortByAttribute}
          filterString={filterString}
          serviceName={serviceName}
          sortByAttribute={sortByAttribute}
        />
        <ErrorBoundary>
          <GMServiceTable
            serviceName={serviceName}
            serviceVersion={serviceVersion}
            instances={_.orderBy(
              instances.filter(({ name }) => name.indexOf(filterString) !== -1),
              [sortByAttribute.toLowerCase()],
              ["asc"]
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
