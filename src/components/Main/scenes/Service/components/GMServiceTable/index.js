import { PropTypes } from "prop-types";
import React from "react";

import GMServiceTableLineItem from "./components/GMServiceTableLineItem";

import Table from "components/Main/components/Table";
import TableHeader from "components/Main/components/TableHeader";
import TableColHeader from "components/Main/components/TableColHeader";
import TableBody from "components/Main/components/TableBody";
import { convertMS } from "utils";

GMServiceTable.propTypes = {
  instances: PropTypes.array,
  serviceName: PropTypes.string,
  serviceVersion: PropTypes.string,
  status: PropTypes.string
};

export default function GMServiceTable({
  instances = [],
  serviceName,
  serviceVersion,
  status
}) {
  return (
    <Table>
      <TableHeader>
        <TableColHeader paddingLeft style={{ flex: "1 1 30%" }}>
          ID
        </TableColHeader>
        <TableColHeader paddingRight style={{ textAlign: "right" }}>
          Uptime
        </TableColHeader>
      </TableHeader>
      <TableBody>
        {instances.map(instance => (
          <GMServiceTableLineItem
            name={instance.name}
            uptime={convertMS(Date.now() - instance.start_time)}
            path={`/${serviceName}/${serviceVersion}/${instance.name}`}
            status={status}
            key={`${serviceName}/${serviceVersion}/${instance.name}`}
          />
        ))}
      </TableBody>
    </Table>
  );
}
