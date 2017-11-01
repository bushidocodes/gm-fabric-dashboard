import styled from "styled-components";
import { spacingScale } from "style/styleFunctions";

const MetricsGraphDisplay = styled.div`
  flex: 1 1 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media all and (min-width: 1200px) {
    flex: 1 0 60%;
  }
  .chart {
    display: flex;
    align-items: stretch;
    .chart-title {
      flex: 0 0 auto;
    }
    .chart-content {
      flex: 1 1 100%;
      position: relative;
    }
  }
  > * {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: ${spacingScale(2)};
    h3 {
      flex: 0 0 auto;
      word-break: break-all;
      white-space: normal;
      max-width: 100%;
      text-overflow: ellipsis;
      margin: ${spacingScale(1)};
    }
  }
  p {
    text-align: center;
    opacity: 0.8;
    flex: 1 1 100%;
  }
`;

export default MetricsGraphDisplay;
