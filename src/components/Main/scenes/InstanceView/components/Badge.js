import styled from "styled-components";
import {
  FONT_SIZE_SM,
  COLOR_HIGHLIGHT,
  BORDER_RADIUS_BASE
} from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

const BADGE_COLOR = COLOR_HIGHLIGHT;

const Badge = styled.span`
  font-size: ${FONT_SIZE_SM};
  font-weight: 500;
  text-align: center;
  line-height: 0.9;
  letter-spacing: 0.06em;
  height: fit-content;
  padding: ${spacingScale(0.5)} ${spacingScale(0.5)};
  background-color: ${BADGE_COLOR.fade(0.85).string()};
  border-radius: ${BORDER_RADIUS_BASE};
  color: ${BADGE_COLOR.string()};
  margin-right: ${spacingScale(0.5)};

  svg:first-child {
    margin: -100% -${spacingScale(0.5)};
  }
`;

export default Badge;
