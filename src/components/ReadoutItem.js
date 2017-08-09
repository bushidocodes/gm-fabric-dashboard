import React from "react";
import { PropTypes } from "prop-types";

ReadoutItem.propTypes = {
  detail: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

function ReadoutItem({ title, value, icon, detail }) {
  return (
    <li className="readout-feature">
      {icon &&
        <div
          className="readout-feature-icon"
          data-uk-icon={`icon: ${icon || "grid"}; ratio: 1.8`}
        />}
      <div className="readout-feature-data">
        <h2 className="readout-feature-title">
          {title}
        </h2>
        <span className="readout-feature-value">
          {value}
        </span>
        {detail &&
          <span className="readout-feature-detail">
            {detail}
          </span>}
      </div>
    </li>
  );
}

export default ReadoutItem;
