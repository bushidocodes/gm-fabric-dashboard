import React from "react";
import { PropTypes } from "prop-types";

import SidebarCard from "../../../../../components/Sidebar/components/SidebarCard";

import { getLatestAttribute } from "../../../../../utils/latestAttribute";

import prettyMS from "pretty-ms";
import _ from "lodash";

SidebarContent.propTypes = {
  basePath: PropTypes.string,
  metrics: PropTypes.object.isRequired,
  sidebarCards: PropTypes.array
};

/**
 * Go Sidebar Content
 * @export
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
export default function SidebarContent({ basePath, metrics, sidebarCards }) {
  const startTime = getLatestAttribute(metrics, "system/start_time");
  const uptime = startTime > 0 ? Date.now() - startTime : 0;
  return (
    <div>
      <SidebarCard
        href={`${basePath}/summary`}
        icon="star"
        lines={[
          {
            name: "Uptime",
            value: prettyMS(_.round(uptime, -3))
          }
        ]}
        tabIndex={0}
        title="Summary"
      />
      <SidebarCard
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
      <SidebarCard
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
      {sidebarCards}
      <SidebarCard
        href={`${basePath}/explorer`}
        icon="search"
        tabIndex={0}
        title="Explorer"
      />
    </div>
  );
}