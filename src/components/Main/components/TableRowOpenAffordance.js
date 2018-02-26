import React from "react";
import styled from "styled-components";
import Chevron from "../../ChevronIcon";
import TableRow from "./TableRow";
import { COLOR_HIGHLIGHT } from "style/styleVariables";

const TableRowOpenAffordanceWrap = styled.span`
  opacity: 0.5;
  transition: all 0.15s ease;
  height: 1em;
  display: flex;
  margin-left: auto;
  align-items: center;

  ${TableRow}:hover & {
    opacity: 1;
    color: ${COLOR_HIGHLIGHT};
  }

  ${props =>
    props.isOpen &&
    `
      transform: rotateZ(180deg);
 `};
`;

const TableRowOpenAffordance = ({ isOpen }) => {
  return (
    <TableRowOpenAffordanceWrap isOpen={isOpen}>
      <Chevron />
    </TableRowOpenAffordanceWrap>
  );
};

export default TableRowOpenAffordance;
