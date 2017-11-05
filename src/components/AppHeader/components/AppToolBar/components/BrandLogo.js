import styled from "styled-components";

import { spacingScale } from "style/styleFunctions";

const APP_TOOLBAR_HEIGHT = spacingScale(4.25);
const APP_TOOLBAR_BRAND_SPACING = spacingScale(0.25);

const BrandLogo = styled.img`
  width: auto;
  margin: 0 ${spacingScale(1)};
  max-height: ${Math.round(
    (parseInt(APP_TOOLBAR_HEIGHT, 10) -
      parseInt(APP_TOOLBAR_BRAND_SPACING, 10)) /
      2
  )}px;
`;

export default BrandLogo;
