import { PropTypes } from "prop-types";
import React from "react";
import _ from "lodash";

import TableLineItem from "./components/TableLineItem";
import GMServiceTableLineItem from "./components/GMServiceTableLineItem";
import UpTime from "components/UpTime";
import ArrayValue from "components/ArrayValue";
import TableDisplay from "components/Main/components/TableDisplay";
import TableHeader from "components/Main/components/TableHeader";
import TableBody from "components/Main/components/TableBody";
import { relativeReqPercent } from "utils";
// Table-specific utils functions
import { getTableHeaders, getItem } from "./utils";

Table.propTypes = {
  items: PropTypes.array,
  serviceIsMetered: PropTypes.bool,
  serviceName: PropTypes.string,
  serviceVersion: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string
};

/** Renders JVM > Routes table, Go > Functions table, Go > Routes table, Instance Service table
 * Includes a Header and maps 0..n rows of functions data to TableLineItems
 * @export
 * @param {any}
 * @returns
 */
export default function Table({
  items,
  type,
  serviceName,
  serviceVersion,
  serviceIsMetered,
  status
}) {
  // adds relativeReqPercent field to items for viz-fill-bar rendering to Route/Function table
  if (type === "Route" || type === "Function")
    items = relativeReqPercent(items, "requests");

  return (
    <TableDisplay>
      <TableHeader>{getTableHeaders(type)}</TableHeader>
      <TableBody>
        {(type === "Route" || type === "Function") &&
          items.map(
            ({
              func,
              route,
              verb,
              errorPercent,
              inThroughput,
              outThroughput,
              latency50,
              latency99,
              relativeReqPercent,
              requests,
              requestsPerSecond_dygraph,
              requestsPerSecond_sparkline
            }) => (
              <TableLineItem
                errorPercent={errorPercent}
                item={getItem(func, route)}
                key={_.replace(`${func}${route}/${verb}`, "undefined", "")}
                latency50={latency50}
                latency99={latency99}
                relativeReqPercent={relativeReqPercent}
                requests={requests}
                requestsPerSecond_dygraph={requestsPerSecond_dygraph}
                requestsPerSecond_sparkline={requestsPerSecond_sparkline}
                verb={verb}
              />
            )
          )}
        {type === "Instance" &&
          items.map(instance => (
            <GMServiceTableLineItem
              name={instance.name}
              serviceIsMetered={serviceIsMetered}
              uptime={
                <UpTime
                  startTime={instance.start_time}
                  render={uptime => (
                    <ArrayValue>
                      {_.map(uptime, el => <span key={el}>{el} </span>)}
                    </ArrayValue>
                  )}
                />
              }
              path={`/${serviceName}/${serviceVersion}/${instance.name}`}
              status={status}
              key={`${serviceName}/${serviceVersion}/${instance.name}`}
            />
          ))}
      </TableBody>
    </TableDisplay>
  );
}
