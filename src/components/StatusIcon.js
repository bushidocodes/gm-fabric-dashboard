import React from "react";
import PropTypes from "prop-types";

import {
  COLOR_SUCCESS,
  COLOR_DANGER,
  COLOR_WARNING
} from "style/styleVariables";

import ServicesIcon from "images/icons/services.svg";
import Icon from "components/Icon";
import Negation from "components/Glyphs/Negation";
import RunningSmall from "components/Glyphs/RunningSmall";
import Exclamation from "components/Glyphs/Exclamation";

StatusIcon.propTypes = {
  status: PropTypes.string
};

export default function StatusIcon({ status = "down" }) {
  if (status.toLowerCase() === "down") {
    return (
      <Icon
        backgroundColor={COLOR_DANGER.string()}
        glyphColor={COLOR_DANGER.string()}
        backgroundStyle="BackgroundSquareSmall"
        backgroundOpacity=".2"
      >
        <Negation />
      </Icon>
    );
  } else if (status.toLowerCase() === "warning") {
    return (
      <Icon
        backgroundColor={COLOR_WARNING.darken(0.1)
          .saturate(0.1)
          .string()}
        glyphColor={COLOR_WARNING.darken(0.2)
          .saturate(1)
          .string()}
        backgroundStyle="BackgroundTriangleSmall"
        backgroundOpacity=".4"
      >
        <Exclamation />
      </Icon>
    );
  } else if (status.toLowerCase() === "stable") {
    return (
      <Icon
        backgroundColor={COLOR_SUCCESS.string()}
        glyphColor={COLOR_SUCCESS.string()}
        backgroundStyle="BackgroundCircleSmall"
        backgroundOpacity=".2"
      >
        <RunningSmall />
      </Icon>
    );
  } else {
    return <img src={ServicesIcon} alt="" />;
  }
}
