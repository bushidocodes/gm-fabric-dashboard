import React from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

import styled from "styled-components";

import ListSections from "./ListSections";

// Array of { headerTitle, name, version, docsLink, state }
// headerTitle: Thing that we group by
// name: Name of the service
// version: Version of the service
// docsLink: URL to the documentation
// state: string equal to "healthy", "warning", or "error"

SectionListView.propTypes = {
  dataArr: PropTypes.array.isRequired
};

// styled components
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px 20px 10px;
  flex-wrap: nowrap;
`;

const HorizontalRule = styled.hr`
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  color: #f6f6f6;
`;

export default function SectionListView({ dataArr }) {
  // get unique headers
  const dataGroupedByHeader = _.groupBy(dataArr, item => item.headerTitle);
  const headers = Object.keys(dataGroupedByHeader);

  return (
    <div>
      {headers.map((header, i) => (
        <SectionContainer>
          <ListSections headerTitle={header} items={dataArr} />

          {i !== headers.length - 1 && <HorizontalRule />}
        </SectionContainer>
      ))}
    </div>
  );
}
