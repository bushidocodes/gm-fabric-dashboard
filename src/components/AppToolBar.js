import { PropTypes } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import NavButton from "./NavButton.js";

AppToolBar.propTypes = {
  pathname: PropTypes.string.isRequired
};

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
