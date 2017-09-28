import React from "react";
import { PropTypes } from "prop-types";

import GMServiceListItem from "./GMServiceListItem";
import GroupingHeader from "./GroupingHeader";

import styled from "styled-components";
/**
 * Render section(s) with grouping header and group of lists
 *
 */

ListSections.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

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

export default function ListSections({ headerTitle, items }) {
  return (
    <SectionContent>
      <SectionHeader>
        <GroupingHeader headerTitle={headerTitle} />
      </SectionHeader>
      <SectionItems>
        {items.map(item => (
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
