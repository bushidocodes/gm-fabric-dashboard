import React from "react";
import { PropTypes } from "prop-types";
import TableCol from "../../../../../../../components/TableCol";
import TableRow from "../../../../../../../components/TableRow";
import StatusIcon from "../../../../../../../../StatusIcon";
import GMLink from "../../../../GMLink";

GMServiceTableLineItem.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  requests: PropTypes.string,
  status: PropTypes.string.isRequired,
  uptime: PropTypes.string
};

GMServiceTableLineItem.defaultProps = {
  error: "—",
  requests: "—",
  uptime: "—"
};

function GMServiceTableLineItem({
  status,
  name,
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
        <GMLink to={path}>{name}</GMLink>
      </TableCol>
      <TableCol>{requests}</TableCol>
      <TableCol>{error}</TableCol>
      <TableCol>{uptime}</TableCol>
    </TableRow>
  );
}

export default GMServiceTableLineItem;
