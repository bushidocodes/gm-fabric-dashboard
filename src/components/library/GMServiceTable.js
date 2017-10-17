import { PropTypes } from "prop-types";
import React from "react";
import styled from "styled-components";

import GMServiceTableLineItem from "./GMServiceTableLineItem";
import { spacingScale } from "../../style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  FONT_STACK_DATA,
  FONT_WEIGHT_BASE
} from "../../style/styleVariables";

const TABLE_HOVER = COLOR_CONTENT_BACKGROUND.darken(0.02).string();
const TABLE_BORDER = COLOR_CONTENT_BACKGROUND.darken(0.08).string();

GMServiceTable.propTypes = {
  instances: PropTypes.array,
  serviceName: PropTypes.string,
  serviceVersion: PropTypes.string,
  status: PropTypes.string
};

export const Table = styled.div`
  width: 100%;
  font-family: ${FONT_STACK_DATA};
`;

export const TableHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  box-shadow: inset 0 -1px ${TABLE_BORDER};
  background-color: ${COLOR_CONTENT_BACKGROUND};
  overflow: hidden;
  font-weight: ${FONT_WEIGHT_BASE};
`;

export const TableBody = styled.ol`
  margin: 0;
  display: block;
  list-style: none;
  padding: 0;
`;

export const TableRow = styled.li`
  display: flex;
  align-items: flex-start;
  width: 100%;
  box-shadow: inset 0 -1px ${TABLE_BORDER};
  background-color: ${COLOR_CONTENT_BACKGROUND};
  overflow: hidden;
  flex-wrap: wrap;
  &:hover {
    background-color: ${TABLE_HOVER};
  }
  > * {
    ${rowChildSpacing()};
  }
`;

export const TableCol = styled.div`
  flex: ${props => (props.sm ? "1 1 5%" : props.lg ? "1 1 30%" : "1 1 15%")};
  ${props => (props.header ? rowChildSpacing() : "")};
`;

function rowChildSpacing() {
  return `
  text-align: left;
  min-height: ${spacingScale(4.5)};
  padding-right: ${spacingScale(2)};
  padding-top: ${spacingScale(0.888)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:first-child {
    padding-left: ${spacingScale(2)};
  }`;
}

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
            instance={instance}
            path={`/${serviceName}/${serviceVersion}/${instance}`}
            status={status}
            key={`${serviceName}/${serviceVersion}/${instance}`}
          />
        ))}
      </TableBody>
    </Table>
  );
}
