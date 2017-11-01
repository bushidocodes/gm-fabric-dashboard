import styled from "styled-components";

import { spacingScale } from "../../../../../style/styleFunctions";

const APP_HEADER_HEIGHT = spacingScale(4.25);
const BRANDBAR_BRAND_SPACING = spacingScale(0.25);

const BrandLogo = styled.img`
  margin: 0 8px;
  max-height: ${Math.round(
    (parseInt(APP_HEADER_HEIGHT, 10) - parseInt(BRANDBAR_BRAND_SPACING, 10)) / 2
  )}px;
  width: auto;
`;

export default BrandLogo;
