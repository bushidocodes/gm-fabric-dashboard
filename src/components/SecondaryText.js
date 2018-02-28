import styled from "styled-components";

import { FONT_SIZE_BASE } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const SecondaryText = styled.span`
  margin-left: ${spacingScale(0.5)};
  opacity: 0.6;
  font-size: ${FONT_SIZE_BASE};
`;

export default SecondaryText;
