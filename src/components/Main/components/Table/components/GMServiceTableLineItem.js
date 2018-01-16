import React from "react";
import { PropTypes } from "prop-types";
import TableCol from "components/Main/components/TableCol";
import TableColArray from "components/Main/components/TableColArray";
import TableRow from "components/Main/components/TableRow";
import GMLink from "components/Main/scenes/FabricView/components/GMLink";
import { encodeParameter } from "utils";
import Tooltip from "components/Tooltip";
import Icon from "components/Icon";
import NoMetrics from "components/Glyphs/NoMetrics";

GMServiceTableLineItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  uptime: PropTypes.object
};

function GMServiceTableLineItem({
  status,
  name,
  uptime,
  path,
  serviceIsMetered
}) {
  // this is done to search up the DOM tree to find table row and take away its focus to prevent outline on click while preserving tabbing outline
  const blurTableRow = e => {
    let node = e.target;
    while (
      typeof node.className !== "string" ||
      node.className.indexOf("TableRow") !== 0
    ) {
      node = node.parentNode;
    }
    node.blur();
  };

  return (
    <TableRow tabIndex="-1" onClick={evt => blurTableRow(evt)} overflow>
      <TableCol style={{ flex: "1 1 20%" }}>
        {!serviceIsMetered && (
          <Icon title="No Metrics">
            <NoMetrics />
          </Icon>
        )}
        <Tooltip
          position="left"
          disabled={serviceIsMetered}
          containerStyle={{ border: "none" }}
          content={
            "This microservice instance does not have metrics to display."
          }
        >
          <GMLink
            disabled={serviceIsMetered ? null : true}
            onClick={serviceIsMetered ? null : e => e.preventDefault()}
            to={encodeParameter(path)}
          >
            {name}
          </GMLink>
        </Tooltip>
      </TableCol>
      <TableColArray>{uptime}</TableColArray>
    </TableRow>
  );
}

export default GMServiceTableLineItem;
