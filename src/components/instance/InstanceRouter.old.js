// UNUSED

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SummaryGrid from "./SummaryGrid";
import ThreadsGrid from "./ThreadsGrid";
import Explorer from "./Explorer";
import GMGrid from "./GMGrid";
import RoutesGrid from "./RoutesGrid";
import NotFound from "./NotFound";
import { withRouter, Route, Redirect, Switch } from "react-router-dom";
import { Actions } from "jumpstate";

class InstanceRouter extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    selectedInstance: PropTypes.string
  };

  componentDidMount() {
    Actions.selectInstance({
      instanceID: this.props.match.params.instanceID,
      serviceName: this.props.match.params.serviceName
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedInstance !== nextProps.match.params.instanceID) {
      Actions.selectInstance({
        instanceID: nextProps.match.params.instanceID,
        serviceName: nextProps.match.params.serviceName
      });
    }
  }

  render() {
    const { match } = this.props;
    // Exclude trailing slash if it exists to match with or without slash
    const baseURL =
      match.url[match.url.length - 1] === "/"
        ? match.url.slice(0, -1)
        : match.url;
    return (
      <Switch>
        <Route
          exact
          path={match.url}
          render={() => <Redirect to={baseURL + "/summary"} />}
        />
        <Route component={SummaryGrid} path={baseURL + "/summary"} />}
        <Route component={ThreadsGrid} path={baseURL + "/threads"} />}
        <Route component={Explorer} path={baseURL + "/explorer"} />
        <Route component={RoutesGrid} path={baseURL + "/route"} />}
        <Route component={GMGrid} path={baseURL + "/:dashboardName"} />
        <Route component={NotFound} path="*" />
      </Switch>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    selectedInstance: state.settings.selectedInstance,
    service: state.fabric.services[ownProps.match.params.serviceName]
  };
}
export default connect(mapStateToProps)(withRouter(InstanceRouter));
