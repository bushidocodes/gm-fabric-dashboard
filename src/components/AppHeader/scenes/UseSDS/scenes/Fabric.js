import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { microserviceStatuses } from "utils/constants";
import { getAppHeaderContent, getStatusCount } from "utils/selectors";

import Tab from "components/AppHeader/components/Tab";
import TabNav from "components/AppHeader/components/TabNav";

// TODO: Replace statusCount with PropType of shape
// TODO: Tighten down what is in the services array
FabricAppHeaderContent.propTypes = {
  services: PropTypes.array,
  statusCount: PropTypes.object
};

// TODO: replace chartData & lines with something dynamic. Refer to issue #786
function FabricAppHeaderContent({ statusCount, services }) {
  return (
    <TabNav>
      <Tab
        title="All Services"
        href="/"
        icon="Summary"
        lines={[
          {
            name: "Services",
            value: statusCount.total
          }
        ]}
      />
      {microserviceStatuses.map(status => {
        return (
          <Tab
            title={status}
            href={`/${status}`}
            icon={status}
            lines={[
              {
                name: "Services",
                value: statusCount[status]
              }
            ]}
            key={status}
          />
        );
      })}
    </TabNav>
  );
}

function mapStateToProps(state) {
  return {
    services: getAppHeaderContent(state),
    statusCount: getStatusCount(state)
  };
}

export default withRouter(connect(mapStateToProps)(FabricAppHeaderContent));
