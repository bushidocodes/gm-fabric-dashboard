import React from "react";
import { PropTypes } from "prop-types";

Readout.propTypes = {
  align: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  type: PropTypes.string
};

function Readout({ type, align, children }) {
  return (
    <div className={"readout " + type + " " + align}>
      {children}
    </div>
  );
}

export default Readout;
