import styled from "styled-components";
import { APP_FOOTER_HEIGHT } from "./../style/styleVariables";

// toolbar wrapper - do not display scrollbar
const AppContainer = styled.div`
  min-height: 100vh;
  padding-left: 0;
  padding-right: 0;
  padding: 0 0 ${APP_FOOTER_HEIGHT};
`;

export default AppContainer;
