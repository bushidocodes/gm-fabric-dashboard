import SummaryBarCardKV from "./SummaryBarCardKV";
import { COLOR_SIDEBAR_CONTENT } from "../../../../../style/styleVariables";

const SIDEBAR_FADED_TEXT = COLOR_SIDEBAR_CONTENT.fade(0.4).string();

export const SummaryBarCardKVKey = SummaryBarCardKV.withComponent("dt").extend`
color: ${SIDEBAR_FADED_TEXT};
flex-basis: 40%;
text-align: left;
padding-left: 24px;
`;

export default SummaryBarCardKVKey;
