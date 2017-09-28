import React from "react";
import { PropTypes } from "prop-types";

import GMServiceListItem from "./GMServiceListItem";

import styled from "styled-components";
/**
 * Render section(s) with grouping header and group of lists
 *
 */

ListSections.propTypes = {
  items: PropTypes.array.isRequired
};

const SectionItems = styled.div`
  width: 100%;
  display: flex;
  margin: 0 0 10px 0;
  flex-direction: column;
`;

export default function ListSections({ items }) {
  return (
    <SectionItems>
      {items.map(item => (
        <GMServiceListItem
          key={`${item.name}${item.version}`}
          name={item.name}
          state={item.state}
          version={item.version}
          docsLink={item.docsLink}
        />
      ))}
    </SectionItems>
  );
}
