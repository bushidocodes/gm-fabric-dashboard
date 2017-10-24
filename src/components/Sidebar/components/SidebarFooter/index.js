import React from "react";
import Footer from "./components/Footer";
import FooterLink from "./components/FooterLink";

/** Bottom component of sidebar */
const SidebarFooter = () => {
  return (
    <Footer>
      <FooterLink
        href="http://deciphernow.com/grey-matter"
        rel="noopener noreferrer"
        target="_blank"
      >
        Grey Matter
      </FooterLink>
    </Footer>
  );
};

export default SidebarFooter;
