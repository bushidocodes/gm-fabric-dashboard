import React from "react";
import { PropTypes } from "prop-types";

import GMServiceCard from "./GMServiceCard";
import GMServiceListItem from "./GMServiceListItem";
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

const ContentItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const HorizontalRule = styled.div`
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  border-width: 0.2px;
  width: 100%;
  color: #f6f6f6;
`;

/**
 * Render section(s) with grouping header and group of cards
 *
 */
function Sections(props) {
  let headerTitle = props.headerTitle;
  let items = props.items;

  items = items.filter(item => item.headerTitle === headerTitle);

  return (
    <ContentItems>
      {items.map((item, i) => (
        <GMServiceCard
          name={item.name}
          version={item.version}
          docsLink={item.docsLink}
          state={item.state}
        />
      ))}
    </ContentItems>
  );
}

export default function SectionCardsView({ dataArr }) {
  // get unique headers
  let headers = dataArr
    .map(item => item.headerTitle)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div>
      {headers.map((header, i) => (
        <SectionContainer>
          <SectionHeader>
            <GroupingHeader headerTitle={header} />
          </SectionHeader>
          <SectionContent>
            <Sections headerTitle={header} items={dataArr} />
          </SectionContent>
          {i !== headers.length - 1 && headers.length > 1 ? (
            <HorizontalRule>
              <hr />
            </HorizontalRule>
          ) : (
            <div />
          )}
        </SectionContainer>
      ))}
    </div>
  );
}
