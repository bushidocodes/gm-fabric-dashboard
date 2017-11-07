import styled from "styled-components";

const DocsLink = styled.a`
  justify-self: flex-end;
  margin-left: 0;
  cursor: pointer;
  pointer-events: auto;
  color: ${props => props.cardFontColor};
  transition: all 0.3s ease;
  transform: scale(1);
  will-change: transform;

  &:hover {
    transform: scale(1.25);
    transition: all 0.1s ease;
    color: inherit;
  }
`;

export default DocsLink;
