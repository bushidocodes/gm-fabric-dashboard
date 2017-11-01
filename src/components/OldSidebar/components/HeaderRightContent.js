import HeaderRight from "./HeaderRight";
import { spacingScale } from "style/styleFunctions";

const HeaderRightContent = HeaderRight.extend`
  margin: 0;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0 0 ${spacingScale(0.5)};
`;

export default HeaderRightContent;
