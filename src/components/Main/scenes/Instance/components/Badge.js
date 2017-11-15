import styled from "styled-components";
import {
  FONT_SIZE_SM,
  COLOR_HIGHLIGHT,
  BORDER_RADIUS_BASE
} from "style/styleVariables";
import { contrastColor, spacingScale } from "style/styleFunctions";

const BADGE_COLOR = COLOR_HIGHLIGHT;

const Badge = styled.span`
  font-size: ${FONT_SIZE_SM};
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.06em;
  padding: ${spacingScale(0.25)} ${spacingScale(0.5)};
  background-color: ${BADGE_COLOR.string()};
  border-radius: ${BORDER_RADIUS_BASE};
  color: ${contrastColor(BADGE_COLOR, 1).string()};
  margin-right: ${spacingScale(0.5)};

  svg:first-child {
    margin-left: -6px;
    margin-right: -4px;
  }
`;

export default Badge;
