import React from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

import {
  COLOR_CONTENT_BACKGROUND,
  PADDING_BASE,
  ZINDEX_STICKY
} from "../../../../../../../../style/styleVariables";
import { edgeColor } from "../../../../../../../../style/styleFunctions";
import { microserviceStatuses } from "../../../../../../../../utils/constants";

import GMServiceHeader from "../../components/GMServiceHeader";
import GMServiceCardCollection from "./components/GMServiceCardCollection";

import styled from "styled-components";

// styled components
const GMServiceViewContainer = styled.div`
  position: relative;
  z-index: 1;
`;

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
  position: sticky;
  top: 0;
  z-index: ${ZINDEX_STICKY};
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
`;
const SectionContent = styled.div`
  display: flex;
  padding: 0 ${parseInt(PADDING_BASE, 10) * 2}px
    ${parseInt(PADDING_BASE, 10) * 3}px;
`;

// Array of { headerTitle, name, version, docsLink, status }
// headerTitle: Thing that we group by
// name: Name of the service
// version: Version of the service
// docsLink: URL to the documentation
// status: string equal to "Stable", "Warning", or "Down"
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
      groupByAttribute === "Status"
        ? microserviceStatuses
        : Object.keys(dataGroupedByHeader);

    return (
      <GMServiceViewContainer>
        {headers.map((header, i) => (
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
                  [sortByAttribute.toLowerCase()],
                  ["asc"]
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
                [sortByAttribute.toLowerCase()],
                ["asc"]
              )}
            />
          </SectionContent>
        </GMServiceCardView>
      </GMServiceViewContainer>
    );
  }
}
