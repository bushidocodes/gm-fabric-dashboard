import React from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";
import { microserviceStatuses } from "utils/constants";

import styled from "styled-components";

import GMServiceList from "./components/GMServiceList";
import GMServiceHeader from "../../components/GMServiceHeader";
import {
  COLOR_CONTENT_BACKGROUND,
  ZINDEX_STICKY,
  CONTENT_MAX_WIDTH
} from "style/styleVariables";
import { edgeColor, spacingScale } from "style/styleFunctions";
import { withRouter } from "react-router-dom";
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
  margin: 0 auto;
  padding: 0 ${spacingScale(2)};
  position: sticky;
  top: 0;
  z-index: ${ZINDEX_STICKY};
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  max-width: ${CONTENT_MAX_WIDTH};
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 ${spacingScale(1)};
  max-width: ${CONTENT_MAX_WIDTH};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

GMServiceListView.propTypes = {
  groupByAttribute: PropTypes.string.isRequired,
  location: PropTypes.object,
  services: PropTypes.array.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

function GMServiceListView({
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
              <GMServiceList
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
            <GMServiceList
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

export default withRouter(GMServiceListView);
