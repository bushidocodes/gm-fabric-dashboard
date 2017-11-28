import styled from "styled-components";

const MetricsGraphDisplay = styled.div`
  flex: 1 1 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media all and (min-width: 800px) {
    flex: 1 0 60%;
  }
`;

export default MetricsGraphDisplay;
