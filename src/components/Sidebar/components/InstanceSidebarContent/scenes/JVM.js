import React from "react";
import _ from "lodash";
// pretty-ms: Convert milliseconds to a human readable string: 1337000000 → 15d 11h 23m 20s
import prettyMS from "pretty-ms";
import { PropTypes } from "prop-types";

import SidebarCard from "../../../../../components/Sidebar/components/SidebarCard";

import { getLatestAttribute } from "../../../../../utils/latestAttribute";
import { getSparkLineOfValue } from "../../../../../utils/sparklines";

SidebarContent.propTypes = {
  basePath: PropTypes.string,
  metrics: PropTypes.object.isRequired,
  sidebarCards: PropTypes.array
};

/**
 * JVM Sidebar Content
 * @export
 * @param {Object} props - See propTypes
 * @returns JSX.Element
 */
export default function SidebarContent({ basePath, metrics, sidebarCards }) {
  return (
    <div>
      <SidebarCard
        href={`${basePath}/summary`}
        icon="star"
        lines={[
          {
            name: "Uptime",
            value: prettyMS(
              _.round(getLatestAttribute(metrics, "jvm/uptime"), -3)
            )
          }
        ]}
        tabIndex={0}
        title="Summary"
      />
      <SidebarCard
        href={`${basePath}/routes`}
        icon="link"
        tabIndex={0}
        title="Routes"
      />
      <SidebarCard
        chartData={getSparkLineOfValue(metrics, "jvm/thread/count")}
        href={`${basePath}/threads`}
        icon="table"
        lines={[
          {
            name: "Threads",
            value: getLatestAttribute(metrics, "jvm/thread/count")
          }
        ]}
        tabIndex={0}
        title="Threads"
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
