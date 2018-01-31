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
import withUrlState from "components/withUrlState";

// TODO: Make history and location a shape PropType
class ServiceView extends Component {
  static propTypes = {
    history: routerHistoryShape.isRequired,
    instances: PropTypes.arrayOf(serviceInstanceShape).isRequired,
    location: routerLocationShape.isRequired,
    serviceIsMetered: PropTypes.bool,
    serviceName: PropTypes.string.isRequired,
    serviceVersion: PropTypes.string.isRequired,
    setUrlState: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    urlState: PropTypes.object.isRequired
  };

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

  setSortByAttribute = newSortByAttribute => {
    const {
      urlState: { ascending = "true", sortByAttribute = "name" },
      setUrlState
    } = this.props;
    if (sortByAttribute === newSortByAttribute) {
      setUrlState({ ascending: !JSON.parse(ascending) });
    } else {
      setUrlState({ sortByAttribute: newSortByAttribute });
    }
  };

  render() {
    const {
      setUrlState,
      serviceName,
      serviceVersion,
      status,
      instances,
      serviceIsMetered,
      urlState: {
        filterString = "",
        sortByAttribute = "name",
        ascending = "true"
      }
    } = this.props;

    const sortOrder = JSON.parse(ascending) ? ["asc"] : ["desc"];

    return instances && instances.length ? (
      <div>
        <TableToolbar
          searchInputProps={{
            filterString,
            setFilterString: filterString => setUrlState({ filterString }),
            searchPlaceholder: "Search Instances"
          }}
          sortByProps={{
            sortByAttribute,
            sortByOptions: [
              {
                value: "name",
                label: "Name"
              },
              {
                value: "start_time",
                label: "Uptime"
              }
            ],
            setSortByAttribute: this.setSortByAttribute
          }}
        />
        <ErrorBoundary>
          <Table
            type={"Instance"}
            serviceName={serviceName}
            serviceVersion={serviceVersion}
            serviceIsMetered={serviceIsMetered}
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

export default withUrlState()(ServiceView);
