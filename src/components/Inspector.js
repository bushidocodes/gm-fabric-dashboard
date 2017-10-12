import { PropTypes } from "prop-types";
import React, { Component } from "react";

/** Filterable list of selectable string */
export default class Inspector extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onSearch: PropTypes.func,
    searchQuery: PropTypes.string,
    selectedMetric: PropTypes.string
  };

  render() {
    const { data, onClick, searchQuery, selectedMetric } = this.props;
    // Filter out keys that don't match the searchQuery
    const filteredData = searchQuery
      ? data.filter(
          i => i.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : data;
    return (
      <div className="inspector">
        <div className="inspector-toolbar">
          <input
            className="inspector-search"
            onChange={evt => this.props.onSearch(evt.target.value)}
            placeholder="Search"
            type="search"
            value={searchQuery}
          />
        </div>
        {data.length > 0 && (
          <ul className="inspector-data">
            {filteredData.map(key => (
              <li
                className={`inspector-item ${selectedMetric === key
                  ? "active"
                  : ""}`}
                key={key}
                onClick={evt => onClick(evt.target.innerText)}
              >
                {key}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
