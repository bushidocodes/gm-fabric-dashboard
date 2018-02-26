import styled from "styled-components";
import { spacingScale } from "style/styleFunctions";

const ReadoutGroup = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  orphans: 2;
  width: 100%;
  margin-right: -${spacingScale(1)};
`;

export default ReadoutGroup;
