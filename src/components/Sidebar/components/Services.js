import styled from "styled-components";
import {
  COLOR_ALT_BACKGROUND,
  BORDER_RADIUS_BASE
} from "../../../style/styleVariables";
import { contrastColor, spacingScale } from "../../../style/styleFunctions";

const Services = styled.div`
  margin: 2px;
  padding: ${spacingScale(0.75)} 0 ${spacingScale(0.5)};
  min-height: ${spacingScale(4.25)};
  background-color: ${contrastColor(COLOR_ALT_BACKGROUND, 0.29).string()};
  border-radius: ${BORDER_RADIUS_BASE};
`;

export default Services;
