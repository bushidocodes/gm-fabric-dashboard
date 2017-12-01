import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import ServicesList from "./components/ServicesList";
import SectionContainer from "./components/SectionContainer";
import SectionContent from "./components/SectionContent";
import SectionHeader from "./components/SectionHeader";

import GMServiceHeader from "components/Main/scenes/FabricView/components/FabricGrid/components/FabricMainView/components/GMServiceHeader";
import { microserviceStatuses } from "utils/constants";
import { routerLocationShape, serviceItemShape } from "components/PropTypes";

ListView.propTypes = {
  groupByAttribute: PropTypes.string.isRequired,
  location: routerLocationShape,
  services: PropTypes.arrayOf(serviceItemShape).isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

function ListView({
  groupByAttribute,
  sortByAttribute,
  services,
  location: { pathname }
}) {
  // get unique headers
  if (groupByAttribute !== "None") {
    const dataGroupedByHeader = _.groupBy(services, item =>
      item.headerTitle.toLowerCase()
    );
    const headerTitles = Object.keys(dataGroupedByHeader);

    let headers;

    // If we are sorting by status, use microServiceStatuses as the headers
    // as they need to be in the order "Down, Warning, Stable"
    if (groupByAttribute === "Status") {
      headers = microserviceStatuses.map(item => item.toLowerCase());
    } else {
      headers = headerTitles;
    }

    let verifiedHeaders = headers.filter(header => {
      // checks to make sure there are microservices within the array
      return (
        !_.isEmpty(dataGroupedByHeader[header]) &&
        !_.isEmpty(dataGroupedByHeader[header][0])
      );
    });

    return (
      <div>
        {verifiedHeaders.map((header, i) => (
          <SectionContainer key={header}>
            <SectionHeader>
              <GMServiceHeader
                headerTitle={header}
                showStatusIcon={groupByAttribute === "Status"}
              />
            </SectionHeader>
            <SectionContent>
              <ServicesList
                items={_.orderBy(
                  dataGroupedByHeader[header],
                  [sortByAttribute.toLowerCase(), "name"],
                  ["asc", "asc"]
                )}
                groupByAttribute={groupByAttribute}
              />
            </SectionContent>
          </SectionContainer>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <SectionContainer>
          <SectionContent>
            <ServicesList
              items={_.orderBy(
                services,
                [sortByAttribute.toLowerCase(), "name"],
                ["asc", "asc"]
              )}
            />
          </SectionContent>
        </SectionContainer>
      </div>
    );
  }
}

export default withRouter(ListView);
