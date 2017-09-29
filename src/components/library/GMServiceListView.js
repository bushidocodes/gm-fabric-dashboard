import React from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

import styled from "styled-components";

import GMServiceList from "./GMServiceList";
import GroupingHeader from "./GroupingHeader";

// Array of { headerTitle, name, version, docsLink, state }
// headerTitle: Thing that we group by
// name: Name of the service
// version: Version of the service
// docsLink: URL to the documentation
// state: string equal to "Stable", "Warning", or "Down"

// styled components
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px 20px 10px;
  flex-wrap: nowrap;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 10px 0;
`;

const HorizontalRule = styled.hr`
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  color: #f6f6f6;
`;

GMServiceListView.propTypes = {
  dataArr: PropTypes.array.isRequired,
  groupByAttribute: PropTypes.string.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

export default function GMServiceListView({
  groupByAttribute,
  sortByAttribute,
  dataArr
}) {
  // get unique headers
  if (groupByAttribute !== "None") {
    const dataGroupedByHeader = _.groupBy(dataArr, item => item.headerTitle);
    const headers = Object.keys(dataGroupedByHeader);
    return (
      <div>
        {headers.map((header, i) => (
          <SectionContainer key={header}>
            <SectionHeader>
              <GroupingHeader headerTitle={header} />
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
            {i !== headers.length - 1 && <HorizontalRule />}
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
                dataArr,
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
