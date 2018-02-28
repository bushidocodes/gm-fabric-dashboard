import styled from "styled-components";
import Collapse from "react-collapse";

import { spacingScale } from "style/styleFunctions";

const TableDrawerCollapse = styled(Collapse)`
  cursor: default;
  flex: 0 0 100%;
  min-height: 0;
  overflow: hidden;
  padding: 0;
  white-space: normal;

  > div:first-child {
    box-sizing: border-box;
    cursor: default;
    height: auto;
    margin: 0 ${spacingScale(2)};
    padding: ${spacingScale(2)} 0;
    text-align: left;
    white-space: normal;
  }
`;

export default TableDrawerCollapse;
