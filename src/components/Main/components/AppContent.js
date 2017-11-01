import styled from "styled-components";
import { COLOR_CONTENT_BACKGROUND } from "../../../style/styleVariables";

// content wrapper - display scrollbar
const AppContent = styled.div`
  background-color: ${COLOR_CONTENT_BACKGROUND.string()};
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
`;

export default AppContent;
