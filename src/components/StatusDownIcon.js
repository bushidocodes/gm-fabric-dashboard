import { PropTypes } from "prop-types";
import React from "react";

StatusDownIcon.propTypes = {
  ariaLabelledby: PropTypes.string,
  fill: PropTypes.string,
  fillRule: PropTypes.string,
  height: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  title: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.number
};

export default function StatusDownIcon({
  ariaLabelledby = "stable status glyph",
  fill = "none",
  fillRule = "evenodd",
  height,
  stroke = "none",
  strokeWidth = 1,
  title = "stable status glyph",
  viewBox = "0 0 24 24",
  width
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
          d="M0,0 L26,0 L26,27 L0,27 L0,0 Z M7,9.00145367 L8,10.5 L15,17.5 L17,19 L18,19 L19,18 L19,17 L18,15.5 L10.5,8 L9,7 L8,7 L7,8 L7,9.00145367 Z"
          id="path-1"
        />
        <path
          d="M7,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L7,21 C5.8954305,21 5,20.1045695 5,19 L5,7 C5,5.8954305 5.8954305,5 7,5 Z"
          id="path-3"
        />
        <path
          d="M6,6 L6,20 L20,20 L20,6 L6,6 Z M21,6 L21,20 L21,20 C21,20.5522847 20.5522847,21 20,21 L6,21 L6,21 C5.44771525,21 5,20.5522847 5,20 L5,6 L5,6 C5,5.44771525 5.44771525,5 6,5 L20,5 L20,5 C20.5522847,5 21,5.44771525 21,6 Z"
          id="path-5"
        />
        <path
          d="M8.14644661,8.85355339 L17.1464466,17.8535534 C17.3417088,18.0488155 17.6582912,18.0488155 17.8535534,17.8535534 C18.0488155,17.6582912 18.0488155,17.3417088 17.8535534,17.1464466 L8.85355339,8.14644661 C8.65829124,7.95118446 8.34170876,7.95118446 8.14644661,8.14644661 C7.95118446,8.34170876 7.95118446,8.65829124 8.14644661,8.85355339 Z"
          id="path-7"
        />
      </defs>
      <g
        id="Glyphs"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="Glyphs-/-State-/-Stopped">
          <mask id="mask-2" fill="white">
            <use xlinkHref="#path-1" />
          </mask>
          <g id="Rectangle" />
          <g id="Glyphs-/-Frame-/-Square-/-B" mask="url(#mask-2)">
            <mask id="mask-4" fill="white">
              <use xlinkHref="#path-3" />
            </mask>
            <g id="Rectangle-8" fillRule="nonzero" stroke="1px" />
            <g
              id="Colors-/-Brand-/-Red"
              opacity="0.2"
              mask="url(#mask-4)"
              fillRule="evenodd"
              fill="#D0021B"
            >
              <rect id="Color" x="0" y="0" width="26" height="27" />
            </g>
            <mask id="mask-6" fill="white">
              <use xlinkHref="#path-5" />
            </mask>
            <g id="Rectangle-8" fillRule="nonzero" />
            <g
              id="Colors-/-Brand-/-Red"
              mask="url(#mask-6)"
              fillRule="evenodd"
              fill="#D0021B"
            >
              <rect id="Color" x="0" y="0" width="26" height="27" />
            </g>
          </g>
          <mask id="mask-8" fill="white">
            <use xlinkHref="#path-7" />
          </mask>
          <g id="Path-10" fillRule="nonzero" />
          <g id="Colors-/-Brand-/-Red" mask="url(#mask-8)" fill="#D0021B">
            <rect id="Color" x="0" y="0" width="26" height="27" />
          </g>
        </g>
      </g>
    </svg>
  );
}
