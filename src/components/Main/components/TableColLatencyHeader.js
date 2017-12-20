import React from "react";
import styled from "styled-components";

import { FONT_SIZE_SM, COLOR_CONTENT_MUTED } from "style/styleVariables";
import TableColHeader from "./TableColHeader";
import Tooltip from "components/Tooltip";

const LatencyHeaderWrap = TableColHeader.extend`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: visible;
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

const Latency = styled.div`
  padding: 8px;
`;

const tooltipContent =
  "Latency 50% refers to the average latency of the 50% percentile, while Latency 99% is the average latency for the slowest 1% of responses, also known as tail latency.";

function TableColLatencyHeader() {
  return (
    <LatencyHeaderWrap>
      <Latency>
        <Tooltip content={tooltipContent} position="left">
          Latency
        </Tooltip>
      </Latency>
      <PercentileHeader>
        <Percent>50%</Percent>
        <Percent>99%</Percent>
      </PercentileHeader>
    </LatencyHeaderWrap>
  );
}
export default TableColLatencyHeader;
