import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Actions } from "jumpstate";
import _ from "lodash";

import Table from "components/Main/components/Table";
import TableToolbar from "components/Main/components/TableToolbar";
import ErrorBoundary from "components/ErrorBoundary";
import NotFoundError from "components/Main/components/NotFoundError";
import { reportError } from "services/notification";
import {
  routerHistoryShape,
  routerLocationShape,
  serviceInstanceShape
} from "components/PropTypes";

// TODO: Make history and location a shape PropType
class ServiceView extends Component {
  static propTypes = {
    history: routerHistoryShape.isRequired,
    instances: PropTypes.arrayOf(serviceInstanceShape).isRequired,
    location: routerLocationShape.isRequired,
    serviceName: PropTypes.string.isRequired,
    serviceVersion: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired
  };

  // Options for sort dropdown rendered in TableToolbar
  static sortByOptions = [
    {
      value: "name",
      label: "Name"
    },
    {
      value: "start_time",
      label: "Uptime"
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      filterString: "",
      sortByAttribute: "name", // name or start_time
      ascending: true
    };
  }

  componentDidMount() {
    const { location: { state }, history } = this.props;
    if (state && state.message) {
      // Disable polling and clear metrics cache
      Actions.stopPollingAndPurgeInstanceMetrics();
      // Display notification
      reportError(state.message);
      // Reset location state
      history.replace({
        state: {}
      });
    }
  }

  setFilterString = filterString => this.setState({ filterString });

  setSortByAttribute = sortByAttribute => {
    if (this.state.sortByAttribute === sortByAttribute) {
      this.setState({ ascending: !this.state.ascending });
    } else {
      this.setState({ sortByAttribute });
    }
  };

  render() {
    const { instances, serviceName, serviceVersion, status } = this.props;
    const { filterString, sortByAttribute, ascending } = this.state;
    const sortOrder = ascending ? ["asc"] : ["desc"];

    return instances && instances.length ? (
      <div>
        <TableToolbar
          searchInputProps={{
            filterString,
            setFilterString: this.setFilterString,
            searchPlaceholder: "Search Instances"
          }}
          sortByProps={{
            sortByAttribute,
            sortByOptions: ServiceView.sortByOptions,
            setSortByAttribute: this.setSortByAttribute
          }}
        />
        <ErrorBoundary>
          <Table
            type={"Instance"}
            serviceName={serviceName}
            serviceVersion={serviceVersion}
            items={_.orderBy(
              instances.filter(
                ({ name }) =>
                  name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1
              ),
              [sortByAttribute.toLowerCase()],
              sortOrder
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

export default ServiceView;
