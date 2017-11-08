import _ from "lodash";
import React from "react";
import { PropTypes } from "prop-types";

import { getLatestAttribute } from "utils/latestAttribute";
import Tab from "components/AppHeader/components/Tab";
import TabNav from "components/AppHeader/components/TabNav";
import UpTime from "components/UpTime";

import ArrayValue from "components/ArrayValue";

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
  return (
    <TabNav>
      <Tab
        href={`${basePath}/summary`}
        icon="star"
        lines={[
          {
            name: "Uptime",
            value: (
              <UpTime
                startTime={getLatestAttribute(metrics, "system/start_time")}
                render={uptime => (
                  <ArrayValue>
                    {_.map(uptime, el => <span>{el} </span>)}
                  </ArrayValue>
                )}
              />
            )
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
