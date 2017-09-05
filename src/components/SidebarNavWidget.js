import React from "react";
import { Link } from "react-router-dom";
import { getServicename, getBackButtonUrl } from "../utils/head";

/** Sidebar Nav Component */
function SidebarNavWidget() {
  return (
    <div className="nav-widget">
      <a className="nav-go-up" href={getBackButtonUrl()}>
        <span className="icon" data-uk-icon={`icon: chevron-left; ratio: 1`} />
        <span className="label">{getServicename()}</span>
      </a>
      <a className="nav-siblings">
        <span className="label">{"Instance 1"}</span>
        <span className="icon" data-uk-icon={`icon: triangle-down; ratio: 1`} />
      </a>
      <div
        className="nav-siblings-dropdown"
        data-uk-dropdown="mode: click; pos: bottom-justify; boundary: .nav-widget; boundary-align: true; offset: 1;"
      >
        <ol className="instances">
          {Array(15)
            .fill("shanberg")
            .map((val, idx) => (
              <li key={idx}>
                <Link to="">Instance {idx + 1}</Link>
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
}

export default SidebarNavWidget;
