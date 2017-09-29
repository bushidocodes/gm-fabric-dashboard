import React from "react";
import { PropTypes } from "prop-types";
import CardSections from "./CardSections";
import _ from "lodash";

import GroupingHeader from "./GroupingHeader";

import styled from "styled-components";

// styled components
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const SectionHeader = styled.div`display: flex;`;
const SectionContent = styled.div`display: flex;`;

const HorizontalRule = styled.hr`
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  color: #f6f6f6;
`;

// Array of { headerTitle, name, version, docsLink, state }
// headerTitle: Thing that we group by
// name: Name of the service
// version: Version of the service
// docsLink: URL to the documentation
// state: string equal to "Stable", "Warning", or "Down"
SectionCardsView.propTypes = {
  dataArr: PropTypes.array.isRequired,
  groupByAttribute: PropTypes.string.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

// What if we have card that don't have a header value?
export default function SectionCardsView({
  groupByAttribute,
  sortByAttribute,
  dataArr
}) {
  if (groupByAttribute !== "None") {
    const dataGroupedByHeader = _.groupBy(dataArr, item => item.headerTitle);
    const headers = Object.keys(dataGroupedByHeader);

    // sort using lodash ._orderBy function
    // sortByAttribute => 'Name' || 'State' || Date Last Updated
    // pass 'sortByAttribute' as the sortkey
    // _.orderBy(collection, [iteratees=[_.identity]], [orders])

    return (
      <div>
        {headers.map((header, i) => (
          <SectionContainer key={header}>
            <SectionHeader>
              <GroupingHeader headerTitle={header} />
            </SectionHeader>
            <SectionContent>
              <CardSections
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
            <CardSections
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
