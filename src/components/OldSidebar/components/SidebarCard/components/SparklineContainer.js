import styled from "styled-components";

const SparklineContainer = styled.div`
  flex: 1 1 100px;
  overflow: hidden;
  opacity: 0.5;
  > svg {
    position: absolute;
    right: 0;
    height: 20px;
    width: 120px;
    top: 0;
  }
`;

export default SparklineContainer;
