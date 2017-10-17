import React from "react";
import { PropTypes } from "prop-types";

import { TableCol, TableRow } from "./GMServiceTable";
import StatusIcon from "./StatusIcon";
import { GMLink } from "./GMServiceListItem";

GMServiceTableLineItem.propTypes = {
  error: PropTypes.string,
  instance: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  requests: PropTypes.string,
  status: PropTypes.string.isRequired,
  uptime: PropTypes.string
};

GMServiceTableLineItem.defaultProps = {
  error: "--",
  requests: "--",
  uptime: "--"
};

function GMServiceTableLineItem({
  status,
  instance,
  requests,
  error,
  uptime,
  path
}) {
  return (
    <TableRow>
      <TableCol sm>
        <StatusIcon status={status} />
      </TableCol>
      <TableCol lg>
        <GMLink to={path}>{instance}</GMLink>
      </TableCol>
      <TableCol>{requests}</TableCol>
      <TableCol>{error}</TableCol>
      <TableCol>{uptime}</TableCol>
    </TableRow>
  );
}

export default GMServiceTableLineItem;
