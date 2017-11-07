import React from "react";
import { PropTypes } from "prop-types";

import TableCol from "components/Main/components/TableCol";
import TableRow from "components/Main/components/TableRow";
import GMLink from "components/Main/scenes/Fabric/components/GMLink";
import { encodeParameter } from "utils";

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
      <TableCol style={{ flex: "1 1 30%" }}>
        <GMLink to={encodeParameter(path)}>{name}</GMLink>
      </TableCol>
      <TableCol style={{ textAlign: "right" }}>{uptime}</TableCol>
    </TableRow>
  );
}

export default GMServiceTableLineItem;
