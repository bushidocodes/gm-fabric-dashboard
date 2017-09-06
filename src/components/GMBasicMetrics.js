import { PropTypes } from "prop-types";
import React from "react";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from "react-sparklines";

GMBasicMetrics.propTypes = {
  detailLines: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

/**
 * Basic component for rendering a group of related metrics. Includes sparklines
 * @param {Object} props - refer to propTypes 
 */
export default function GMBasicMetrics({ detailLines, title }) {
  return (
    <div className="kv kv-hero kv-highlight">
      <h3 className="kv-title">{title}</h3>
      {detailLines.map(([heading, value, priority, sparkline = []]) => {
        return (
          <div
            className={`kv-pair kv-pair-${priority}`}
            key={`${heading}-${value}`}
          >
            <div className={`kv-key kv-key-${priority}`}>{heading}</div>
            <div className={`kv-value kv-value-${priority}`}>
              {value.toLocaleString()}
              {sparkline.length > 0 && (
                <div className={`kv-sparkline kv-sparkline-${priority}`}>
                  <Sparklines
                    data={sparkline}
                    height={32}
                    preserveAspectRatio="xMaxYMin"
                  >
                    <SparklinesLine
                      style={{
                        stroke: "currentColor",
                        strokeWidth: 1,
                        fill: "none"
                      }}
                    />
                    <SparklinesReferenceLine
                      style={{
                        stroke: "grey",
                        opacity: "0.4"
                      }}
                      type="mean"
                    />
                  </Sparklines>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
