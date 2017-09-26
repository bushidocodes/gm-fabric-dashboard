import React from "react";
import styled from "styled-components";
import { contrastColor, spacingScale } from "../style/styleFunctions";
import { COLOR_SIDEBAR_BACKGROUND } from "../style/styleVariables";

const Footer = styled.footer`
  text-align: center;
  color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND).string()};
  position: relative;
  flex: 0 0 auto;
  margin-top: ${spacingScale(1)};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;

  > * {
    flex: 0 0 auto;
  }
`;

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

/** Bottom component of sidebar */
const SidebarFooter = () => {
  return (
    <Footer>
      <FooterLink
        href="http://deciphernow.com/grey-matter"
        rel="noopener noreferrer"
        target="_blank"
      >
        Grey Matter
      </FooterLink>
    </Footer>
  );
};

export default SidebarFooter;
