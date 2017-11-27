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

// TODO: Make location a shape PropType
ListView.propTypes = {
  groupByAttribute: PropTypes.string.isRequired,
  location: PropTypes.object,
  services: PropTypes.array.isRequired,
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
    const statusSort = pathname.slice(1);

    let headers;

    // If we pulled a status from the path, use that as the header
    // Else if we are on the main fabric grid, use microServiceStatuses as the headers
    if (statusSort && groupByAttribute === "Status") {
      headers = [statusSort];
    } else if (!statusSort && groupByAttribute === "Status") {
      headers = microserviceStatuses.map(item => item.toLowerCase());
    } else {
      headers = headerTitles;
    }

    return (
      <div>
        {headers.map((header, i) => (
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
