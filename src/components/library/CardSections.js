import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import GMServiceCard from "./GMServiceCard";

CardSections.propTypes = {
  headerTitle: PropTypes.string.isRequired,
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
export default function CardSections({ headerTitle, items }) {
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
