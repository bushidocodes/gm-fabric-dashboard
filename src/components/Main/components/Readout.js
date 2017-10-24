import React from "react";
import { PropTypes } from "prop-types";

Readout.propTypes = {
  // Align content to left, center, or right
  align: PropTypes.oneOf(["left", "right", "center"]),
  // ReadoutItems to be displayed in the Readout container
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  // Whether the Readout item should be called out as a primary or secondary UI feature, or left plain (in which case type is not passed as a prop). Note: It appears that readout-secondary is not actually implemented
  type: PropTypes.oneOf(["readout-primary", "readout-secondary"])
};

/** 
 * A Flexbox based row of metrics filled with instances of ReadoutItem  
 * @param {Object} props - See proptypes for details
 */
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
