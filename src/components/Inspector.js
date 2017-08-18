import { PropTypes } from "prop-types";
import React from "react";

Inspector.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  selectedMetric: PropTypes.string
};
export default function Inspector({
  data,
  onClick,
  onSearch,
  searchQuery,
  selectedMetric
}) {
  const lowerSearchQuery = searchQuery.toLowerCase();
  const filteredData = searchQuery
    ? data.filter(i => i.toLowerCase().indexOf(lowerSearchQuery) !== -1)
    : data;
  return (
    <div className="inspector">
      <div className="inspector-toolbar">
        <input
          className="inspector-search"
          onChange={evt => onSearch(evt.target.value)}
          placeholder="Search"
          type="search"
          value={searchQuery}
        />
      </div>
      {data.length > 0 &&
        <ul className="inspector-data">
          {filteredData.map(key =>
            <li
              className={`inspector-item ${selectedMetric === key
                ? "active"
                : ""}`}
              key={key}
              onClick={evt => onClick(evt.target)}
            >
              {key}
            </li>
          )}
        </ul>}
    </div>
  );
}
