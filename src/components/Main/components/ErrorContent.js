import styled from "styled-components";

import {
  FONT_SIZE_HERO,
  COLOR_WARNING,
  COLOR_CONTENT,
  BORDER_RADIUS_BASE
} from "style/styleVariables";

import { spacingScale } from "style/styleFunctions";

const ErrorContent = styled.div`
  font-size: ${FONT_SIZE_HERO};
  border: 1px solid ${COLOR_WARNING.string()};
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  color: ${COLOR_CONTENT.string()};
  border-radius: ${parseInt(BORDER_RADIUS_BASE, 10) * 2}px;
  flex-basis: 600px;
  padding: ${spacingScale(8)} ${spacingScale(4)};
  padding-top: ${spacingScale(8)};
  padding-bottom: ${spacingScale(8)};
  margin: ${spacingScale(4)};
`;

export default ErrorContent;
