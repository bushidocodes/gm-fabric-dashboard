import styled from "styled-components";

const APP_HEADER_HEIGHT = 34;

const AppHeader = styled.nav`
  align-items: center;
  color: black;
  display: flex;
  flex: 0 0 ${APP_HEADER_HEIGHT}px;
  flex-direction: row;
  font-size: 14px;
  padding-right: 4px;
`;

export default AppHeader;
