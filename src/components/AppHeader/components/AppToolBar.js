import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import decipherLogo from "../../Sidebar/components/SidebarHeader/assets/decipherLogo.svg";
import { contrastColor, spacingScale } from "../../../style/styleFunctions";
import {
  FONT_SIZE_XS,
  FONT_SIZE_SM,
  FONT_SIZE_BASE,
  FONT_STACK_BASE,
  COLOR_ALT_BACKGROUND,
  COLOR_GREEN,
  COLOR_WHITE
} from "../../../style/styleVariables";
import { hide } from "./../../library/globalPatterns";
import { ButtonGroup } from "./../../GMButtons";
import NavButton from "./../../NavButton";

AppToolBar.propTypes = {
  AppVersion: PropTypes.string,
  hideRoot: PropTypes.bool,
  pathname: PropTypes.string.isRequired,
  toolbarButtons: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const AppVersion = "0.8.1";
const BrandName = "Fabric";

const APP_TOOLBAR_HEIGHT = spacingScale(4.25);
const APP_TOOLBAR_FONT_SIZE = FONT_SIZE_BASE;
const APP_TOOLBAR_BACKGROUND_COLOR = COLOR_ALT_BACKGROUND.string();
const APP_TOOLBAR_TEXT_COLOR = contrastColor(COLOR_ALT_BACKGROUND).string();
const APP_TOOLBAR_BRAND_SPACING = spacingScale(0.25);

const AppHeader = styled.nav`
  display: flex;
  font-weight: 600;
  flex-direction: row;
  align-items: center;
  background-color: ${APP_TOOLBAR_BACKGROUND_COLOR};
  flex: 0 0 ${APP_TOOLBAR_HEIGHT};
  font-size: ${APP_TOOLBAR_FONT_SIZE};
  color: ${APP_TOOLBAR_TEXT_COLOR};
  font-family: ${FONT_STACK_BASE};
`;

const BrandContainer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
`;

const BrandLogo = styled.img`
  width: auto;
  margin: 0 ${spacingScale(1)};
  max-height: ${Math.round(
    (parseInt(APP_TOOLBAR_HEIGHT, 10) -
      parseInt(APP_TOOLBAR_BRAND_SPACING, 10)) /
      2
  )}px;
`;

const BrandText = styled.span`
  font-weight: 500;
  letter-spacing: 0.03em;
  flex: 0 0 auto;
  font-size: ${FONT_SIZE_BASE};
  color: white;
`;

const AppVersionLink = styled.a`
  font-weight: 600;
  font-size: ${FONT_SIZE_XS};
  flex: 0 0 auto;
  opacity: 0.5;
  padding: 0 ${spacingScale(1)};
  color: white;

  &:hover {
    color: white;
    opacity: 1;
  }
`;

const SkipNav = styled.button`
  position: absolute;
  text-transform: uppercase;
  border: none;
  padding: 0.6em;
  transition: top 0.5s ease;
  top: -10em;
  left: 0;
  background-color: ${COLOR_GREEN.string()};
  color: ${COLOR_WHITE.string()};
  font-size: ${FONT_SIZE_SM};

  &:focus {
    top: 0;
  }
`;

const Breadcrumbs = styled.ol`
  flex: 1 1 auto;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: row;
  height: inherit;
  align-items: stretch;
  > li:first-child {
    ${props => (props.hideRoot ? hide() : "")};
  }
`;

const Breadcrumb = styled.li`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  color: black;

  &:before {
    content: ">";
    transform: scaleX(0.5);
    display: flex;
    color: ${contrastColor(APP_TOOLBAR_BACKGROUND_COLOR, 0.8).string()};
    padding: 0 ${spacingScale(0.5)};
  }
  a {
    display: flex;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
    padding: ${spacingScale(1)} 0;
    color: ${contrastColor(APP_TOOLBAR_BACKGROUND_COLOR, 0.85).string()};
    &:hover {
      color: ${contrastColor(APP_TOOLBAR_BACKGROUND_COLOR, 1).string()};
    }
  }

  &:first-child {
    &:before {
      content: none;
    }
    a {
      padding-left: ${spacingScale(2)};
    }
  }
`;

/**
 * Stateless functional React component that renders the bar at top of main content with breadcrumbs represending client routing and a link to settings
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
function AppToolBar({ pathname, hideRoot, AppVersion, toolbarButtons = [] }) {
  return (
    <AppHeader>
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

      <Breadcrumbs hideRoot={hideRoot}>
        <Breadcrumb>
          <Link
            to={{
              pathname: "/",
              search: ""
            }}
          >
            fabric
          </Link>
        </Breadcrumb>
        {//strip out leading slashes to get route as array
        pathname
          .replace(/^\/|\/$/g, "")
          .replace("%2F", "/") // String out escaped slashes if found
          .split("/")
          .map((val, idx) => (
            <Breadcrumb key={val}>
              <Link to={`${pathname.substr(0, pathname.indexOf(val))}${val}`}>
                {val}
              </Link>
            </Breadcrumb>
          ))}
      </Breadcrumbs>

      <AppVersionLink
        href="https://github.com/DecipherNow/gm-fabric-dashboard/blob/master/CHANGELOG.md"
        rel="noopener noreferrer"
        target="_blank"
      >
        {AppVersion}
      </AppVersionLink>
      {toolbarButtons && (
        <ButtonGroup toolbar>
          {toolbarButtons.map(button => (
            <NavButton
              key={button.path}
              hideLabel
              icon={button.icon}
              label={button.label}
              outline={"none"}
              to={button.path}
            />
          ))}
        </ButtonGroup>
      )}
    </AppHeader>
  );
}

export default AppToolBar;
