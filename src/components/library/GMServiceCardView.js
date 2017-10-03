import React from "react";
import { PropTypes } from "prop-types";
import GMServiceCardCollection from "./GMServiceCardCollection";
import _ from "lodash";

import GMServiceHeader from "./GMServiceHeader";

import styled from "styled-components";

// styled components
const GMServiceCardView = styled.div`
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
    const headers = Object.keys(dataGroupedByHeader);

    // sort using lodash ._orderBy function
    // sortByAttribute => 'Name' || 'State'
    // pass 'sortByAttribute' as the sortkey
    // _.orderBy(collection, [iteratees=[_.identity]], [orders])

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
            {i !== headers.length - 1 && <HorizontalRule />}
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
