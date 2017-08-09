import _ from "lodash";
import { PropTypes } from "prop-types";
import React from "react";

GMBasicMetrics.propTypes = {
  detailLines: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default function GMBasicMetrics({ detailLines, title }) {
  return (
    <div className="kv kv-hero kv-highlight">
      <h3 className="kv-title">
        {title}
      </h3>
      {_.map(detailLines, (value, key) =>
        <div className="kv-pair" key={`${key}-${value}`}>
          <div className="kv-key">
            {key}
          </div>
          <div className="kv-value">
            {value}{" "}
          </div>
        </div>
      )}
    </div>
  );
}
