import React from "react";
import { PropTypes } from "prop-types";

import { getLatestAttribute } from "../../../../../utils/latestAttribute";
import { getSparkLineOfValue } from "../../../../../utils/sparklines";
import { convertMS } from "../../../../../utils";
import Tab from "../../Tab";
import TabNav from "../../TabNav";
// import TabGroup from "../../TabGroup";

import ThreadCounts from "components/library/ThreadCounts";

SidebarContent.propTypes = {
  basePath: PropTypes.string,
  headerTabs: PropTypes.array,
  metrics: PropTypes.object.isRequired
};

/**
 * JVM Sidebar Content
 * @export
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
export default function SidebarContent({ basePath, metrics, headerTabs }) {
  return (
    <TabNav>
      <Tab
        href={`${basePath}/summary`}
        icon="star"
        lines={[
          {
            name: "Uptime",
            value: convertMS(getLatestAttribute(metrics, "jvm/uptime"))
          }
        ]}
        title="Summary"
      />
      <Tab
        href={`${basePath}/routes`}
        icon="link"
        lines={[
          {
            name: "Requests",
            value:
              getLatestAttribute(metrics, "http/requests") +
              getLatestAttribute(metrics, "https/requests")
          }
        ]}
        title="Routes"
      />
      <Tab
        chartData={getSparkLineOfValue(metrics, "jvm/thread/count")}
        href={`${basePath}/threads`}
        icon="table"
        lines={[
          {
            name: "Threads",
            value: <ThreadCounts render={threadCounts => threadCounts.all} />
          }
        ]}
        title="Threads"
      />
      {headerTabs}
      {/* Holding off on the configuration tab until we have something to configure */}
      {/* <TabGroup> */}
      <Tab href={`${basePath}/explorer`} icon="search" title="Explorer" />
      {/* <Tab
          href={`${basePath}/configuration`}
          icon="search"
          title="Configuration"
        />
      </TabGroup> */}
    </TabNav>
  );
}
