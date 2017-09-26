import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import NavButton from "./library/NavButton";

AppToolBar.propTypes = {
  pathname: PropTypes.string.isRequired
};

const APP_HEADER_HEIGHT = 34;

const Breadcrumbs = styled.ol`
  flex: 1 1 auto;
  display: flex;
  margin: 0;
  padding: 0;
  flex-direction: row;
  height: inherit;
  align-items: stretch;
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
    opacity: 0.5;
    padding: 0 4px;
  }

  a {
    display: flex;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 8px 0;
    color: inherit;
    &:hover {
      color: black;
    }
  }

  &:first-child {
    &:before {
      content: none;
    }

    a {
      padding-left: 16px;
    }
  }
`;

const AppHeader = styled.nav`
  flex: 0 0 ${APP_HEADER_HEIGHT}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 4px;
  font-size: 14px;
  color: black;
`;

/**
 * Stateless functional React component that renders the bar at top of main content with breadcrumbs represending client routing and a link to settings
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
function AppToolBar({ pathname }) {
  return (
    <AppHeader>
      <Breadcrumbs>
        <Breadcrumb>
          <Link to="/">root</Link>
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

      <NavButton
        hideLabel
        icon={"cog"}
        label={"Settings"}
        outline={"none"}
        to={"/settings"}
      />
    </AppHeader>
  );
}

export default AppToolBar;
