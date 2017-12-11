import React from "react";
import TableColHeader from "components/Main/components/TableColHeader";
import TableColLatencyHeader from "components/Main/components/TableColLatencyHeader";

/** function getTableHeaders
 * takes Table type and returns appropriate headers with styling
 * for Function/Routes Table or GMServiceTable (Instances Table)
 * @param {object} items
 * @returns {React.element}
 */
export const getTableHeaders = type => {
  let headerNames = [];
  if (type === "Instance") headerNames = [type, "Uptime"];
  if (type === "Route" || type === "Function")
    headerNames = [type, "Requests/sec", "Requests", "Error %", "Latency"];
  let styleProps = {};

  // apply greater flex-basis for first column (20%)
  // requests/sec is a sparkline header and set to align left
  // set text-align to right for additional text columns
  return headerNames.map((header, headerIdx) => {
    styleProps = {};
    if (headerIdx === 0) styleProps = { flex: "1 1 20%" };
    if (headerIdx !== 0 && header !== "Requests/sec")
      styleProps = { textAlign: "right" };

    if (header === "Latency") {
      return <TableColLatencyHeader key={header} />;
    } else {
      return (
        <TableColHeader style={styleProps} key={header}>
          {header}
        </TableColHeader>
      );
    }
  });
};

// simple helper that evaluates and returns route or func props
export const getItem = (route, func) => {
  if (route !== undefined) return route;
  if (func !== undefined) return func;
};
