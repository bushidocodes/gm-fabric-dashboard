import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND, ZINDEX_STICKY } from "style/styleVariables";

import { spacingScale } from "style/styleFunctions";

const SectionHeader = styled.header`
  display: flex;
  padding: ${spacingScale(1)} ${spacingScale(2)} 0;
  position: sticky;
  top: 0;
  z-index: ${ZINDEX_STICKY};
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  width: 100%;
  align-items: center;
`;

export default SectionHeader;
