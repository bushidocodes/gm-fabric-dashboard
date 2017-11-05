import styled from "styled-components";

import { spacingScale, contrastColor } from "style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  CONTENT_MAX_WIDTH
} from "style/styleVariables";

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
  max-width: ${CONTENT_MAX_WIDTH};
  width: 100%;
  padding: ${(spacingScale(1), spacingScale(2))};
  border-top: 1px solid
    ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.15).string()};
`;

export default Header;
