import { PropTypes } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import InstanceHeaderContent from "components/AppHeader/components/InstanceHeaderContent";

Header.propTypes = {
  runtime: PropTypes.string
};

/**
 * Main Sidebar component
 * @export
 * @returns JSX.Element
 */
function Header({ runtime }) {
  return <InstanceHeaderContent runtime={runtime} />;
}

function mapStateToProps({ settings: { runtime } }) {
  return { runtime };
}

export default withRouter(connect(mapStateToProps)(Header));
