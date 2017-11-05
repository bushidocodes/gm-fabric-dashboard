import { spacingScale } from "style/styleFunctions";
import { BORDER_RADIUS_BASE } from "style/styleVariables";

import StyledButton from "./StyledButton";

const StyledButtonRoundedLeft = StyledButton.extend`
  border-top-left-radius: ${BORDER_RADIUS_BASE};
  border-bottom-left-radius: ${BORDER_RADIUS_BASE};
  padding-left: ${spacingScale(1)};
  padding-right: ${spacingScale(1)};
`;

export default StyledButtonRoundedLeft;
