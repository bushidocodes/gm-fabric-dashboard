import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import GMServiceHeader from "components/Main/scenes/Fabric/components/FabricMainView/components/GMServiceHeader";
import { microserviceStatuses } from "utils/constants";

import GMServiceCardCollection from "./components/GMServiceCardCollection";
import GMServiceCardView from "./components/GMServiceCardView";
import GMServiceViewContainer from "./components/GMServiceViewContainer";
import SectionContent from "./components/SectionContent";
import SectionHeader from "./components/SectionHeader";

// Array of { headerTitle, name, version, docsLink, status }
// headerTitle: Thing that we group by
// name: Name of the service
// version: Version of the service
// docsLink: URL to the documentation
// status: string equal to "Stable", "Warning", or "Down"
SectionCardsView.propTypes = {
  groupByAttribute: PropTypes.string.isRequired,
  location: PropTypes.object,
  services: PropTypes.array.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

function SectionCardsView({
  groupByAttribute,
  sortByAttribute,
  services,
  location: { pathname }
}) {
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

    let verifiedHeaders = [];
    verifiedHeaders = headers.filter(header => {
      // several checks to make sure there are microservices within the array
      return (
        !_.isEmpty(dataGroupedByHeader[header]) &&
        !_.isEmpty(dataGroupedByHeader[header][0])
      );
    });

    return (
      <GMServiceViewContainer>
        {verifiedHeaders.map((header, i) => (
          <GMServiceCardView key={header}>
            <SectionHeader>
              <GMServiceHeader
                headerTitle={header}
                showStatusIcon={groupByAttribute === "Status"}
              />
            </SectionHeader>
            <SectionContent>
              <GMServiceCardCollection
                items={_.orderBy(
                  dataGroupedByHeader[header],
                  [sortByAttribute.toLowerCase(), "name"],
                  ["asc", "asc"]
                )}
              />
            </SectionContent>
          </GMServiceCardView>
        ))}
      </GMServiceViewContainer>
    );
  } else {
    return (
      <GMServiceViewContainer>
        <GMServiceCardView>
          <SectionContent>
            <GMServiceCardCollection
              items={_.orderBy(
                services,
                [sortByAttribute.toLowerCase(), "name"],
                ["asc", "asc"]
              )}
            />
          </SectionContent>
        </GMServiceCardView>
      </GMServiceViewContainer>
    );
  }
}

export default withRouter(SectionCardsView);
