import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

import Collapse from "react-collapse";

import styled from "styled-components";

import FabricSidebarContentSectionItem from "./FabricSidebarContentSectionItem";
import TriangleDown from "../library/TriangleDown";
import StatusIcon from "../library/StatusIcon";
import { HeaderLeft, HeaderRight } from "./FabricSidebarContent";

const SectionHeader = styled.div`
  color: white;
  display: flex;
  background-color: #333333;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-radius: 5px;
  border: 1px solid #333333;
  border-bottom-color: ${props => props.borderBottomColor};
`;

const IconWrapper = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  margin-right: 5px;
`;
const ItemCount = styled.span`
  margin: 0 5px 0 10px;
  text-align: bottom;
`;

const Down = styled.span`align: center;`;

export default class FabricSidebarContentSection extends Component {
  static propTypes = {
    services: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired
  };

  state = {
    isOpen: false
  };

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { status, services } = this.props;

    return (
      <div>
        <SectionHeader
          key={status}
          onClick={this.toggleStack}
          borderBottomColor={getColor(status)}
        >
          <HeaderLeft>
            <IconWrapper>
              <StatusIcon status={status} />
            </IconWrapper>
            {status}
          </HeaderLeft>
          <HeaderRight>
            {services.length > 1 && <ItemCount>{services.length}</ItemCount>}
            <Down>
              <TriangleDown fill="white" stroke="white" />
            </Down>
          </HeaderRight>
        </SectionHeader>

        {_.map(services, ({ name, state, version, docsLink }) => {
          // docsLink = docsLink || "example.com";
          return (
            <Collapse
              key={`${name}${version}`}
              isOpened={this.state.isOpen}
              onClick={evt => {
                evt.stopPropagation();
              }}
            >
              <FabricSidebarContentSectionItem
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

/**
 *
 * Takes string representation of state and returns corresponding color string(orange-tan, dark red, green) for border-color/icon
 * @param {string} state
 * @returns {string}
 */
function getColor(state) {
  switch (state.toLowerCase()) {
    case "warning":
      return "#ffcc00"; // color orange-tan
    case "down":
      return "DarkRed";
    case "stable":
    default:
      return "green";
  }
}
