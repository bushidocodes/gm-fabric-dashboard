import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";
import { contrastColor, spacingScale } from "style/styleFunctions";

const Toolbar = styled.div`
  align-items: center;
  border-bottom: 1px solid
    ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.08).string()};
  justify-content: center;
  display: flex;
  flex-direction: row;
  height: ${spacingScale(5)};
  width: 100%;
  padding: ${spacingScale(0.25)} ${spacingScale(2)};
  margin: ${spacingScale(2)} 0 ${spacingScale(1)};
`;

export default Toolbar;
