import React from "react";
import { PropTypes } from "prop-types";
import SectionCardsView from "../library/SectionCardsView";
import SectionListView from "../library/SectionListView";

FabricMainView.propTypes = {
  displayType: PropTypes.string.isRequired,
  groupByAttribute: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired
};

export default function FabricMainView({
  displayType,
  groupByAttribute,
  services
}) {
  // Do data transformation stuff
  const mappedServices = services.map(service => {
    return {
      headerTitle: computeHeaderTitle(groupByAttribute, service),
      name: service.name,
      version: service.version,
      docsLink: service.documentation,
      state: computeState(
        service.instances.length,
        service.maximum,
        service.minimum
      )
    };
  });

  if (displayType === "Card") {
    return (
      <SectionCardsView
        groupByAttribute={groupByAttribute}
        dataArr={mappedServices}
      />
    );
  } else if (displayType === "Table") {
    return (
      <SectionListView
        groupByAttribute={groupByAttribute}
        dataArr={mappedServices}
      />
    );
  }
}

function computeState(count, min, max) {
  if (count < min) {
    return "Error";
  } else if (count > min && count < max) {
    return "Healthy";
  } else if (count >= max && max !== min) {
    return "Warning";
  } else {
    console.log("computeState did not match as expected");
    return "Error";
  }
}

function computeHeaderTitle(groupByAttribute, service) {
  switch (groupByAttribute) {
    case "State":
      return computeState(
        service.instances.length,
        service.minimum,
        service.maximum
      );
    case "Owner":
      return service.group;
    case "None":
    default:
      return "none";
  }
}
