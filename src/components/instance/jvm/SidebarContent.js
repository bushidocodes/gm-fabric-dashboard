import React from "react";
import ms from "ms";
import { PropTypes } from "prop-types";

import SidebarCard from "../../SidebarCard";

import { getLatestAttribute } from "../../../utils/latestAttribute";
import { getSparkLineOfValue } from "../../../utils/sparklines";

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
            value: ms(getLatestAttribute(metrics, "jvm/uptime"))
          }
        ]}
        tabIndex={1}
        title="Summary"
      />
      <SidebarCard
        href={`${basePath}/route`}
        icon="link"
        tabIndex={3}
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
        tabIndex={4}
        title="Threads"
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
