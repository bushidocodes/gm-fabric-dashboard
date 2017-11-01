import styled from "styled-components";
import { FONT_SIZE_SM } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const VersionSpan = styled.span`
  text-align: right;
  margin: 0 ${spacingScale(1)};
  font-size: ${FONT_SIZE_SM};
  margin-left: auto;
`;

export default VersionSpan;
