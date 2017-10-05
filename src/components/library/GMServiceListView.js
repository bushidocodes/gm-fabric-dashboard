import React from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";
import { microserviceStatuses } from "../../utils/constants";

import styled from "styled-components";

import GMServiceList from "./GMServiceList";
import GMServiceHeader from "./GMServiceHeader";
import { COLOR_CONTENT_BACKGROUND } from "../../style/styleVariables";
import { edgeColor, spacingScale } from "../../style/styleFunctions";

// styled components
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacingScale(1)} 0 0;
  border-top: 1px solid ${edgeColor(COLOR_CONTENT_BACKGROUND).string()};
  flex-wrap: nowrap;

  &:first-of-type {
    border-top: 0;
  }
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  margin: 0;
  padding: 0 ${spacingScale(2)};
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 ${spacingScale(1)};
`;

GMServiceListView.propTypes = {
  groupByAttribute: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

export default function GMServiceListView({
  groupByAttribute,
  sortByAttribute,
  services
}) {
  // get unique headers
  if (groupByAttribute !== "None") {
    const dataGroupedByHeader = _.groupBy(services, item => item.headerTitle);
    // If we are grouping by status, we always want to group our services in the order "Down, Warning, Stable"
    const headers =
      groupByAttribute === "Status"
        ? microserviceStatuses
        : Object.keys(dataGroupedByHeader);

    return (
      <div>
        {headers.map((header, i) => (
          <SectionContainer key={header}>
            <SectionHeader>
              <GMServiceHeader headerTitle={header} />
            </SectionHeader>
            <SectionContent>
              <GMServiceList
                items={_.orderBy(
                  dataGroupedByHeader[header],
                  [sortByAttribute.toLowerCase()],
                  ["asc"]
                )}
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
            <GMServiceList
              items={_.orderBy(
                services,
                [sortByAttribute.toLowerCase()],
                ["asc"]
              )}
            />
          </SectionContent>
        </SectionContainer>
      </div>
    );
  }
}
