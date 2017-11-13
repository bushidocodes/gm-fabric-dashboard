import styled from "styled-components";
import Collapse from "react-collapse";

import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";
import { spacingScale, contrastColor } from "style/styleFunctions";

const TableDrawerCollapse = styled(Collapse)`
  min-height: 0px;
  padding: 0;
  overflow: hidden;
  flex: 0 0 100%;
  cursor: default;
  white-space: normal;
  > div:first-child {
    -webkit-box-shadow: inset 0 1px #ebebeb;
    box-shadow: inset 0 1px #ebebeb;
    height: auto;
    box-sizing: border-box;
    cursor: default;
    white-space: normal;
    text-align: left;
   
    margin: 0 ${spacingScale(2)};
    padding: ${spacingScale(2)} 0;
    box-shadow: inset 0 1px ${contrastColor(
      COLOR_CONTENT_BACKGROUND,
      0.02
    ).string()}
`;

export default TableDrawerCollapse;
