import React from "react";
import { PropTypes } from "prop-types";

TriangleDown.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  stroke: PropTypes.string,
  width: PropTypes.number
};

function TriangleDown({
  width = 10,
  height = 6,
  fill = "black",
  stroke = "black"
}) {
  return (
    <svg width={width} height={height} style={{ marginLeft: "5px" }}>
      <polygon
        points={`0,0 ${width},0 ${width / 2},${height}`}
        style={{ fill: fill, stroke: stroke }}
      />
    </svg>
  );
}

export default TriangleDown;
