import React from "react";
import PropTypes from "prop-types";
import Color from "color";

// Internal Sub-components
import BackgroundIcon from "./components/BackgroundIcon";
import { CardContainer, CardFooter } from "./components/Card";
import DocsIcon from "./components/DocsIcon";
import DocsLink from "./components/DocsLink";
import { ServiceLink } from "./components/Service";
import Title from "./components/Title";
import Runtime from "./components/Runtime";

// External dependencies
import { mapStatusToColor, spacingScale } from "style/styleFunctions";
import StatusDownIcon from "images/icons/status-down.svg";
import StatusStableIcon from "images/icons/status-stable.svg";
import StatusWarningIcon from "images/icons/status-warning.svg";
// import NoAuthIcon from "images/icons/no-key.svg";

GMServiceCard.propTypes = {
  authorized: PropTypes.bool,
  docsLink: PropTypes.string,
  height: PropTypes.string,
  metered: PropTypes.bool,
  name: PropTypes.string.isRequired,
  runtime: PropTypes.string,
  status: PropTypes.string,
  version: PropTypes.string,
  width: PropTypes.string
};

export default function GMServiceCard({
  authorized,
  docsLink,
  height = spacingScale(14),
  metered,
  name,
  runtime,
  status,
  version,
  width = spacingScale(20)
}) {
  // Style based on the status of the service
  let cardBackgroundColor,
    cardBorderColor,
    cardFontColor,
    cardFontWeight,
    cardHighlightColor,
    cardBorderAltColor,
    iconUrl;
  const baseColor = mapStatusToColor(status).string();
  const maxNameLen = 50;
  const titleName =
    name.length > maxNameLen ? `${name.trim().substr(0, maxNameLen)}...` : name;
  const titleNameAttribute = name === titleName ? null : name;
  switch (status) {
    case "Down":
      cardBackgroundColor = cardBorderColor = cardBorderAltColor = baseColor;
      cardHighlightColor = "#000000";
      cardFontColor = "white";
      cardFontWeight = "500";
      iconUrl = StatusDownIcon;
      break;
    case "Warning":
      cardBackgroundColor = cardBorderColor = cardBorderAltColor = baseColor;
      cardHighlightColor = "#000000";
      cardFontColor = "black";
      cardFontWeight = "400";
      iconUrl = StatusWarningIcon;
      break;
    case "Stable":
    default:
      cardBackgroundColor = "white";
      cardBorderAltColor = baseColor;
      cardBorderColor = "rgba(0,0,0,.05)";
      cardHighlightColor = baseColor;
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
      cardHighlightColor={cardHighlightColor}
      cardBorderAltColor={cardBorderAltColor}
      width={width}
      height={height}
    >
      <BackgroundIcon iconUrl={iconUrl} status={status} alt="" />
      <ServiceLink
        to={`/${name}/${version}`}
        onClick={
          status !== "Down" && authorized && metered
            ? null
            : e => e.preventDefault()
        }
        cursor={
          status !== "Down" && authorized && metered ? "pointer" : "not-allowed"
        }
        cardfontcolor={cardFontColor}
      >
        <Title title={titleNameAttribute} cardFontWeight={cardFontWeight}>
          {titleName}
        </Title>
      </ServiceLink>

      <CardFooter cardFontWeight={cardFontWeight}>
        {runtime && <Runtime>{runtime}</Runtime>}
        {!metered && <span>nometrics</span>}
        {!authorized && <span>noauth</span>}
        {version || null}
        {version &&
          docsLink && (
            <DocsLink
              cardFontColor={cardFontColor}
              cardHighlightColor={cardHighlightColor}
              href={docsLink}
              target="_blank"
              title={`Documentation of ${titleName}`}
            >
              <DocsIcon fillColor={cardFontColor} />
            </DocsLink>
          )}
      </CardFooter>
    </CardContainer>
  );
}
