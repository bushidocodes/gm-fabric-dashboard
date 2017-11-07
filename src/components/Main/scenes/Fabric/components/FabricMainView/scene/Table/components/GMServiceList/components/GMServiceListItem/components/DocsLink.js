import styled from "styled-components";

const DocsLink = styled.a`
  justify-self: flex-end;
  pointer-events: auto;
  color: inherit;
  transition: all 0.3s ease;
  transform: scale(1);
  will-change: transform;
  display: block;

  &:hover {
    transform: scale(1.25);
    transition: all 0.1s ease;
    color: inherit;
  }
`;

export default DocsLink;
