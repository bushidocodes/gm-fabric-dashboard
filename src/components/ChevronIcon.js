import { PropTypes } from "prop-types";
import React from "react";

ChevronIcon.propTypes = {
  ariaLabelledby: PropTypes.string,
  direction: PropTypes.string,
  fill: PropTypes.string,
  height: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  title: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number
};

/**
 * ChevronIcon takes direction and svg parameters and returns svg element
 *
 * @param {any} {
 *   direction = "down",
 *   width = 26,
 *   height = 26,
 *   viewBox = "0 0 24 24",
 *   stroke = "black",
 *   strokeWidth = 1,
 *   fill = "none",
 *   ariaLabelledby = "chevron icon",
 *   title = "chevron icon"
 * }
 * @returns svg element
 */
function ChevronIcon({
  direction = "down",
  width = 24,
  height = 24,
  viewBox = "0 0 24 24",
  stroke = "currentColor",
  strokeWidth = 1,
  fill = "none",
  ariaLabelledby = "chevron icon",
  title = "chevron icon"
}) {
  let points = "";
  switch (direction) {
    case "up":
      points = "8 16 13 11 18 16";
      break;
    case "left":
      points = "15 18 10 13 15 8";
      break;
    case "right":
      points = "10 8 15 13 10 18";
      break;
    case "down":
    default:
      points = "18 11 13 16 8 11";
      break;
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      aria-labelledby={ariaLabelledby}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>{title}</title>
      <g
        id="Glyphs"
        stroke="none"
        strokeWidth={strokeWidth}
        fill={fill}
        fillRule="evenodd"
      >
        <g id="chevron-down" strokeWidth="2" stroke="currentColor">
          <polyline id="Arrow" points={points} />
        </g>
      </g>
    </svg>
  );
}

export default ChevronIcon;
