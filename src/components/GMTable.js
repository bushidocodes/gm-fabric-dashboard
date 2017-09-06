import { PropTypes } from "prop-types";
import React from "react";

GMTable.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

/**
 * Basic spreadsheet-style table view showing mupltiple columns and multiple rows
 * @param {Object} props 
 */
export default function GMTable({ title, headers, rows = [] }) {
  return (
    <div
      className={
        "kv kv-hero kv-highlight kv-table kv-headers-" + headers.length
      }
    >
      <h3 className="kv-title">{title}</h3>
      <div className="kv-pair">
        {headers.map((headerCell, index) => (
          <div className="kv-key kv-header" key={`header-${index}`}>
            {headerCell}
          </div>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div className="kv-pair" key={`row-${rowIndex}`}>
          {row &&
            row.map((cell, cellIndex) => (
              <div
                className={cellIndex === 0 ? "kv-key" : "kv-value"}
                key={`row-${rowIndex}-cell-${cellIndex}`}
              >
                {cell.toLocaleString()}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
