import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND, ZINDEX_STICKY } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  align-items: center;
  padding: 0 ${spacingScale(2)};
  flex: 0 0 ${spacingScale(5)};
  position: sticky;
  top: 0;
  z-index: ${ZINDEX_STICKY};
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
`;

export default SectionHeader;
