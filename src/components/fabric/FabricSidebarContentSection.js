import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";

import Collapse from "react-collapse";

import styled from "styled-components";

import FabricSidebarContentSectionItem from "./FabricSidebarContentSectionItem";
import TriangleDown from "../library/TriangleDown";
import StatusIcon from "../library/StatusIcon";
import { HeaderLeft, HeaderRight } from "./FabricSidebarContent";
import {
  FONT_SIZE_SM,
  COLOR_SIDEBAR_BACKGROUND
} from "../../style/styleVariables";
import {
  mapStatusToColor,
  spacingScale,
  contrastColor
} from "../../style/styleFunctions";

const SectionHeader = styled.div`
  color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 0.35)
    .hsl()
    .string()};
  display: flex;
  font-size: ${FONT_SIZE_SM};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  align-items: center;
  font-weight: 700;
  justify-content: space-between;
  padding: ${spacingScale(0.25)} 0;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    left: 0;
    right: 0;
    background-image: linear-gradient(
      to right,
      ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 0.65)
        .hsl()
        .string()},
      ${props => props.borderBottomColor}
    );
  }

  &:hover {
    color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 0.1)
      .hsl()
      .string()};
    cursor: pointer;
  }
  &:active {
    color: ${contrastColor(COLOR_SIDEBAR_BACKGROUND, 0)
      .hsl()
      .string()};
  }
`;

const IconWrapper = styled.div`
  display: inline-block;
  width: ${spacingScale(2)};
  height: ${spacingScale(2)};
  margin-left: ${spacingScale(0.75)};
  margin-right: ${spacingScale(0.75)};
  position: relative;
  top: -2px;
`;
const ItemCount = styled.span`
  margin: 0 ${spacingScale(0.5)} 0 ${spacingScale(1)};
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
          borderBottomColor={mapStatusToColor(status).string()}
        >
          <HeaderLeft>
            <IconWrapper>
              <StatusIcon status={status} />
            </IconWrapper>
            {status}
          </HeaderLeft>
          <HeaderRight>
            {services.length > 0 && <ItemCount>{services.length}</ItemCount>}
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
