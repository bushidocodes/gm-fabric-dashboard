import styled from "styled-components";

const Copyright = styled.p`
  margin: 0;
  text-transform: uppercase;
  flex: 1 1 100%;
  letter-spacing: 0.03em;
  text-align: center;
  transition: opacity 0.2s ease;
  cursor: default;
  z-index: -1;
  opacity: 0;

  @media all and (min-width: 800px) {
    opacity: 0.8;
    z-index: 1;
  }
`;

export default Copyright;
