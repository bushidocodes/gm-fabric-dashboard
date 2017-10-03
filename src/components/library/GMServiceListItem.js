import React, { Component } from "react";
import PropTypes from "prop-types";
import IndicatorIcon from "./IndicatorIcon";
import Collapse from "react-collapse";
import { Link } from "react-router-dom";
import StatusIcon from "./StatusIcon";

import styled from "styled-components";

const Line = styled.div`
  display: flex;
  height: 30px;
  flex-direction: row;
  width: 100%;
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
  width: 15px;
  height: 15px;
`;
const ItemName = styled.span`
  display: inline-flex;
  margin: 0 0 0 5px;
  align-items: center;
`;

const ItemVersion = styled.span`
  font-size: 0.7em;
  margin: 0 0 0 5px;
  color: gray;
  display: inline-flex;
  align-items: center;
`;

const ServiceLink = styled.div`
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:focus {
    outline: none;
    background-color: #eee;
  }
  &:hover {
    background-color: #eee;
  }
`;

const DocLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const InstanceList = styled.ul`margin-left: 15px;`;

const InstanceListItem = styled.li`list-style-type: none;`;

export default class GMServiceListItem extends Component {
  static propTypes = {
    docsLink: PropTypes.string,
    instances: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    state: PropTypes.string,
    version: PropTypes.string
  };
  state = {
    isOpen: false
  };

  toggleDrawer = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { instances = [], name, state, version, docsLink } = this.props;

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
                <StatusIcon status={state} />
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
