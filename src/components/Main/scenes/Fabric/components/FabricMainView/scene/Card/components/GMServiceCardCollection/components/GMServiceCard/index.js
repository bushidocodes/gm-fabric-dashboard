import React from "react";
import PropTypes from "prop-types";
import { mapStatusToColor } from "../../../../../../../../../../../../style/styleFunctions";
import StatusStableIcon from "../../../../../../../../../../../../images/icons/status-stable.svg";
import StatusWarningIcon from "../../../../../../../../../../../../images/icons/status-warning.svg";
import StatusDownIcon from "../../../../../../../../../../../../images/icons/status-down.svg";
import Color from "color";
import DocsIcon from "./components/DocsIcon";
import { CardContainer, CardFooter } from "./components/Card";
import DocsLink from "./components/DocsLink";
import BackgroundIcon from "./components/BackgroundIcon";
import Title from "./components/Title";
import { ServiceInfo, ServiceLink } from "./components/Service";

GMServiceCard.propTypes = {
  authorized: PropTypes.bool,
  docsLink: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string.isRequired,
  status: PropTypes.string,
  version: PropTypes.string,
  width: PropTypes.string
};

export default function GMServiceCard({
  authorized,
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
      {authorized ? (
        <ServiceLink
          to={status !== "Down" ? `/${name}/${version}` : "/"}
          cursor={status !== "Down" && authorized ? "pointer" : "not-allowed"}
          cardfontcolor={cardFontColor}
        >
          <Title cardFontWeight={cardFontWeight}>{name}</Title>
        </ServiceLink>
      ) : (
        <ServiceInfo>
          <Title cardFontWeight={cardFontWeight}>{name}</Title>{" "}
        </ServiceInfo>
      )}
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
