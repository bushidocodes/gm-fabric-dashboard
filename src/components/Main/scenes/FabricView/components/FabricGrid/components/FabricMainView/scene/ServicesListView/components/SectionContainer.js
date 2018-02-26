import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const SectionContainer = styled.section`
  display: flex;
  flex-flow: column nowrap;
  margin: ${spacingScale(1)} 0 0;
  position: relative;
  z-index: 1;

  &:not(:first-of-type) {
    margin: ${spacingScale(4)} 0 0;
  }
`;

export default SectionContainer;
