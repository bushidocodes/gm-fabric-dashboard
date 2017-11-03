import React from "react";
import { PropTypes } from "prop-types";

BorderSquare.propTypes = {
  borderColor: PropTypes.string,
  borderOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const title = "SquareRounded";

function BorderSquare({
  ratio = 1,
  borderColor = "transparent",
  borderOpacity = "1"
}) {
  return (
    <g
      id={title}
      className="iconBorder"
      fillOpacity={borderOpacity}
      fill={borderColor}
      fillRule="evenodd"
    >
      <path
        d="M0.5,0.5 L0.5,23.5 L23.5,23.5 L23.5,0.5 L0.5,0.5 Z M24,24 L0,24 L0,0 L24,0 L24,24 Z"
        id="Rectangle"
      />
    </g>
  );
}

export default BorderSquare;
