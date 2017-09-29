import React from "react";
import PropTypes from "prop-types";
import IndicatorIcon from "./IndicatorIcon";

import styled from "styled-components";

const Line = styled.div`
  display: flex;
  height: 30px;
  flex-direction: row;
  width: 100%;
`;

const LineLeft = styled.div`
  flex: 0 1 80%;
  display: flex;
  min-width: 70%;
`;

const LineRight = styled.div`
  flex: 0 1 20%;
  text-align: right;
`;
const IconWrapper = styled.span`
  display: inline-flex;
  margin: 0 0 0 5px;
  align-items: center;
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

const ServiceLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

const DocLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

GMServiceListItem.propTypes = {
  docsLink: PropTypes.string,
  name: PropTypes.string.isRequired,
  state: PropTypes.string,
  version: PropTypes.string
};

export default function GMServiceListItem({ name, state, version, docsLink }) {
  // Style based on the state of the service

  let indicatorIconColor;

  switch (state) {
    case "Down":
      indicatorIconColor = "darkred";
      break;
    case "Warning":
      indicatorIconColor = "orange";
      break;
    case "Stable":
      indicatorIconColor = "green";
      break;
    default:
      indicatorIconColor = "black";
  }
  return (
    <Line>
      <LineLeft>
        <ServiceLink href={docsLink}>
          <IconWrapper>
            <IndicatorIcon color={indicatorIconColor} diameter={10} />
          </IconWrapper>
          <ItemName>{name}</ItemName>
          <ItemVersion>{version}</ItemVersion>
        </ServiceLink>
      </LineLeft>
      <LineRight>
        <DocLink href={docsLink}>
          <IconWrapper>
            <IndicatorIcon color={"gray"} diameter={15} />
          </IconWrapper>
        </DocLink>
      </LineRight>
    </Line>
  );
}
