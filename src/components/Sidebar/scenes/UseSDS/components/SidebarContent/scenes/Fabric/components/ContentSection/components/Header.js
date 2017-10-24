import styled from "styled-components";

import {
  FONT_SIZE_SM,
  COLOR_SIDEBAR_BACKGROUND
} from "../../../../../../../../../../../style/styleVariables";
import {
  spacingScale,
  contrastColor
} from "../../../../../../../../../../../style/styleFunctions";

const SectionHeader = styled.div`
  color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 0.8)
    .hsl()
    .string()};
  display: flex;
  font-size: ${FONT_SIZE_SM};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  align-items: center;
  font-weight: 800;
  justify-content: start;
  padding: ${spacingScale(0.25)} 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 0;
    right: 0;
    background-image: linear-gradient(
      to right,
      ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 0.35)
        .hsl()
        .string()},
      ${props => props.borderBottomColor}
    );
  }

  &:hover {
    color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 0.9)
      .hsl()
      .string()};
    cursor: pointer;
  }
  &:active {
    color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 1)
      .hsl()
      .string()};
  }
`;

export default SectionHeader;
