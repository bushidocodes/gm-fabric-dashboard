import styled from "styled-components";
import { spacingScale } from "style/styleFunctions";

const DocsLink = styled.a`
  cursor: pointer;
  pointer-events: auto;
  text-decoration: none;
  color: ${props => props.cardFontColor};
  position: relative;
  z-index: 20;

  &:after {
    content: "";
    position: absolute;
    top: -${spacingScale(1)};
    right: -${spacingScale(1)};
    bottom: -${spacingScale(1)};
    left: -${spacingScale(1)};
  }

  &:before {
    content: "";
    transition: all 0.15s ease;
    position: absolute;
    top: -${spacingScale(0.5)};
    right: -${spacingScale(0.5)};
    bottom: -${spacingScale(0.5)};
    left: -${spacingScale(0.5)};
    border-radius: 1px;
    border: 1px solid transparent;
  }

  &:hover {
    &:before {
      border: 1px solid ${props => props.cardHighlightColor};
    }
  }
`;

export default DocsLink;
