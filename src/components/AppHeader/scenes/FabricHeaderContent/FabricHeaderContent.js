import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";

import { getStatusCount } from "utils/selectors";

FabricAppHeaderContent.propTypes = {
  intl: PropTypes.object.isRequired,
  statusCount: PropTypes.shape({
    Down: PropTypes.number,
    Stable: PropTypes.number,
    Warning: PropTypes.number,
    total: PropTypes.number.isRequired
  })
};

function FabricAppHeaderContent({ statusCount, intl }) {
  return null;
}

function mapStateToProps(state) {
  return {
    intl: intlShape.isRequired,
    statusCount: getStatusCount(state)
  };
}

export default withRouter(
  connect(mapStateToProps)(injectIntl(FabricAppHeaderContent))
);
