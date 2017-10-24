import React from "react";
import decipherLogo from "./assets/decipherLogo.svg";
import AppBrandBar from "./components/AppBrandBar";
import BrandContainer from "./components/BrandContainer";
import BrandLogo from "./components/BrandLogo";
import BrandText from "./components/BrandText";
import SkipNav from "./components/SkipNav";
import AppVersionLink from "./components/AppVersionLink";

const AppVersion = "0.7.1";
const BrandName = "Fabric";

/** Sidebar Branding and Versioning */
const SidebarHeader = () => {
  return (
    <AppBrandBar>
      <BrandContainer>
        <BrandLogo alt={`${BrandName} Logo`} src={decipherLogo} />
        <BrandText>{BrandName}</BrandText>
      </BrandContainer>
      <SkipNav
        type="button"
        onKeyDown={evt => {
          if (evt.keyCode === 13 || evt.keyCode === 32) {
            document.getElementById("main-content").focus();
          }
        }}
      >
        Skip Navigation
      </SkipNav>
      <AppVersionLink
        href="https://github.com/DecipherNow/gm-fabric-dashboard/blob/master/CHANGELOG.md"
        rel="noopener noreferrer"
        target="_blank"
      >
        {AppVersion}
      </AppVersionLink>
    </AppBrandBar>
  );
};

export default SidebarHeader;
