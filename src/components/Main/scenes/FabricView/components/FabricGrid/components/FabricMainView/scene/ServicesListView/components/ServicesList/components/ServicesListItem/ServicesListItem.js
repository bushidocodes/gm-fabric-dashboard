import React, { Component } from "react";
import PropTypes from "prop-types";

import { Line, LineLeft, LineRight } from "./components/Line";
import {
  ItemName,
  ItemVersion,
  ItemIcon,
  ItemRuntime
} from "./components/Item";
import IconWrapper from "./components/IconWrapper";
import DocsLink from "./components/DocsLink";

import Icon from "components/Icon";
import NoKey from "components/Glyphs/NoKey";
import Docs from "components/Glyphs/Docs";
import NoMetrics from "components/Glyphs/NoMetrics";

import StatusIcon from "components/StatusIcon";
import GMLink from "components/Main/scenes/FabricView/components/GMLink";

export default class ServicesListItem extends Component {
  static propTypes = {
    authorized: PropTypes.bool,
    docsLink: PropTypes.string,
    groupByAttribute: PropTypes.string,
    metered: PropTypes.bool,
    name: PropTypes.string.isRequired,
    runtime: PropTypes.string,
    status: PropTypes.string,
    version: PropTypes.string
  };

  render() {
    const {
      authorized,
      metered,
      name,
      runtime,
      status,
      version,
      docsLink,
      groupByAttribute = ""
    } = this.props;

    let isAccessible = true;
    if (!authorized || !metered || status === "Down") {
      isAccessible = false;
    }

    let title = name;
    if (!metered) {
      title = "Metrics are not available for this service.";
    } else if (!authorized) {
      title = "You do not have permission to manage this service.";
    }

    return (
      <Line>
        <LineLeft>
          <GMLink
            disabled={!isAccessible}
            onClick={isAccessible ? null : e => e.preventDefault()}
            tabIndex="0"
            title={title}
            to={`/${name}/${version}`}
          >
            <IconWrapper>
              {groupByAttribute.toLowerCase() !== "status" && (
                <StatusIcon status={status} />
              )}
            </IconWrapper>
            {!metered && (
              <ItemIcon>
                <Icon title="No Metrics">
                  <NoMetrics />
                </Icon>
              </ItemIcon>
            )}
            {!authorized && (
              <ItemIcon>
                <Icon title="Not Authorized">
                  <NoKey />
                </Icon>
              </ItemIcon>
            )}
            <ItemName clickable={isAccessible}>{name}</ItemName>
            <ItemRuntime>
              <span>{runtime}</span>
            </ItemRuntime>
          </GMLink>
        </LineLeft>
        <LineRight>
          <ItemVersion>
            <span>{version}</span>
          </ItemVersion>
          {docsLink && (
            <DocsLink href={docsLink} target="_blank">
              <Icon title="API Documentation">
                <Docs />
              </Icon>{" "}
            </DocsLink>
          )}
        </LineRight>
      </Line>
    );
  }
}
