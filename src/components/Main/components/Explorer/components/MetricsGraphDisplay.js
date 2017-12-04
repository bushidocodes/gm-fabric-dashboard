import styled from "styled-components";

const MetricsGraphDisplay = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  position: relative;
  align-items: center;
  justify-content: center;

  @media all and (min-width: 800px) {
    flex: 1 0 60%;
  }
`;

export default MetricsGraphDisplay;
