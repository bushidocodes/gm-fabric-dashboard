import React from "react";
import PropTypes from "prop-types";

import IconBackground from "./components/IconBackground";
import IconBorder from "./components/IconBorder";
import StyledG from "./components/StyledG";
import StyledSVG from "./components/StyledSVG";

Icon.propTypes = {
  ariaLabelledby: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundStyle: PropTypes.string,
  borderColor: PropTypes.string,
  borderOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderStyle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  glyphColor: PropTypes.string,
  glyphName: PropTypes.string,
  glyphRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  transform: PropTypes.string
};

export default function Icon({
  ariaLabelledby = "ariaLabelledby",
  borderColor = "currentColor",
  borderOpacity = "1",
  children,
  backgroundColor = "currentColor",
  backgroundOpacity = "1",
  glyphColor = "currentColor",
  glyphName = "",
  glyphRatio = "1",
  borderStyle,
  backgroundStyle,
  iconRatio = "1",
  title = "Icon",
  transform
}) {
  return (
    <StyledSVG
      aria-labelledby={ariaLabelledby}
      iconRatio={iconRatio}
      glyphColor={glyphColor}
    >
      {title && <title>{title}</title>}
      {backgroundStyle && (
        <IconBackground
          name={backgroundStyle}
          backgroundColor={backgroundColor}
          backgroundOpacity={backgroundOpacity}
          ratio={iconRatio}
        />
      )}
      {borderStyle && (
        <IconBorder
          name={borderStyle}
          borderColor={borderColor}
          borderOpacity={borderOpacity}
          ratio={iconRatio}
        />
      )}
      <StyledG title={glyphName} ratio={glyphRatio}>
        {children}
      </StyledG>
    </StyledSVG>
  );
}
