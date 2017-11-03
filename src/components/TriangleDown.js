import React from "react";
import { PropTypes } from "prop-types";

const title = "Triangle Down";

TriangleDown.propTypes = {
  TriangleHeight: PropTypes.number,
  TriangleWidth: PropTypes.number
};

function TriangleDown({ TriangleWidth = 10, TriangleHeight = 6 }) {
  TriangleWidth = Number(TriangleWidth) || 10;
  TriangleHeight = Number(TriangleHeight) || 6;
  return (
    <svg aria-labelledby={title} width="1em" height="1em" viewport="0 0 10 10">
      <polygon
        points={`0,0 10,0 ${TriangleWidth / 2},${TriangleHeight}`}
        style={{ fill: "currentColor" }}
      />
    </svg>
  );
}

export default TriangleDown;
