import React from "react";
import { PropTypes } from "prop-types";
import Sections from "./Sections";

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

const HorizontalRule = styled.div`
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  border-width: 0.2px;
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
  dataArr: PropTypes.array.isRequired
};

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
