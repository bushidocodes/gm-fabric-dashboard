import React from "react";
import { PropTypes } from "prop-types";

import GMServiceListItem from "./GMServiceListItem";
import GroupingHeader from "./GroupingHeader";

import styled from "styled-components";

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

const SectionItems = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 10px 0;
  flex-direction: column;
`;

const HorizontalRule = styled.div`
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  border-width: 1px;
  width: 100%;
  color: #f6f6f6;
`;

/**
 * Render section(s) with grouping header and group of lists
 *
 */
function Sections(props) {
  let headerTitle = props.headerTitle;
  let items = props.items;

  items = items.filter(item => item.headerTitle === headerTitle);

  return (
    <SectionContent>
      <SectionHeader>
        <GroupingHeader headerTitle={headerTitle} />
      </SectionHeader>
      <SectionItems>
        {items.map((item, i) => (
          <GMServiceListItem
            name={item.name}
            state={item.state}
            version={item.version}
            docsLink={item.docsLink}
          />
        ))}
      </SectionItems>
    </SectionContent>
  );
}

export default function SectionListView({ dataArr }) {
  // get unique headers
  let headers = dataArr
    .map(item => item.headerTitle)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div>
      {headers.map((header, i) => (
        <SectionContainer>
          <Sections headerTitle={header} items={dataArr} />

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
