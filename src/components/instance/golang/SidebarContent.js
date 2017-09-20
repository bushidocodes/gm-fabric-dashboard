import React from "react";
import ms from "ms";
import { PropTypes } from "prop-types";

import SidebarCard from "../../SidebarCard";
import { getLatestAttribute } from "../../../utils/latestAttribute";

SidebarContent.propTypes = {
  basePath: PropTypes.string,
  metrics: PropTypes.object.isRequired,
  sidebarCards: PropTypes.array
};

/**
 * Golang Sidebar Content
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
            value: ms(uptime)
          }
        ]}
        tabIndex={1}
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
        tabIndex={1}
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
        tabIndex={1}
        title="Functions"
      />
      {sidebarCards}
      <SidebarCard
        href={`${basePath}/explorer`}
        icon="search"
        tabIndex={8}
        title="Explorer"
      />
    </div>
  );
}