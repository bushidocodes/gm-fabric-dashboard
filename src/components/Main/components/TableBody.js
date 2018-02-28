import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const TableBody = styled.ol`
  list-style: none;
  margin: 0;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0 ${spacingScale(1)} ${spacingScale(1)};
`;

export default TableBody;
