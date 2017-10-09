import React from "react";
import { PropTypes } from "prop-types";

// add minimum height to flex items. `flex-direction:column` based flex container will use `min-height` to calculate `flex-grow` lengths in IE11.

ReadoutItem.propTypes = {
  // Small line of text below value with secondary information related to value
  detail: PropTypes.string,
  // UIKit icon to use (https://getuikit.com/docs/icon#library)
  icon: PropTypes.string,
  // title explaining what the metric is
  title: PropTypes.string.isRequired,
  // value of metric
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

/**
 * A styled metrics component that shows an icon, header, main value, and detail
 * Intended to be a child component of Readout
 * @param {Object} props - See propTypes for details
 */
function ReadoutItem({ title, value, icon, detail }) {
  return (
    <li className="readout-feature">
      {icon && (
        <div
          className="readout-feature-icon"
          data-uk-icon={`icon: ${icon || "grid"}; ratio: 1.8`}
        />
      )}
      <div className="readout-feature-data">
        <h2 className="readout-feature-title">{title}</h2>
        <span className="readout-feature-value">{value}</span>
        {detail && <span className="readout-feature-detail">{detail}</span>}
      </div>
    </li>
  );
}

export default ReadoutItem;
