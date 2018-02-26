import styled from "styled-components";

import { COLOR_ALT_BACKGROUND } from "style/styleVariables";
import BannerBackgroundImage from "images/mesh-lg.jpg";

const AppHeaderContainer = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: stretch;
  background-color: ${COLOR_ALT_BACKGROUND.string()};
  background-image: linear-gradient(
      to right,
      #000,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0)
    ),
    url(${BannerBackgroundImage});
  background-size: 100% 100%, 120% auto;
  background-position: center center, left center;
  background-repeat: no-repeat;
`;

export default AppHeaderContainer;
