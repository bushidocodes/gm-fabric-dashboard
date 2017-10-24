import styled from "styled-components";
import { COLOR_ALT_BACKGROUND } from "../../../../../../../../../../../../../style/styleVariables";
import {
  spacingScale,
  contrastColor
} from "../../../../../../../../../../../../../style/styleFunctions";

const SectionItem = styled.div`
  color: ${contrastColor(COLOR_ALT_BACKGROUND, 1)
    .hsl()
    .string()};
  display: flex;
  align-items: center;
  padding: ${spacingScale(0.5)} 0;
  width: 100%;
  cursor: ${props => (props.status !== "Down" ? "pointer" : "not-allowed")};
`;

export default SectionItem;
