import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";
import { COLOR_CONTENT_BACKGROUND } from "style/styleVariables";

const GMServiceCardsView = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-of-type) {
    margin-top: ${spacingScale(3)};
  }
`;

export default GMServiceCardsView;
