import React from "react";

import decipherLogo from "../images/decipherLogo.svg";

const AppVersion = "0.4.0";
const BrandName = "Fabric";
const BrandLogo = decipherLogo;

/** Sidebar Branding and Versioning */
const SidebarHeader = () => {
  return (
    <nav className="app-header app-brandbar">
      <div className="brand">
        <img alt={BrandName + "Logo"} className="brand-logo" src={BrandLogo} />
        <span className="brand-text" id="logo-text">
          {BrandName}
        </span>
      </div>

      <a
        className="app-version"
        href="https://github.com/DecipherNow/gm-fabric-dashboard/blob/master/CHANGELOG.md"
        rel="noopener noreferrer"
        target="_blank"
      >
        {AppVersion}
      </a>
    </nav>
  );
};

export default SidebarHeader;
