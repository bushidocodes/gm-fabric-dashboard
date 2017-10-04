import React from "react";
import { PropTypes } from "prop-types";

import GMServiceListItem from "./GMServiceListItem";
import { spacingScale } from "../../style/styleFunctions";

import styled from "styled-components";
/**
 * Render section(s) with grouping header and group of lists
 *
 */

GMServiceList.propTypes = {
  items: PropTypes.array.isRequired
};

const SectionItems = styled.div`
  width: 100%;
  display: flex;
  margin: -${spacingScale(0.5)} 0 0;
  flex-direction: column;

  > div {
    margin: ${spacingScale(0.5)} 0;
  }
`;

export default function GMServiceList({ items }) {
  return (
    <SectionItems>
      {items.map(item => (
        <GMServiceListItem
          key={`${item.name}${item.version}`}
          instances={item.instances}
          name={item.name}
          status={item.state}
          version={item.version}
          docsLink={item.docsLink}
        />
      ))}
    </SectionItems>
  );
}
