import Services from "./Services";
import { COLOR_HIGHLIGHT } from "style/styleVariables";

const ServicesActive = Services.extend`
  box-shadow: -1px 0 0 0 ${COLOR_HIGHLIGHT.hsl().string()};
`;

export default ServicesActive;
