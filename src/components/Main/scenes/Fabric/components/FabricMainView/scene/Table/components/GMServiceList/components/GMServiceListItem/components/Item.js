import styled from "styled-components";

import GMLink from "components/Main/scenes/Fabric/components/GMLink";
import { spacingScale } from "style/styleFunctions";
import { FONT_SIZE_XS } from "style/styleVariables";

const ItemName = styled.div`
  margin-right: ${spacingScale(1)};
  align-items: center;
`;

const ItemVersion = styled.div`
  font-size: ${FONT_SIZE_XS};
  margin: 0 0 0 ${spacingScale(0.25)};
  color: gray;
  align-self: center;
`;

const ItemInfo = GMLink.withComponent("div").extend`
&:hover {
color: inherit;
}
`;

export { ItemName, ItemVersion, ItemInfo };
