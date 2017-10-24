import styled from "styled-components";
import { COLOR_CONTENT_BACKGROUND } from "../../../style/styleVariables";

// content wrapper - display scrollbar
const AppContent = styled.div`
  -ms-overflow-style: -ms-autohiding-scrollbar;
  overflow-scrolling: touch;
  flex: 1 1 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  background-color: ${COLOR_CONTENT_BACKGROUND};
`;

export default AppContent;
