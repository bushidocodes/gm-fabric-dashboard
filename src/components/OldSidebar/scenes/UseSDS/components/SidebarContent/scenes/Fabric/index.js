import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Collapse from "react-collapse";

import FabricSidebarContentSection from "./components/ContentSection";

import ServicesActive from "../../../../../../components/ServicesActive";
import Section from "../../../../../../components/Section";
import Header from "../../../../../../components/Header";
import HeaderIcon from "../../../../../../components/HeaderIcon";
import HeaderLeft from "../../../../../../components/HeaderLeft";
import HeaderRight from "../../../../../../components/HeaderRight";
import HeaderRightContent from "../../../../../../components/HeaderRightContent";

import TriangleDown from "../../../../../../../TriangleDown";
import { getSideBarContent } from "../../../../../../../../utils/selectors";
import { microserviceStatuses } from "../../../../../../../../utils/constants";
import ServicesIcon from "../../../../../../../../images/icons/servicesWhite.svg";

class FabricSidebarContent extends Component {
  state = {
    isOpen: true
  };

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { services, history: { push } } = this.props;
    return (
      <ServicesActive>
        <Header
          tabIndex="0"
          onClick={this.toggleStack}
          onKeyDown={e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
              e.preventDefault();
              this.toggleStack();
            }
          }}
        >
          <HeaderLeft>
            <HeaderIcon>
              <img src={ServicesIcon} alt="" />
            </HeaderIcon>
            Services
          </HeaderLeft>
          <HeaderRight>
            <HeaderRightContent>
              <TriangleDown fill="white" stroke="white" />
            </HeaderRightContent>
          </HeaderRight>
        </Header>
        <Collapse
          isOpened={this.state.isOpen}
          hasNestedCollapse={true}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          {microserviceStatuses.map(status => (
            <Section key={status}>
              <FabricSidebarContentSection
                status={status}
                historyPush={push}
                services={services.filter(service => {
                  return service.status.toLowerCase() === status.toLowerCase();
                })}
              />
            </Section>
          ))}
        </Collapse>
      </ServicesActive>
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
  history: PropTypes.object,
  services: PropTypes.array
};
