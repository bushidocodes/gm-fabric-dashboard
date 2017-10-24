import styled from "styled-components";

const APP_HEADER_HEIGHT = 34;

const AppHeader = styled.nav`
  flex: 0 0 ${APP_HEADER_HEIGHT}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 4px;
  font-size: 14px;
  color: black;
`;

export default AppHeader;
