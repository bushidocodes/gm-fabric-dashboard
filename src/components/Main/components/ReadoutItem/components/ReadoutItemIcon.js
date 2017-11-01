import styled from "styled-components";

import { spacingScale } from "../../../../../style/styleFunctions";

const ReadoutItemIcon = styled.div.attrs({
  "data-uk-icon": props =>
    props.icon ? `icon: ${props.icon}; ratio: 1.8` : `icon: "grid"; ratio: 1.8`
})`
  flex: 0 0 ${spacingScale(10)};
  height: ${spacingScale(6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export default ReadoutItemIcon;
