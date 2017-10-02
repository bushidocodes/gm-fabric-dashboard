import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

import Collapse from "react-collapse";

import styled from "styled-components";

import SidebarContentSectionItem from "./SidebarContentSectionItem";
import TriangleDown from "../library/TriangleDown";
import IndicatorIcon from "../library/IndicatorIcon";

// styled components
const Header = styled.div`
  color: white;
  display: flex;
  background-color: #333333;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 2px;
  border-radius: 5px;
  border: 2px solid #333333;
  border-bottom-color: ${props => props.borderBottomColor};
`;

const HeaderPart1 = styled.span`min-width: 75%;`;

const HeaderPart2 = styled.span`
  text-align: left;
  margin: 0 10px 0 0;
  font-size: 0.8em;
  align-items: center;
  display: flex;
`;

const HeaderIcon = styled.span`margin: 0 10px 0 10px;`;
const ItemCount = styled.span`
  margin: 0 5px 0 10px;
  text-align: bottom;
`;

const Down = styled.span`align: center;`;

export default class SidebarContentSection extends Component {
  state = {
    isOpen: false
  };

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { header, services } = this.props;

    return (
      <div>
        <Header
          key={header}
          onClick={this.toggleStack}
          borderBottomColor={getColor(header)}
        >
          <HeaderPart1>
            <HeaderIcon>
              <IndicatorIcon color={"lightblue"} diameter={12} />
            </HeaderIcon>
            {header}
          </HeaderPart1>
          <HeaderPart2>
            {services.length > 1 && <ItemCount>{services.length}</ItemCount>}
            <Down>
              <TriangleDown fill="white" stroke="white" />
            </Down>
          </HeaderPart2>
        </Header>

        {_.map(services, ({ name, state, version, docsLink }) => {
          docsLink = docsLink || "example.com";
          return (
            <Collapse
              isOpened={this.state.isOpen}
              onClick={evt => {
                evt.stopPropagation();
              }}
            >
              <SidebarContentSectionItem
                href={docsLink}
                key={state}
                title={name}
                version={version}
              />
            </Collapse>
          );
        })}
      </div>
    );
  }
}

function getColor(state) {
  let color;

  switch (state.toLowerCase()) {
    case "warning":
      color = "#ffcc00";
      return color;
    case "down":
      color = "DarkRed";
      return color;
    case "stable":
    default:
      color = "green";
      return color;
  }
}

SidebarContentSection.propTypes = {
  header: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired
};
