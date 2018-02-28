import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { spacingScale } from "style/styleFunctions";
import {
  COLOR_DANGER,
  COLOR_WARNING,
  COLOR_SUCCESS
} from "style/styleVariables";

import Icon from "components/Icon";
import Exclamation from "components/Glyphs/Exclamation";
import Negation from "components/Glyphs/Negation";
import RunningSmall from "components/Glyphs/RunningSmall";

BackgroundIcon.propTypes = {
  status: PropTypes.string
};

const BackgroundIconContainer = styled.div`
  width: ${spacingScale(10)};
  position: absolute;
  top: -5px;
  right: 10px;
  z-index: 0;
  pointer-events: none;
`;

export default function BackgroundIcon({ status }) {
  let iconBorderStyle, iconBackgroundStyle, iconBaseColor, glyph;

  switch (status) {
    case "Down":
      iconBorderStyle = "BorderSquareSmall";
      iconBackgroundStyle = "BackgroundSquareSmall";
      iconBaseColor = COLOR_DANGER.darken(0.2).string();
      glyph = "Negation";
      break;
    case "Warning":
      iconBorderStyle = "BorderTriangleSmall";
      iconBackgroundStyle = "BackgroundTriangleSmall";
      iconBaseColor = COLOR_WARNING.darken(0.2).string();
      glyph = "Exclamation";
      break;
    case "Stable":
    default:
      iconBorderStyle = "BorderCircleSmall";
      iconBackgroundStyle = "BackgroundCircleSmall";
      iconBaseColor = COLOR_SUCCESS.lighten(1.2)
        .desaturate(0.5)
        .string();
      glyph = "RunningSmall";
  }

  return (
    <BackgroundIconContainer className="background-icon">
      <Icon
        iconRatio="4"
        glyphColor={iconBaseColor}
        backgroundStyle={iconBackgroundStyle}
        backgroundOpacity={0.3}
        borderOpacity={0}
        borderStyle={iconBorderStyle}
      >
        {glyph === "Exclamation" && <Exclamation />}
        {glyph === "Negation" && <Negation />}
        {glyph === "RunningSmall" && <RunningSmall />}
      </Icon>
    </BackgroundIconContainer>
  );
}
