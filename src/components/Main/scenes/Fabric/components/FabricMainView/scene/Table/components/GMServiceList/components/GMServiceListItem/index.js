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
import GMLink from "components/Main/scenes/Fabric/components/GMLink";

export default class GMServiceListItem extends Component {
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

    let SERVICE_IS_ACCESSIBLE = true;
    if (!authorized || !metered || status === "Down") {
      SERVICE_IS_ACCESSIBLE = false;
    }

    return (
      <Line>
        <LineLeft>
          <GMLink
            to={`/${name}/${version}`}
            onClick={SERVICE_IS_ACCESSIBLE ? null : e => e.preventDefault()}
            tabIndex="0"
            disabled={!SERVICE_IS_ACCESSIBLE}
          >
            <IconWrapper>
              {groupByAttribute.toLowerCase() !== "status" && (
                <StatusIcon status={status} />
              )}
            </IconWrapper>
            {!metered && (
              <ItemIcon>
                <Icon title="Metrics are not available for this service.">
                  <NoMetrics />
                </Icon>
              </ItemIcon>
            )}
            {!authorized && (
              <ItemIcon>
                <Icon title="You do not have permission to manage this service.">
                  <NoKey />
                </Icon>
              </ItemIcon>
            )}
            <ItemName clickable={SERVICE_IS_ACCESSIBLE}>{name}</ItemName>
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
              <Icon>
                <Docs />
              </Icon>{" "}
            </DocsLink>
          )}
        </LineRight>
      </Line>
    );
  }
}
