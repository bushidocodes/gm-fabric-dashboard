import React from "react";
import { PropTypes } from "prop-types";

BorderCircleSmall.propTypes = {
  borderColor: PropTypes.string,
  borderOpacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const title = "BorderCircleSmall";

function BorderCircleSmall({
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
        d="M12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 Z"
        id="BorderCircleSmall"
      />
    </g>
  );
}

export default BorderCircleSmall;
