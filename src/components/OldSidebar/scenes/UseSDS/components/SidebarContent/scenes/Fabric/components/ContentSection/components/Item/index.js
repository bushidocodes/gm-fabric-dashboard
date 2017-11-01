import { PropTypes } from "prop-types";
import React from "react";
import SectionItem from "./components/SectionItem";
import TitleSpan from "./components/TitleSpan";
import VersionSpan from "./components/VersionSpan";
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
