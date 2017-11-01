import styled from "styled-components";
import { spacingScale } from "../../../style/styleFunctions";

const HeaderIcon = styled.div`
  display: inline-block;
  width: ${spacingScale(3)};
  height: ${spacingScale(2.625)};
  margin-left: ${spacingScale(0.5)};
  margin-right: ${spacingScale(0.5)};
  position: relative;
  top: -2px;
`;

export default HeaderIcon;
