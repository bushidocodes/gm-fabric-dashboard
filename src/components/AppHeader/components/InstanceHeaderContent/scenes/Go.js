import React from "react";
import { PropTypes } from "prop-types";

import { getLatestAttribute } from "../../../../../utils/latestAttribute";
import { convertMS } from "../../../../../utils";
import Tab from "../../Tab";
import TabNav from "../../TabNav";
// import TabGroup from "../../TabGroup";

SidebarContent.propTypes = {
  basePath: PropTypes.string,
  headerTabs: PropTypes.array,
  metrics: PropTypes.object.isRequired
};

/**
 * Go Sidebar Content
 * @export
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
export default function SidebarContent({ basePath, metrics, headerTabs }) {
  const startTime = getLatestAttribute(metrics, "system/start_time");
  const uptime = startTime > 0 ? Date.now() - startTime : 0;
  return (
    <TabNav>
      <Tab
        href={`${basePath}/summary`}
        icon="star"
        lines={[
          {
            name: "Uptime",
            value: convertMS(uptime)
          }
        ]}
        tabIndex={0}
        title="Summary"
      />
      <Tab
        href={`${basePath}/routes`}
        icon="link"
        lines={[
          {
            name: "Requests",
            value:
              getLatestAttribute(metrics, "HTTP/requests") +
              getLatestAttribute(metrics, "HTTPS/requests")
          }
        ]}
        tabIndex={0}
        title="Routes"
      />
      <Tab
        href={`${basePath}/functions`}
        icon="code"
        lines={[
          {
            name: "Requests",
            value: getLatestAttribute(metrics, "RPC/requests")
          }
        ]}
        tabIndex={0}
        title="Functions"
      />
      {headerTabs}
      {/* Holding off on the configuration tab until we have something to configure */}
      {/* <TabGroup> */}
      <Tab
        href={`${basePath}/explorer`}
        icon="search"
        tabIndex={0}
        title="Explorer"
      />
      {/* <Tab
          href={`${basePath}/configuration`}
          icon="search"
          tabIndex={0}
          title="Configuration"
        />
      </TabGroup> */}
    </TabNav>
  );
}
