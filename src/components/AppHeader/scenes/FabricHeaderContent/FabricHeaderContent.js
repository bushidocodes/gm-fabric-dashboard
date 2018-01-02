import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { microserviceStatuses } from "utils/constants";
import { getStatusCount } from "utils/selectors";

import Tab from "components/AppHeader/components/Tab";
import TabNav from "components/AppHeader/components/TabNav";

FabricAppHeaderContent.propTypes = {
  statusCount: PropTypes.shape({
    Down: PropTypes.number,
    Stable: PropTypes.number,
    Warning: PropTypes.number,
    total: PropTypes.number.isRequired
  })
};

function FabricAppHeaderContent({ statusCount }) {
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
    statusCount: getStatusCount(state)
  };
}

export default withRouter(connect(mapStateToProps)(FabricAppHeaderContent));
