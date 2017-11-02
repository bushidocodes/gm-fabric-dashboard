import styled from "styled-components";

import { spacingScale } from "../../../../../style/styleFunctions";
import { FONT_SIZE_XS } from "../../../../../style/styleVariables";

const AppVersionLink = styled.a`
  font-weight: 600;
  font-size: ${FONT_SIZE_XS};
  flex: 0 0 auto;
  opacity: 1;
  padding: 0 ${spacingScale(1)};
  color: white;

  &:hover {
    color: white;
    opacity: 1;
  }
`;

export default AppVersionLink;
