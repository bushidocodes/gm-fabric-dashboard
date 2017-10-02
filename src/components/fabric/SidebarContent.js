import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

import SidebarCard from "../SidebarCard";
import InstanceSidebarContent from "../instance/SidebarContent";
import SidebarContentSection from "./SidebarContentSection";

import { getSideBarContent } from "../../utils/selectors";

import Collapse from "react-collapse";

import styled from "styled-components";

// styled components
const Header = styled.div`color: green;`;

export class FabricSidebarContent extends Component {
  state = {
    isOpen: false
  };

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { services } = this.props;
    console.log("services sidebarcontent", services);

    // use hard-coded headers or pass them down?
    // using hard-coded headers for now as they are fixed
    const sidebarHeaders = ["STABLE", "WARNING", "DOWN"];

    return (
      <div>
        <div>hello</div>
        {sidebarHeaders.map(header => (
          <SidebarContentSection
            header={header}
            services={services.filter(
              service => service.state.toLowerCase() === header.toLowerCase()
            )}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    services: getSideBarContent(state)
  };
}

export default withRouter(connect(mapStateToProps)(FabricSidebarContent));

FabricSidebarContent.propTypes = {
  services: PropTypes.object
};
