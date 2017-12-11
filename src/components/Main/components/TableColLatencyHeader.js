import React from "react";
import styled from "styled-components";

import { FONT_SIZE_SM, COLOR_CONTENT_MUTED } from "style/styleVariables";
import TableColHeader from "./TableColHeader";

const LatencyHeaderWrap = TableColHeader.extend`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PercentileHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const Percent = styled.div`
  font-size: ${FONT_SIZE_SM};
  color: ${COLOR_CONTENT_MUTED.string()};
`;

function TableColLatencyHeader() {
  return (
    <LatencyHeaderWrap>
      <div style={{ padding: "8px" }}>Latency</div>
      <PercentileHeader>
        <Percent>50%</Percent>
        <Percent>99%</Percent>
      </PercentileHeader>
    </LatencyHeaderWrap>
  );
}
export default TableColLatencyHeader;
