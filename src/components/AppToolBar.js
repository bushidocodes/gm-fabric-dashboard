import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import NavButton from "./library/NavButton";

AppToolBar.propTypes = {
  pathname: PropTypes.string.isRequired
};

/**
 * Stateless functional React component that renders the bar at top of main content with breadcrumbs represending client routing and a link to settings
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
function AppToolBar({ pathname }) {
  return (
    <nav className="app-header app-toolbar">
      <ol className="app-breadcrumbs">
        <li className="app-breadcrumb">
          <Link to="/">root</Link>
        </li>
        {//strip out leading slashes to get route as array
        pathname
          .replace(/^\/|\/$/g, "")
          .replace("%2F", "/") // String out escaped slashes if found
          .split("/")
          .map((val, idx) => (
            <li className="app-breadcrumb" key={val}>
              <Link to={`${pathname.substr(0, pathname.indexOf(val))}${val}`}>
                {val}
              </Link>
            </li>
          ))}
      </ol>

      <NavButton
        icon={"cog"}
        label={"Settings"}
        outline={"none"}
        to={"/settings"}
      />
    </nav>
  );
}

export default AppToolBar;
