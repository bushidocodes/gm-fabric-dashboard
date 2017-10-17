import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";
import {
  FONT_SIZE_SM,
  COLOR_SIDEBAR_BACKGROUND
} from "../../style/styleVariables";
import { spacingScale, contrastColor } from "../../style/styleFunctions";

// styled components
const SectionItem = styled.div`
  color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 1)
    .hsl()
    .string()};
  display: flex;
  align-items: center;
  padding: ${spacingScale(0.5)} 0;
  width: 100%;
  cursor: ${props => (props.status !== "Down" ? "pointer" : "not-allowed")};
`;

const TitleSpan = styled.span`
  min-width: 75%;
  margin: 0 0 0 ${spacingScale(1)};
`;

const VersionSpan = styled.span`
  text-align: right;
  margin: 0 ${spacingScale(1)};
  font-size: ${FONT_SIZE_SM};
  margin-left: auto;
`;

FabricSidebarContentSectionItem.propTypes = {
  docsLink: PropTypes.string,
  historyPush: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired
};

export default function FabricSidebarContentSectionItem({
  docsLink,
  historyPush,
  name,
  status,
  version
}) {
  return (
    <SectionItem
      status={status}
      tabIndex={0}
      onClick={() =>
        status !== "Down" ? historyPush(`/${name}/${version}`) : {}}
      onKeyDown={e => {
        if (status !== "Down" && (e.keyCode === 13 || e.keyCode === 32)) {
          e.preventDefault();
          historyPush(`/${name}/${version}`);
        }
      }}
    >
      <TitleSpan>{name}</TitleSpan>
      <VersionSpan>{version}</VersionSpan>
    </SectionItem>
  );
}
