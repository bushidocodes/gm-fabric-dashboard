import React from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

import {
  COLOR_CONTENT_BACKGROUND,
  PADDING_BASE,
  CONTENT_MAX_WIDTH,
  ZINDEX_STICKY
} from "style/styleVariables";
import { edgeColor } from "style/styleFunctions";
import { microserviceStatuses } from "utils/constants";

import GMServiceHeader from "../../components/GMServiceHeader";
import GMServiceCardCollection from "./components/GMServiceCardCollection";

import styled from "styled-components";
import { withRouter } from "react-router-dom";

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
  max-width: ${CONTENT_MAX_WIDTH};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
const SectionContent = styled.div`
  display: flex;
  padding: 0 ${parseInt(PADDING_BASE, 10) * 2}px
    ${parseInt(PADDING_BASE, 10) * 3}px;
  max-width: ${CONTENT_MAX_WIDTH};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

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
