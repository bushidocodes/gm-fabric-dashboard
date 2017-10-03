import React from "react";
import PropTypes from "prop-types";
import Color from "color";

ShapeIcon.propTypes = {
  color: PropTypes.string,
  shape: PropTypes.string,
  thickBorder: PropTypes.bool
};

export default function ShapeIcon({
  color = "red",
  shape = "square",
  thickBorder = false
}) {
  if (shape === "circle") {
    return (
      <svg viewBox={`0 0 40 40`} xmlns="http://www.w3.org/2000/svg">
        <circle
          cx={20}
          cy={20}
          r={16}
          style={{
            fill: color,
            stroke: Color(color)
              .darken(0.5)
              .string(),
            strokeWidth: thickBorder ? 2 : 1
          }}
        />
      </svg>
    );
  } else if (shape === "square") {
    return (
      <svg viewBox={`0 0 40 40`} xmlns="http://www.w3.org/2000/svg">
        <rect
          x={4}
          y={4}
          height={32}
          width={32}
          style={{
            fill: color,
            stroke: Color(color)
              .darken(0.5)
              .string(),
            strokeWidth: thickBorder ? 2 : 1
          }}
        />
      </svg>
    );
  } else if (shape === "triangle") {
    return (
      <svg viewBox={`0 0 40 40`} xmlns="http://www.w3.org/2000/svg">
        <polygon
          points={`4,36 20,4 36,36`}
          style={{
            fill: color,
            stroke: Color(color)
              .darken(0.5)
              .string(),
            strokeWidth: thickBorder ? 2 : 1
          }}
        />
      </svg>
    );
  }
}
