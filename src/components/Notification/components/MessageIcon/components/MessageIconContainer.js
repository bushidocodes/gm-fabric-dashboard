import styled from "styled-components";

const MessageIconContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 0;

  svg {
    opacity: 0.05;
  }
`;

export default MessageIconContainer;
