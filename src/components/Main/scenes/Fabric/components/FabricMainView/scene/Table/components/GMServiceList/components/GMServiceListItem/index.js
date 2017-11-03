import React, { Component } from "react";
import PropTypes from "prop-types";

import StatusIcon from "../../../../../../../../../../../StatusIcon";
import Docs from "images/icons/docs.svg";
import { Line, LineLeft, LineRight } from "./components/Line";
import { ItemName, ItemVersion } from "./components/Item";
import IconWrapper from "./components/IconWrapper";
import DocLink from "./components/DocLink";
import GMLink from "../../../../../../../GMLink";

export default class GMServiceListItem extends Component {
  static propTypes = {
    authorized: PropTypes.bool,
    docsLink: PropTypes.string,
    groupByAttribute: PropTypes.string,
    metered: PropTypes.bool,
    name: PropTypes.string.isRequired,
    status: PropTypes.string,
    version: PropTypes.string
  };

  render() {
    const {
      authorized,
      metered,
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
            <GMLink
              to={`/${name}/${version}`}
              onClick={
                status !== "Down" && authorized && metered
                  ? null
                  : e => e.preventDefault()
              }
              cursor={
                status !== "Down" && authorized && metered
                  ? "pointer"
                  : "not-allowed"
              }
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
