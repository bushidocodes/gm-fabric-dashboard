import React, { Component } from "react";
import PropTypes from "prop-types";

import StatusIcon from "../../../../../../../../../../../StatusIcon";
import Docs from "../../../../../../../../../../../../images/icons/docs.svg";
import { Line, LineLeft, LineRight } from "./components/Line";
import { ItemName, ItemVersion, ItemInfo } from "./components/Item";
import IconWrapper from "./components/IconWrapper";
import DocLink from "./components/DocLink";
import GMLink from "../../../../../../../GMLink";

export default class GMServiceListItem extends Component {
  static propTypes = {
    authorized: PropTypes.bool,
    docsLink: PropTypes.string,
    groupByAttribute: PropTypes.string,
    instances: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string,
    version: PropTypes.string
  };

  render() {
    const {
      authorized,
      instances = [],
      name,
      status,
      version,
      docsLink,
      groupByAttribute = ""
    } = this.props;

    return (
      <div>
        <Line>
          <LineLeft>
            {authorized ? (
              <GMLink
                to={`/${name}/${version}`}
                onClick={status === "Down" ? e => e.preventDefault() : null}
                cursor={instances.length > 0 ? "pointer" : "not-allowed"}
                tabIndex="0"
                disabled={status === "Down"}
              >
                <IconWrapper>
                  {groupByAttribute.toLowerCase() !== "status" && (
                    <StatusIcon status={status} />
                  )}
                </IconWrapper>
                <ItemName>{name}</ItemName>
                <ItemVersion>{version}</ItemVersion>
              </GMLink>
            ) : (
              <ItemInfo tabIndex="0">
                <IconWrapper>
                  {groupByAttribute.toLowerCase() !== "status" && (
                    <StatusIcon status={status} />
                  )}
                </IconWrapper>
                <ItemName>{name}</ItemName>
                <ItemVersion>{version}</ItemVersion>
              </ItemInfo>
            )}
          </LineLeft>
          <LineRight>
            {docsLink && (
              <DocLink href={docsLink} target="_blank">
                <img alt="Docs" src={Docs} />
              </DocLink>
            )}
          </LineRight>
        </Line>
      </div>
    );
  }
}
