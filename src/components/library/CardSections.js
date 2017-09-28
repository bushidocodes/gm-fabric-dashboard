import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import GMServiceCard from "./GMServiceCard";

CardSections.propTypes = {
  items: PropTypes.array.isRequired
};

const ContentItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

/**
 * Render section(s) with grouping header and group of cards
 *
 */
export default function CardSections({ items }) {
  return (
    <ContentItems>
      {items.map(item => (
        <GMServiceCard
          key={`${item.name}${item.version}`}
          name={item.name}
          version={item.version}
          docsLink={item.docsLink}
          state={item.state}
        />
      ))}
    </ContentItems>
  );
}
