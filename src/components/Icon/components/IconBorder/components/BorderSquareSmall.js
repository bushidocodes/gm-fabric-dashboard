import React from "react";
import { PropTypes } from "prop-types";

BorderSquareSmall.propTypes = {
  borderColor: PropTypes.string,
  borderOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const title = "SquareSmall";

function BorderSquareSmall({
  ratio = 1,
  borderColor = "transparent",
  borderOpacity = "1"
}) {
  return (
    <g
      id={title}
      className="iconborder"
      fillOpacity={borderOpacity}
      fill={borderColor}
      fillRule="evenodd"
    >
      <path
        d="M5,5 L5,19 L19,19 L19,5 L5,5 Z M20,5 L20,19 L20,19 C20,19.5522847 19.5522847,20 19,20 L5,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,5 L4,5 C4,4.44771525 4.44771525,4 5,4 L19,4 L19,4 C19.5522847,4 20,4.44771525 20,5 Z"
        id="Border"
      />
    </g>
  );
}

export default BorderSquareSmall;
