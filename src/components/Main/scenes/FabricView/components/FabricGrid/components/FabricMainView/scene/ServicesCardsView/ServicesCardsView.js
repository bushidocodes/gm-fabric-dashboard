import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import GMServiceHeader from "components/Main/scenes/FabricView/components/FabricGrid/components/FabricMainView/components/GMServiceHeader";
import { microserviceStatuses } from "utils/constants";

import GMServiceCardCollection from "./components/GMServiceCardCollection";
import GMServiceCardView from "./components/GMServiceCardView";
import GMServiceViewContainer from "./components/GMServiceViewContainer";
import SectionContent from "./components/SectionContent";
import SectionHeader from "./components/SectionHeader";
import { serviceItemShape, routerLocationShape } from "components/PropTypes";

CardsView.propTypes = {
  ascending: PropTypes.bool,
  groupByAttribute: PropTypes.string.isRequired,
  location: routerLocationShape,
  services: PropTypes.arrayOf(serviceItemShape).isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

function CardsView({ ascending, groupByAttribute, sortByAttribute, services }) {
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
                  [
                    item =>
                      sortByAttribute === "Status"
                        ? _.indexOf(microserviceStatuses, item.status)
                        : item.name,
                    "name"
                  ],
                  ascending ? ["asc", "asc"] : ["desc", "asc"]
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
                [
                  item =>
                    sortByAttribute === "Status"
                      ? _.indexOf(microserviceStatuses, item.status)
                      : item.name,
                  "name"
                ],
                ascending ? ["asc", "asc"] : ["desc", "asc"]
              )}
            />
          </SectionContent>
        </GMServiceCardView>
      </GMServiceViewContainer>
    );
  }
}

export default withRouter(CardsView);
