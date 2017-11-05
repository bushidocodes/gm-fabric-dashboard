import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const Line = styled.div`
  display: flex;
  height: ${spacingScale(3)};
  flex-direction: row;
  width: 100%;
  padding: 0 ${spacingScale(2)};
`;

const LineLeft = styled.div`
  flex: 1 1 auto;
  display: flex;
  min-width: 70%;
`;

const LineRight = styled.div`
  flex: 0 1 auto;
  text-align: right;
`;

export { Line, LineLeft, LineRight };
