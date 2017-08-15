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
      <div className="inspector__toolbar">
        <input
          className="inspector__search"
          onChange={evt => onSearch(evt.target.value)}
          placeholder="Search"
          type="search"
          value={searchQuery}
        />
      </div>
      <div className="inspector__data">
        {data.length > 0 &&
          <ul>
            {filteredData.map(key =>
              <li
                className={`inspector__line ${selectedMetric === key
                  ? "inspector__line__selected"
                  : ""}`}
                key={key}
                onClick={evt => onClick(evt.target)}
              >
                {key}
              </li>
            )}
          </ul>}
      </div>
    </div>
  );
}
