import styled from "styled-components";

import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";
import { edgeColor, spacingScale } from "style/styleFunctions";

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacingScale(1)} 0 0;
  border-top: 1px solid ${edgeColor(COLOR_CONTENT_BACKGROUND).string()};
  flex-wrap: nowrap;

  &:first-of-type {
    border-top: 0;
  }
`;

export default SectionContainer;
