import styled from "styled-components";

// toolbar wrapper - do not display scrollbar
const AppContainer = styled.div`
  -ms-overflow-style: none;
  overflow-scrolling: auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100vh;
  padding-left: 0;
  padding-right: 0;
  overflow-x: hidden;
`;

export default AppContainer;
