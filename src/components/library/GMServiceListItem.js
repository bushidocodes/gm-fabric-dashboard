import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import StatusIcon from "./StatusIcon";

import styled from "styled-components";
import {
  FONT_SIZE_XS,
  COLOR_BRAND_PRIMARY,
  COLOR_DANGER
} from "../../style/styleVariables";
import { spacingScale } from "../../style/styleFunctions";

import Docs from "../../images/icons/docs.svg";

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

const ItemName = styled.div`
  margin-right: ${spacingScale(1)};
  align-items: center;
`;

const ItemVersion = styled.div`
  font-size: ${FONT_SIZE_XS};
  margin: 0 0 0 ${spacingScale(0.25)};
  color: gray;
  align-self: center;
`;

export const GMLink = styled(Link)`
  width: 100%;
  cursor: ${props => props.cursor};
  text-decoration: none;
  color: black;
  outline: none;
  display: flex;
  &:hover {
    color: ${props =>
      props.disabled ? COLOR_DANGER.string() : COLOR_BRAND_PRIMARY.string()};
  }
`;

const DocLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export default class GMServiceListItem extends Component {
  static propTypes = {
    docsLink: PropTypes.string,
    groupByAttribute: PropTypes.string,
    instances: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string,
    version: PropTypes.string
  };

  render() {
    const {
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
            <GMLink
              to={instances.length > 0 ? `/${name}/${version}` : "/"}
              cursor={instances.length > 0 ? "pointer" : "not-allowed"}
              disabled={status === "Down"}
            >
              <IconWrapper>
                {groupByAttribute.toLowerCase() !== "status" && (
                  <StatusIcon status={status} />
                )}
              </IconWrapper>
              <ItemName tabIndex="0">{name}</ItemName>
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
