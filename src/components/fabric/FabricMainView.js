import React from "react";
import { PropTypes } from "prop-types";
import GMServiceCardView from "../library/GMServiceCardView";
import GMServiceListView from "../library/GMServiceListView";
import { computeState } from "../../utils/selectors";

FabricMainView.propTypes = {
  displayType: PropTypes.string.isRequired,
  groupByAttribute: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

export default function FabricMainView({
  displayType,
  groupByAttribute,
  sortByAttribute,
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
        service.minimum,
        service.maximum
      ),
      instances: service.instances
    };
  });

  if (displayType === "Card") {
    return (
      <GMServiceCardView
        groupByAttribute={groupByAttribute}
        sortByAttribute={sortByAttribute}
        services={mappedServices}
      />
    );
  } else if (displayType === "Table") {
    return (
      <GMServiceListView
        groupByAttribute={groupByAttribute}
        sortByAttribute={sortByAttribute}
        services={mappedServices}
      />
    );
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
