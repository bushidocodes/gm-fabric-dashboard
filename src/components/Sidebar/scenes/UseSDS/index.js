import React from "react";
import FabricSidebarContent from "./components/SidebarContent";
import SummaryBar from "../../components/SummaryBar";
import FabricSidebarNavWidget from "./components/SidebarNavWidget";

/**
 * Main Sidebar component
 * @export
 * @returns JSX.Element
 */
export default function Sidebar() {
  return (
    <SummaryBar>
      <FabricSidebarNavWidget />
      <FabricSidebarContent />
    </SummaryBar>
  );
}
