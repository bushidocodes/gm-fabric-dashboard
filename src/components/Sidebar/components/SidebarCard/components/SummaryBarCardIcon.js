import styled from "styled-components";
import { spacingScale } from "style/styleFunctions";

const SummaryBarCardIcon = styled.span.attrs({
  "data-uk-icon": props => `icon: ${props.icon || "grid"}; ratio: 1`
})`
  margin-right: ${spacingScale(0.5)} !important;
  position: relative;
  left: 2px;
`;

export default SummaryBarCardIcon;
