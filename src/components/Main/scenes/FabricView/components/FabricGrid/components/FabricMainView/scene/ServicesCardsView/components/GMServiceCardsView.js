import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const GMServiceCardsView = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:first-of-type) {
    margin-top: ${spacingScale(3)};
  }
`;

export default GMServiceCardsView;
