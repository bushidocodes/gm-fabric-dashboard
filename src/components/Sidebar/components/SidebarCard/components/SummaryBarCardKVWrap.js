import styled from "styled-components";
import { spacingScale } from "../../../../../style/styleFunctions";
import { FONT_STACK_DATA } from "../../../../../style/styleVariables";

const SummaryBarCardKVWrap = styled.div`
  display: flex;
  padding: 0 ${spacingScale(1)};
  font-family: ${FONT_STACK_DATA};
  position: relative;
  &:last-child {
    margin-bottom: ${spacingScale(1)};
  }
`;

export default SummaryBarCardKVWrap;
