import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { COLOR_ALT_BACKGROUND } from "style/styleVariables";
import { spacingScale } from "style/styleFunctions";

import AppToolBar from "./AppToolBar";
import Banner from "./Banner";
import SectionNav from "./SectionNav";
import BannerBackgroundImage from "images/app-banner.png";

export const AppHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-image: url(${BannerBackgroundImage});
  background-size: auto 101px;
  background-repeat: no-repeat;
  background-position: left ${spacingScale(4)};
  background-color: ${COLOR_ALT_BACKGROUND.string()};
`;

/**
 * Stateless functional React component that renders the App Header
 * @returns JSX.Element
 */

function AppHeader({
  appVersion,
  bannerExtras = [],
  bannerTitle,
  hideRoot = true,
  pathname,
  secondaryTabs = [],
  tabs = [],
  toolbarButtons = []
}) {
  return (
    <AppHeaderContainer>
      <AppToolBar
        pathname={pathname}
        hideRoot={hideRoot}
        AppVersion={appVersion}
        toolbarButtons={toolbarButtons}
      />
      <Banner
        title={bannerTitle || "—"}
        hideBackground={true}
        extras={bannerExtras}
      />
      <SectionNav tabs={tabs} secondaryTabs={secondaryTabs} />
    </AppHeaderContainer>
  );
}

export default AppHeader;

AppHeader.propTypes = {
  appVersion: PropTypes.string,
  bannerExtras: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  bannerTitle: PropTypes.string,
  hideRoot: PropTypes.bool,
  pathname: PropTypes.string,
  secondaryTabs: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  tabs: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  toolbarButtons: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
