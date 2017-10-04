import React, { Component } from "react";
import PropTypes from "prop-types";
import Collapse from "react-collapse";
import { Link } from "react-router-dom";
import StatusIcon from "./StatusIcon";

import styled from "styled-components";
import { COLOR_HIGHLIGHT, FONT_SIZE_XS } from "../../style/styleVariables";
import { spacingScale } from "../../style/styleFunctions";

const Line = styled.div`
  display: flex;
  height: ${spacingScale(3)};
  flex-direction: row;
  width: 100%;
  padding: 0 ${spacingScale(2)};
`;

const LineLeft = styled.div`
  flex: 1 1 auto;
  display: flex;
  min-width: 70%;
`;

const LineRight = styled.div`
  flex: 0 1 auto;
  text-align: right;
`;

const IconWrapper = styled.div`
  display: inline-block;
  position: relative;
  top: -3px;
  margin-right: ${spacingScale(1)};
  width: ${spacingScale(3)};
  height: ${spacingScale(3)};
`;

const ItemName = styled.span`
  display: inline-flex;
  margin-right: ${spacingScale(1)};
  align-items: center;
`;

const ItemVersion = styled.span`
  font-size: ${FONT_SIZE_XS};
  margin: 0 0 0 ${spacingScale(0.25)};
  color: gray;
  display: inline-flex;
  align-items: center;
`;

const ServiceLink = styled.div`
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  color: black;
  outline: none;
`;

const DocLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const InstanceList = styled.ul`margin: 0 0 0 ${spacingScale(2)};`;

const InstanceListItem = styled.li`
  list-style-type: none;
  a {
    opacity: 0.8;
    &,
    &:hover,
    &:active,
    &:focus {
      color: ${COLOR_HIGHLIGHT.hsl()
        .darken(0.2)
        .string()};
    }

    &:hover {
      opacity: 1;
    }
  }
`;

export default class GMServiceListItem extends Component {
  static propTypes = {
    docsLink: PropTypes.string,
    instances: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string,
    version: PropTypes.string
  };
  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { instances = [], name, status, version, docsLink } = this.props;

    return (
      <div>
        <Line>
          <LineLeft>
            <ServiceLink
              onClick={instances.length > 0 ? this.toggleDrawer : () => {}}
              onKeyDown={evt => {
                if (
                  instances.length &&
                  (evt.keyCode === 13 || evt.keyCode === 32)
                ) {
                  evt.preventDefault();
                  this.toggleDrawer();
                }
              }}
              role="Link"
              tabIndex="0"
            >
              <IconWrapper>
                <StatusIcon status={status} />
              </IconWrapper>
              <ItemName>{name}</ItemName>
              <ItemVersion>{version}</ItemVersion>
            </ServiceLink>
          </LineLeft>
          <LineRight>
            {docsLink && <DocLink href={docsLink}>Docs</DocLink>}
          </LineRight>
        </Line>
        <Collapse
          className="table-drawer"
          isOpened={this.state.isOpen}
          onClick={evt => {
            evt.stopPropagation();
          }}
        >
          <InstanceList>
            {instances.map(instance => (
              <InstanceListItem key={instance}>
                <Link to={`/${name}/${version}/${instance}`}> {instance} </Link>
              </InstanceListItem>
            ))}
          </InstanceList>
        </Collapse>
      </div>
    );
  }
}
