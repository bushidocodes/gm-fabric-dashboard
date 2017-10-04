import React from "react";
import { PropTypes } from "prop-types";
import GMServiceCardCollection from "./GMServiceCardCollection";
import {
  COLOR_CONTENT_BACKGROUND,
  PADDING_BASE
} from "../../style/styleVariables";
import { edgeColor } from "../../style/styleFunctions";
import _ from "lodash";
import { microserviceStatuses } from "../../utils/constants";

import GMServiceHeader from "./GMServiceHeader";

import styled from "styled-components";

// styled components
const GMServiceCardView = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${edgeColor(COLOR_CONTENT_BACKGROUND).string()};
  &:first-of-type {
    border-top: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  padding: ${PADDING_BASE} ${parseInt(PADDING_BASE, 10) * 2}px 0;
`;
const SectionContent = styled.div`
  display: flex;
  padding: 0 ${parseInt(PADDING_BASE, 10) * 2}px
    ${parseInt(PADDING_BASE, 10) * 3}px;
`;

// Array of { headerTitle, name, version, docsLink, state }
// headerTitle: Thing that we group by
// name: Name of the service
// version: Version of the service
// docsLink: URL to the documentation
// state: string equal to "Stable", "Warning", or "Down"
SectionCardsView.propTypes = {
  groupByAttribute: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

// What if we have card that don't have a header value?
export default function SectionCardsView({
  groupByAttribute,
  sortByAttribute,
  services
}) {
  if (groupByAttribute !== "None") {
    const dataGroupedByHeader = _.groupBy(services, item => item.headerTitle);
    // If we are grouping by state, we always want to group our services in the order "Down, Warning, Stable"
    const headers =
      groupByAttribute === "State"
        ? microserviceStatuses
        : Object.keys(dataGroupedByHeader);

    return (
      <div>
        {headers.map((header, i) => (
          <GMServiceCardView key={header}>
            <SectionHeader>
              <GMServiceHeader headerTitle={header} showStatusIcon />
            </SectionHeader>
            <SectionContent>
              <GMServiceCardCollection
                items={_.orderBy(
                  dataGroupedByHeader[header],
                  [sortByAttribute.toLowerCase()],
                  ["asc"]
                )}
              />
            </SectionContent>
          </GMServiceCardView>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <GMServiceCardView>
          <SectionContent>
            <GMServiceCardCollection
              items={_.orderBy(
                services,
                [sortByAttribute.toLowerCase()],
                ["asc"]
              )}
            />
          </SectionContent>
        </GMServiceCardView>
      </div>
    );
  }
}
