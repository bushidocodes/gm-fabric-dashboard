import React from "react";
import Copyright from "./components/Copyright";
import Footer from "./components/Footer";
import LongLogo from "./components/LongLogo";
import Links from "./components/Links";
import Link from "./components/Link";

import longLogo from "./assets/decipher-logo-long.png";

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
