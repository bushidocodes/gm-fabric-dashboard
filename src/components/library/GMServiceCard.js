import React from "react";
import PropTypes from "prop-types";
import IndicatorIcon from "./IndicatorIcon";

import styled from "styled-components";

const CardContainer = styled.div`
  color: ${props => props.cardFontColor};
  background-color: ${props => props.cardBackgroundColor};
  border: 1px solid ${props => props.cardBorderColor};
  border-bottom-color: ${props => props.cardBorderBottomColor};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  text-align: left;
  font-size: 1.2em;
`;

const Version = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Circle = styled.circle`
  cx: 10;
  cy: 10;
  r: 1;
  stroke: black;
  fill: black;
`;

const SvgContainer = styled.span`
  width: 20px;
  height: 20px;
`;

const ServiceLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.cardFontColor};
`;

const DocsLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.cardFontColor};
`;

GMServiceCard.propTypes = {
  docsLink: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string.isRequired,
  state: PropTypes.string,
  version: PropTypes.string,
  width: PropTypes.string
};

export default function GMServiceCard({
  docsLink,
  height = "110px",
  name,
  state,
  version,
  width = "160px"
}) {
  // Style based on the state of the service
  let cardBackgroundColor,
    cardBorderColor,
    cardFontColor,
    cardBorderBottomColor;
  switch (state) {
    case "Down":
      cardBackgroundColor = cardBorderColor = cardBorderBottomColor = "DarkRed";
      cardFontColor = "white";
      break;
    case "Warning":
      cardBackgroundColor = cardBorderColor = cardBorderBottomColor = "#ffcc00";
      cardFontColor = "black";
      break;
    case "Stable":
    default:
      cardBackgroundColor = "white";
      cardBorderColor = "lightgray";
      cardBorderBottomColor = "green";
      cardFontColor = "green";
  }
  return (
    <CardContainer
      cardBackgroundColor={cardBackgroundColor}
      cardBorderColor={cardBorderColor}
      cardFontColor={cardFontColor}
      cardBorderBottomColor={cardBorderBottomColor}
      width={width}
      height={height}
    >
      <ServiceLink href={docsLink} cardFontColor={cardFontColor}>
        <Title>{name}</Title>
      </ServiceLink>
      <Version>
        {version}
        {version &&
        docsLink && (
          <SvgContainer>
            <svg>
              <Circle />
            </svg>
          </SvgContainer>
        )}
        {docsLink && (
          <DocsLink cardFontColor={cardFontColor} href={docsLink}>
            <IndicatorIcon color={"gray"} diameter={10} />
          </DocsLink>
        )}
      </Version>
    </CardContainer>
  );
}
