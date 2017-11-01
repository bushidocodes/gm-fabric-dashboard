import styled from "styled-components";
import { spacingScale } from "../../../../../style/styleFunctions";

const FooterLink = styled.a`
  color: #fff;
  display: block;
  opacity: 0.8;
  padding: ${spacingScale(1)};

  &:hover {
    color: #fff;
    opacity: 1;
  }
`;

export default FooterLink;
