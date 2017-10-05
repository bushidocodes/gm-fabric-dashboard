import React from "react";
import PropTypes from "prop-types";
import { mapStatusToColor } from "../../style/styleFunctions";
import {
  BORDER_RADIUS_BASE,
  PADDING_BASE,
  FONT_SIZE_BASE,
  FONT_SIZE_SM,
  FONT_STACK_DATA
} from "../../style/styleVariables";
import Color from "color";

import styled from "styled-components";

const CardContainer = styled.div`
  color: ${props => props.cardFontColor};
  background-image: linear-gradient(
    ${props => Color(props.cardBackgroundColor).string()},
    ${props =>
      Color(props.cardBackgroundColor)
        .hsl()
        .rotate(-7)
        .string()}
  );
  border: 1px solid ${props => props.cardBorderColor};
  border-bottom-color: ${props => props.cardBorderBottomColor};
  border-radius: ${BORDER_RADIUS_BASE};
  width: ${props => props.width};
  height: ${props => props.height};
  margin: ${parseInt(PADDING_BASE, 10) / 2}px;
  padding: ${parseInt(PADDING_BASE, 10) * 1.5}px
    ${parseInt(PADDING_BASE, 10) * 1.5}px ${parseInt(PADDING_BASE, 10)}px;
  font-size: ${FONT_SIZE_SM};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  text-align: left;
  font-size: ${FONT_SIZE_BASE};
  font-family: ${FONT_STACK_DATA};
  font-weight: ${props => props.cardFontWeight};
`;

const Version = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: ${parseInt(props => props.cardFontWeight, 10) + 500};
`;
const Circle = styled.circle`
  cx: 10;
  cy: 10;
  r: 1;
  stroke: ${props => props.color};
  fill: ${props => props.color};
`;

const SvgContainer = styled.span`
  width: 20px;
  height: 20px;
`;

const ServiceLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.cardFontColor};
  &:hover {
    color: ${props => props.cardFontColor};
  }
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
  status: PropTypes.string,
  version: PropTypes.string,
  width: PropTypes.string
};

export default function GMServiceCard({
  docsLink,
  height = "110px",
  name,
  status,
  version,
  width = "160px"
}) {
  // Style based on the status of the service
  let cardBackgroundColor,
    cardBorderColor,
    cardFontColor,
    cardFontWeight,
    cardBorderBottomColor;
  const baseColor = mapStatusToColor(status).string();
  switch (status) {
    case "Down":
      cardBackgroundColor = cardBorderColor = cardBorderBottomColor = baseColor;
      cardFontColor = "white";
      cardFontWeight = "500";
      break;
    case "Warning":
      cardBackgroundColor = cardBorderColor = cardBorderBottomColor = baseColor;
      cardFontColor = "black";
      cardFontWeight = "400";
      break;
    case "Stable":
    default:
      cardBackgroundColor = "white";
      cardBorderColor = "rgba(0,0,0,.05)";
      cardBorderBottomColor = baseColor;
      cardFontWeight = "400";
      cardFontColor = Color(baseColor)
        .darken(0.2)
        .string();
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
        <Title cardFontWeight={cardFontWeight}>{name}</Title>
      </ServiceLink>
      <Version cardFontWeight={cardFontWeight}>
        {version}
        {version &&
          docsLink && (
            <SvgContainer>
              <svg>
                <Circle color={cardFontColor} />
              </svg>
            </SvgContainer>
          )}
        {docsLink && (
          <DocsLink cardFontColor={cardFontColor} href={docsLink}>
            Docs
          </DocsLink>
        )}
      </Version>
    </CardContainer>
  );
}
