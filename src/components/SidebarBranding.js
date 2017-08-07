import React from "react";

import fabricBackground from "../images/gm-fabric-bg.jpg";

const SidebarBranding = () => {
  return (
    <footer
      className="sidebar-footer-branding"
      style={{ backgroundImage: "url(" + fabricBackground + ")" }}
    >
      <a
        href="http://deciphernow.com/grey-matter"
        rel="noopener noreferrer"
        target="_blank"
      >
        Grey Matter
      </a>
    </footer>
  );
};

export default SidebarBranding;
