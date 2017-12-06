import React from "react";
import { PropTypes } from "prop-types";
import TableCol from "components/Main/components/TableCol";
import TableColArray from "components/Main/components/TableColArray";
import TableRow from "components/Main/components/TableRow";
import GMLink from "components/Main/scenes/FabricView/components/GMLink";
import { encodeParameter } from "utils";

GMServiceTableLineItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  uptime: PropTypes.object
};

function GMServiceTableLineItem({ status, name, uptime, path }) {
  return (
    <TableRow tabIndex="-1">
      <TableCol style={{ flex: "1 1 20%" }}>
        <GMLink to={encodeParameter(path)}>{name}</GMLink>
      </TableCol>
      <TableColArray>{uptime}</TableColArray>
    </TableRow>
  );
}

export default GMServiceTableLineItem;
