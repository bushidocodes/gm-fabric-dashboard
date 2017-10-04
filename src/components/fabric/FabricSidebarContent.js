import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import FabricSidebarContentSection from "./FabricSidebarContentSection";
import TriangleDown from "../library/TriangleDown";
import IndicatorIcon from "../library/IndicatorIcon";

import { getSideBarContent } from "../../utils/selectors";

import Collapse from "react-collapse";

import styled from "styled-components";

// styled components

const Services = styled.div`
  padding: 10px 0 10px;
  background-color: #666666;
  border-radius: 5px;
`;

export const Header = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.span`min-width: 75%;`;

export const HeaderRight = styled.span`
  text-align: right;
  margin: 0 10px 0 0;
  justify-content: flex-end;
`;

const Section = styled.div`margin: 10px 0 10px;`;

const HeaderIcon = styled.span`margin: 0 10px 0 10px;`;

class FabricSidebarContent extends Component {
  state = {
    isOpen: false
  };

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { services } = this.props;

    // use hard-coded headers or pass them down?
    // using hard-coded headers for now as they are fixed
    const microserviceStatuses = ["STABLE", "WARNING", "DOWN"];

    return (
      <Services>
        <Header onClick={this.toggleStack}>
          <HeaderLeft>
            <HeaderIcon>
              <IndicatorIcon color={"white"} diameter={12} />
            </HeaderIcon>
            Services
          </HeaderLeft>
          <HeaderRight>
            <TriangleDown fill="white" stroke="white" />
          </HeaderRight>
        </Header>
        <Collapse
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          {microserviceStatuses.map(status => (
            <Section>
              <FabricSidebarContentSection
                status={status}
                services={services.filter(
                  service =>
                    service.state.toLowerCase() === status.toLowerCase()
                )}
              />
            </Section>
          ))}
        </Collapse>
      </Services>
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
  services: PropTypes.array
};
