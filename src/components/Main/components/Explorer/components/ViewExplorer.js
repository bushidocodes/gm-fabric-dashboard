import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const ViewExplorer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 1 100%;
  min-height: 400px;
  padding: 0 ${spacingScale(2)} ${spacingScale(2)};
  height: 100%;
  @media all and (min-width: 1200px) {
    flex-direction: row;
  }
`;

export default ViewExplorer;
