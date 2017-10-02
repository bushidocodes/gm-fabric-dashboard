import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";

// styled components
const SectionItem = styled.div`
  color: white;
  display: flex;
  align-items: center;
  padding: 5px 0 5px 0;
`;

const TitleSpan = styled.span`
  min-width: 75%;
  margin: 0 0 0 10px;
`;

const VersionSpan = styled.span`
  text-align: right;
  margin: 0 10px 0 10px;
  font-size: 0.8em;
  margin-left: auto;
`;

FabricSidebarContentSectionItem.propTypes = {
  docsLink: PropTypes.string,
  title: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
};

export default function FabricSidebarContentSectionItem({
  docsLink,
  title,
  version
}) {
  return (
    <SectionItem>
      <TitleSpan>{title}</TitleSpan>
      <VersionSpan>{version}</VersionSpan>
    </SectionItem>
  );
}
