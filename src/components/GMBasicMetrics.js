import { PropTypes } from "prop-types";
import React from "react";

GMBasicMetrics.propTypes = {
  detailLines: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

export default function GMBasicMetrics({ detailLines, title }) {
  return (
    <div className="kv kv-hero kv-highlight">
      <h3 className="kv-title">
        {title}
      </h3>
      {detailLines.map(([heading, value]) =>
        <div className="kv-pair" key={`${heading}-${value}`}>
          <div className="kv-key">
            {heading}
          </div>
          <div className="kv-value">
            {value}{" "}
          </div>
        </div>
      )}
    </div>
  );
}
