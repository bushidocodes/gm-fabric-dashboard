import React from "react";
import { PropTypes } from "prop-types";

StatusStableIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  viewBox: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  title: PropTypes.string
};

export default function StatusStableIcon({
  width = 24,
  height = 24,
  viewBox = "0 0 24 24",
  stroke = "none",
  strokeWidth = 1,
  fill = "none",
  fillRule = "evenodd",
  ariaLabelledby = "stable status glyph",
  title = "stable status glyph"
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      aria-labelledby={ariaLabelledby}
      title={title}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          d="M0,0 L26,0 L26,27 L0,27 L0,0 Z M11,9 L11,17 L17,13 L11,9 Z"
          id="path-1"
        />
        <path
          d="M13,22 C8.02943725,22 4,17.9705627 4,13 C4,8.02943725 8.02943725,4 13,4 C17.9705627,4 22,8.02943725 22,13 C22,17.9705627 17.9705627,22 13,22 Z"
          id="path-3"
        />
        <path
          d="M13,21 C17.418278,21 21,17.418278 21,13 C21,8.581722 17.418278,5 13,5 C8.581722,5 5,8.581722 5,13 C5,17.418278 8.581722,21 13,21 Z M13,22 C8.02943725,22 4,17.9705627 4,13 C4,8.02943725 8.02943725,4 13,4 C17.9705627,4 22,8.02943725 22,13 C22,17.9705627 17.9705627,22 13,22 Z"
          id="path-5"
        />
        <path
          d="M12,10.8685171 L12,15.1314829 L15.1972244,13 L12,10.8685171 Z M17,13 L11,17 L11,9 L17,13 Z"
          id="path-7"
        />
      </defs>
      <g
        id="Glyphs"
        stroke={stroke}
        stroke-width={strokeWidth}
        fill={fill}
        fill-rule={fillRule}
      >
        <g id="Glyphs-/-State-/-Running">
          <mask id="mask-2" fill="white">
            <use xlinkHref="#path-1" />
          </mask>
          <g id="Mask" />
          <g id="Glyphs-/-Frame-/-Circle-/-B" mask="url(#mask-2)">
            <mask id="mask-4" fill="white">
              <use xlinkHref="#path-3" />
            </mask>
            <g id="Oval-8" fill-rule="nonzero" />
            <g
              id="Colors-/-Brand-/-Green-/-Primary"
              opacity="0.20459692"
              mask="url(#mask-4)"
              fill-rule="evenodd"
              fill="#0AAB2A"
            >
              <rect id="Color" x="0" y="0" width="26" height="27" />
            </g>
            <mask id="mask-6" fill="white">
              <use xlinkHref="#path-5" />
            </mask>
            <g id="Oval-8" fill-rule="nonzero" />
            <g
              id="Colors-/-Brand-/-Green-/-Primary"
              mask="url(#mask-6)"
              fill-rule="evenodd"
              fill="#0AAB2A"
            >
              <rect id="Color" x="0" y="0" width="26" height="27" />
            </g>
          </g>
          <mask id="mask-8" fill="white">
            <use xlinkHref="#path-7" />
          </mask>
          <g id="Triangle-4" fill-rule="nonzero" />
          <g
            id="Colors-/-Brand-/-Green-/-Primary"
            mask="url(#mask-8)"
            fill="#0AAB2A"
          >
            <rect id="Color" x="0" y="0" width="26" height="27" />
          </g>
        </g>
      </g>
    </svg>
  );
}
