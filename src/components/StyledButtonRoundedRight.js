import { BORDER_RADIUS_BASE } from "style/styleVariables";
import StyledButton from "./StyledButton";
import { spacingScale } from "style/styleFunctions";

export const StyledButtonRoundedRight = StyledButton.extend`
  border-top-right-radius: ${BORDER_RADIUS_BASE};
  border-bottom-right-radius: ${BORDER_RADIUS_BASE};
  padding-left: ${spacingScale(1)};
  padding-right: ${spacingScale(1)};
`;

export default StyledButtonRoundedRight;
