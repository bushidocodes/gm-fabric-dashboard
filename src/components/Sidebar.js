import React from "react";
import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarNavWidget from "./SidebarNavWidget";

/**
 * Main Sidebar component 
 * @export
 * @returns JSX.Element
 */
export default function Sidebar() {
  /* Note: the following backgroundImage tag was inlined to get the URL to properly resolve.*/
  /* This is currently resulting in a flicker on initial load, as the inline styles load first.*/
  return (
    <nav className="app-sidebar">
      <SidebarHeader />
      <div className="summary-bar">
        <SidebarNavWidget />
        <SidebarContent />
      </div>
      <SidebarFooter />
    </nav>
  );
}