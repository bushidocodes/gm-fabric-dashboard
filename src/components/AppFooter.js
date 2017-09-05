import React from "react";

import longLogo from "../images/decipher-logo-long.png";

/** Company branding and social media footer content */
const AppFooter = () => {
  return (
    <footer className="app-footer">
      <a
        className="long-logo"
        href="http://deciphernow.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt="Decipher Technology Studios" src={longLogo} />
      </a>
      <p className="copyright">&copy;2017 Decipher Technology Studios</p>
      <div className="links">
        <a
          href="http://github.com/DecipherNow"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i data-uk-icon={`icon: github; ratio: .8;`} />
        </a>
        <a
          href="http://twitter.com/deciphernow"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i data-uk-icon={`icon: twitter; ratio: .8;`} />
        </a>
        <a
          href="http://www.linkedin.com/company/decipher-technology-studios"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i data-uk-icon={`icon: linkedin; ratio: .8;`} />
        </a>
      </div>
    </footer>
  );
};

export default AppFooter;
