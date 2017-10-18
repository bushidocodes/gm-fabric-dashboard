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
import { Link } from "react-router-dom";
import StatusStableIcon from "../../images/icons/status-stable.svg";
import StatusWarningIcon from "../../images/icons/status-warning.svg";
import StatusDownIcon from "../../images/icons/status-down.svg";

import styled from "styled-components";

import DocsIcon from "./DocsIcon";

const CardContainer = styled.div`
  color: ${props => props.cardFontColor};
  background: linear-gradient(
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
  position: relative;
`;

const Title = styled.div`
  text-align: left;
  font-size: ${FONT_SIZE_BASE};
  font-family: ${FONT_STACK_DATA};
  font-weight: ${props => props.cardFontWeight};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: ${parseInt(props => props.cardFontWeight, 10) + 500};
  justify-content: space-between;
`;

const ServiceLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.cardfontcolor};
  z-index: 1;
  &:hover {
    color: ${props => props.cardfontcolor};
  }
`;

const DocsLink = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.cardFontColor};
`;

const BackgroundIcon = styled.img.attrs({
  src: props => props.iconUrl
})`
  opacity: ${props => (props.status === "Stable" ? "0.1" : "0.5")};
  width: 80px;
  position: absolute;
  top: -5px;
  right: 5px;
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
    cardBorderBottomColor,
    iconUrl;
  const baseColor = mapStatusToColor(status).string();
  switch (status) {
    case "Down":
      cardBackgroundColor = cardBorderColor = cardBorderBottomColor = baseColor;
      cardFontColor = "white";
      cardFontWeight = "500";
      iconUrl = StatusDownIcon;
      break;
    case "Warning":
      cardBackgroundColor = cardBorderColor = cardBorderBottomColor = baseColor;
      cardFontColor = "black";
      cardFontWeight = "400";
      iconUrl = StatusWarningIcon;
      break;
    case "Stable":
    default:
      cardBackgroundColor = "white";
      cardBorderColor = "rgba(0,0,0,.05)";
      cardBorderBottomColor = baseColor;
      cardFontWeight = "400";
      iconUrl = StatusStableIcon;
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
      <BackgroundIcon iconUrl={iconUrl} status={status} />
      <ServiceLink
        to={status !== "Down" ? `/${name}/${version}` : "/"}
        cardfontcolor={cardFontColor}
      >
        <Title cardFontWeight={cardFontWeight}>{name}</Title>
      </ServiceLink>
      <CardFooter cardFontWeight={cardFontWeight}>
        {version}
        {version &&
          docsLink && (
            <DocsLink
              cardFontColor={cardFontColor}
              href={docsLink}
              target="_blank"
            >
              <DocsIcon fillColor={cardFontColor} />
            </DocsLink>
          )}
      </CardFooter>
    </CardContainer>
  );
}
