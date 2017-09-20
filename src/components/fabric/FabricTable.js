import { PropTypes } from "prop-types";
import React from "react";

import FabricTableLineItem from "./FabricTableLineItem";

FabricTable.propTypes = {
  services: PropTypes.array
};

export default function FabricTable({ services = [] }) {
  return (
    <div className="div-table thread-table">
      <ol className="div-table-body thread-table-body">
        {services.map((service, arrIndex) => {
          return (
            <FabricTableLineItem
              service={service}
              arrIndex={arrIndex}
              key={service.name}
            />
          );
        })}
      </ol>
    </div>
  );
}
