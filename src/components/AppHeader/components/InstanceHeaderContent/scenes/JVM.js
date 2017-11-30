import _ from "lodash";

import React from "react";
import { PropTypes } from "prop-types";

import ThreadCounts from "components/ThreadCounts";
import UpTime from "components/UpTime";
import Tab from "components/AppHeader/components/Tab";
import TabNav from "components/AppHeader/components/TabNav";
import { getLatestAttribute } from "utils/latestAttribute";
import { getSparkLineOfValue } from "utils/sparklines";
import ArrayValue from "components/ArrayValue";
import { metricsShape } from "components/PropTypes";

SidebarContent.propTypes = {
  basePath: PropTypes.string,
  headerTabs: PropTypes.arrayOf(PropTypes.element),
  metrics: metricsShape.isRequired
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
        icon="Summary"
        lines={[
          {
            name: "Uptime",
            value: (
              <UpTime
                startTime={getLatestAttribute(metrics, "jvm/start_time")}
                render={uptime => (
                  <ArrayValue>
                    {_.map(uptime, el => <span key={el}>{el} </span>)}
                  </ArrayValue>
                )}
              />
            )
          }
        ]}
        title="Summary"
      />
      <Tab
        href={`${basePath}/routes`}
        icon="Functions"
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
        icon="Threads"
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
      <Tab href={`${basePath}/explorer`} icon="Explorer" title="Explorer" />
      {/* <Tab
          href={`${basePath}/configuration`}
          icon="search"
          title="Configuration"
        />
      </TabGroup> */}
    </TabNav>
  );
}
