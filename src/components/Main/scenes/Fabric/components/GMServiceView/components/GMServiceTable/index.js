import { PropTypes } from "prop-types";
import React from "react";

import GMServiceTableLineItem from "./components/GMServiceTableLineItem";

import Table from "../../../../../../components/Table";

import TableHeader from "../../../../../../components/TableHeader";

import TableCol from "../../../../../../components/TableCol";

import TableBody from "../../../../../../components/TableBody";

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
        <TableCol sm header>
          State
        </TableCol>
        <TableCol lg header>
          ID
        </TableCol>
        <TableCol header>Requests/s</TableCol>
        <TableCol header>Error %</TableCol>
        <TableCol header>Uptime</TableCol>
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
