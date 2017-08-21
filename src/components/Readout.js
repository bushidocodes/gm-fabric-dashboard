import React from "react";
import { PropTypes } from "prop-types";

Readout.propTypes = {
  align: PropTypes.oneOf(["left", "right", "center"]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  type: PropTypes.oneOf(["primary", "secondary"])
};

function Readout({ type, align, children }) {
  return (
    <div
      className={
        "readout" +
        (type ? ` readout-${type}` : "") +
        (align ? ` ${align}` : "")
      }
    >
      {children}
    </div>
  );
}

export default Readout;
