import React from "react";
import PropTypes from "prop-types";

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
  height = "100%",
  name,
  state,
  version,
  width = "100%"
}) {
  // Style based on the state of the service
  let cardBackgroundColor, cardBorderColor, cardFontColor;
  switch (state) {
    case "error":
      cardBackgroundColor = "DarkRed";
      cardBackgroundColor = "DarkRed";
      cardFontColor = "white";
      break;
    case "warning":
      cardBackgroundColor = "yellow";
      cardBackgroundColor = "yellow";
      cardFontColor = "black";
      break;
    case "healthy":
    default:
      cardBackgroundColor = "white";
      cardBorderColor = "green";
      cardFontColor = "black";
  }
  return (
    <div
      style={{
        color: cardFontColor,
        backgroundColor: cardBackgroundColor,
        border: `1px solid ${cardBorderColor}`,
        width: width,
        height: height,
        margin: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <h3
        style={{
          textAlign: "center"
        }}
      >
        {name}
      </h3>
      <div
        style={{
          marginLeft: "10px",
          marginBottom: "10px"
        }}
      >
        {version}
        {version && docsLink && " * "}
        {docsLink && (
          <a style={{ color: cardFontColor }} href={docsLink}>
            docs
          </a>
        )}
      </div>
    </div>
  );
}
