import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import Breadcrumb from "./components/Breadcrumb";
import Breadcrumbs from "./components/Breadcrumbs";
import AppHeader from "./components/AppHeader";

import NavButton from "../../../NavButton";

AppToolbar.propTypes = {
  pathname: PropTypes.string.isRequired
};

/**
 * Stateless functional React component that renders the bar at top of main content with breadcrumbs represending client routing and a link to settings
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
function AppToolbar({ pathname }) {
  return (
    <AppHeader>
      <Breadcrumbs>
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

export default AppToolbar;
