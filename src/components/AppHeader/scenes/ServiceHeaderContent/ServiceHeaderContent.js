import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { injectIntl, intlShape } from "react-intl";

ServiceHeaderContent.propTypes = {
  instanceCount: PropTypes.number,
  intl: intlShape.isRequired,
  pathname: PropTypes.string
};

function ServiceHeaderContent({ instanceCount, pathname, intl }) {
  return null;
}

function mapStateToProps(state, ownProps) {
  const { fabric: { services } } = state;
  const {
    match: { params: { selectedServiceSlug } },
    location: { pathname }
  } = ownProps;
  return {
    instanceCount:
      services &&
      services[selectedServiceSlug] &&
      services[selectedServiceSlug].instances &&
      services[selectedServiceSlug].instances.length,
    pathname
  };
}

export default withRouter(
  connect(mapStateToProps)(injectIntl(ServiceHeaderContent))
);
