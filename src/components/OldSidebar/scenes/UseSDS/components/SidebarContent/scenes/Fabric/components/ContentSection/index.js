import _ from "lodash";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Collapse from "react-collapse";

import Item from "./components/Item";
import Header from "./components/Header";

import TriangleDown from "../../../../../../../../../TriangleDown";
import StatusIcon from "../../../../../../../../../StatusIcon";
import HeaderLeft from "../../../../../../../../components/HeaderLeft";
import HeaderRight from "../../../../../../../../components/HeaderRight";
import HeaderRightContent from "../../../../../../../../components/HeaderRightContent";
import HeaderIcon from "../../../../../../../../components/HeaderIcon";
import { mapStatusToColor } from "style/styleFunctions";

export default class FabricSidebarContentSection extends Component {
  static propTypes = {
    historyPush: PropTypes.func.isRequired,
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
    const { historyPush, status, services } = this.props;

    return (
      <div>
        <Header
          key={status}
          onClick={this.toggleStack}
          onKeyDown={e => {
            if (e.keyCode === 13 || e.keyCode === 32) {
              e.preventDefault();
              this.toggleStack();
            }
          }}
          tabIndex="0"
          borderBottomColor={mapStatusToColor(status).string()}
        >
          <HeaderLeft>
            <HeaderIcon>
              <StatusIcon status={status} />
            </HeaderIcon>
            {status}
          </HeaderLeft>
          <HeaderRight>
            <div>{services.length > 0 && services.length}</div>
            <HeaderRightContent>
              <TriangleDown fill="white" stroke="white" />
            </HeaderRightContent>
          </HeaderRight>
        </Header>

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
              <Item
                href={docsLink}
                historyPush={historyPush}
                key={state}
                name={name}
                status={status}
                version={version}
              />
            </Collapse>
          );
        })}
      </div>
    );
  }
}
