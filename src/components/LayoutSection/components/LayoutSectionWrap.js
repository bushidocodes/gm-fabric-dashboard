import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";
import { COLOR_CONTENT } from "style/styleVariables";

const LayoutSectionWrap = styled.section`
  align-items: stretch;
  color: ${COLOR_CONTENT.string()};
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: ${spacingScale(1)};

  &:not(:first-of-type) {
    margin-top: ${spacingScale(4)};
  }

  ${props =>
    props.stretch &&
    `
    flex: 1 0 auto;
  `};
`;

export default LayoutSectionWrap;
