import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

import Collapse from "react-collapse";

import styled from "styled-components";

import SidebarCard from "../SidebarCard";
import SidebarContentSectionItem from "./SidebarContentSectionItem";
import TriangleDown from "../library/TriangleDown";
import IndicatorIcon from "../library/IndicatorIcon";

// styled components
const Header = styled.div`
  color: green;
  display: flex;
`;

const HeaderPart1 = styled.span`
  // flex-grow: 3;
  min-width: 75%;
`;

const HeaderPart2 = styled.span`
  // flex-grow: 1;
  text-align: left;
  margin: 0 10px 0 0;
`;

const HeaderIcon = styled.span`margin: 0 10px 0 10px;`;
const ItemCount = styled.span`margin: 0 5px 0 10px;`;

export default class SidebarContentSection extends Component {
  state = {
    isOpen: false
  };

  toggleStack = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { header, services } = this.props;

    console.log("services sidebarcontentsection", services);
    return (
      <div>
        <Header key={header} onClick={this.toggleStack}>
          <HeaderPart1>
            <HeaderIcon>
              <IndicatorIcon color={"lightblue"} diameter={12} />
            </HeaderIcon>
            {header}
          </HeaderPart1>
          <HeaderPart2>
            {services.length > 1 && <ItemCount>{services.length}</ItemCount>}
            <TriangleDown fill="gray" stroke="gray" />
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

SidebarContentSection.propTypes = {
  header: PropTypes.string.isRequired,
  services: PropTypes.array.isRequired
};
