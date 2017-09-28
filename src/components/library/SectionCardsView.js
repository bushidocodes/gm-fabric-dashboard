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
// state: string equal to "healthy", "warning", or "error"
SectionCardsView.propTypes = {
  dataArr: PropTypes.array.isRequired,
  groupByAttribute: PropTypes.string.isRequired
};

// What if we have card that don't have a header value?
export default function SectionCardsView({ groupByAttribute, dataArr }) {
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
              <CardSections items={dataGroupedByHeader[header]} />
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
            <CardSections items={dataArr} />
          </SectionContent>
        </SectionContainer>
      </div>
    );
  }
}
