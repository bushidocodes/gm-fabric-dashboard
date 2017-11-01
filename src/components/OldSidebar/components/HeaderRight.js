import styled from "styled-components";
import { FONT_SIZE_SM } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const HeaderRight = styled.div`
  display: flex;
  margin: 0 ${spacingScale(1)};
  justify-content: flex-end;
  font-size: ${FONT_SIZE_SM};
  opacity: 0.8;
  align-items: center;
`;

export default HeaderRight;
