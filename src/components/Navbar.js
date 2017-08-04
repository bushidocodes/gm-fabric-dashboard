import React from "react";
import { NavLink } from "react-router-dom";

import decipherLogo from "../images/decipherLogo.svg";

const Navbar = () => {
  return (
    <nav className="app-header">
      <div className="brand">
        <img
          alt="Decipher Logo"
          className="brand-logo"
          src={decipherLogo}
          style={{ width: "20px" }}
        />
        <span className="brand-text" id="logo-text">
          Fabric
        </span>
      </div>

      <a
        className="app-version"
        href="https://github.com/DecipherNow/gm-fabric-dashboard/blob/master/CHANGELOG.md"
        rel="noopener noreferrer"
        target="_blank"
      >
        {"0.1.1"}
      </a>

      <NavLink className="btn settings-button" to="/settings">
        <span className="settings-cog" data-uk-icon="icon: cog; ratio: .84" />
      </NavLink>
    </nav>
  );
};

export default Navbar;
