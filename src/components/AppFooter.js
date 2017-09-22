import React from "react";
import styled from "styled-components";
import { contrastColor, spacingScale } from "../style/styleFunctions";
import {
  COLOR_CONTENT_BACKGROUND,
  COLOR_HIGHLIGHT,
  FONT_SIZE_SM
} from "../style/styleVariables";

import longLogo from "../images/decipher-logo-long.png";

const Footer = styled.footer`
  user-select: none;
  overflow: hidden;
  padding: ${spacingScale(0.5)};
  display: flex;
  flex-direction: row;
  color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.8)};
  font-size: ${FONT_SIZE_SM};
  align-items: center;
  flex: 0 0 ${spacingScale(4)};
`;

const LongLogo = styled.a`
  flex: 0 1 auto;
  text-align: left;
  padding: 0 ${spacingScale(1)};
  transition: all 0.2s ease;
  opacity: 0.8;
  filter: grayscale(100%);

  &:hover {
    opacity: 1;
    transition: all 0.2s ease;
    filter: grayscale(0%);
  }
  img {
    max-width: 157px;
  }
`;

const Copyright = styled.p`
  margin: 0;
  text-transform: uppercase;
  flex: 1 1 100%;
  letter-spacing: 0.03em;
  text-align: center;
  transition: opacity 0.2s ease;
  cursor: default;
  z-index: -1;
  opacity: 0;

  @media all and (min-width: 800px) {
    opacity: 0.8;
    z-index: 1;
  }
`;

const Links = styled.div`
  flex: 0 0 auto;
  text-align: right;
  padding: 0 0 0 ${spacingScale(1)};
`;

const Link = styled.a`
  color: ${contrastColor(COLOR_CONTENT_BACKGROUND, 0.4).string()};
  padding: 0 ${spacingScale(1)};

  &:hover {
    color: ${COLOR_HIGHLIGHT};
  }
`;

/**
 * Stateless functional React component that renders company branding and social media footer content
 * @returns JSX.Element
 */
export default function AppFooter() {
  return (
    <Footer>
      <LongLogo
        href="http://deciphernow.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt="Decipher Technology Studios" src={longLogo} />
      </LongLogo>
      <Copyright>&copy;2017 Decipher Technology Studios</Copyright>
      <Links>
        <Link
          href="http://github.com/DecipherNow"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i data-uk-icon={`icon: github; ratio: .8;`} />
        </Link>
        <Link
          href="http://twitter.com/deciphernow"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i data-uk-icon={`icon: twitter; ratio: .8;`} />
        </Link>
        <Link
          href="http://www.linkedin.com/company/decipher-technology-studios"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i data-uk-icon={`icon: linkedin; ratio: .8;`} />
        </Link>
      </Links>
    </Footer>
  );
}
