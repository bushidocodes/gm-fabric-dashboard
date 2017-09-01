import { PropTypes } from "prop-types";
import React, { Component } from "react";
import _ from "lodash";

export default class Inspector extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    onSearch: PropTypes.func,
    searchQuery: PropTypes.string,
    selectedMetric: PropTypes.string
  };
  onSearchDebounced = _.debounce(this.props.onSearch, 1000);
  onKeyPressHandler = evt => {
    if (evt.key === "Enter") {
      this.onSearchDebounced.flush();
    }
  };
  render() {
    const { data, onClick, searchQuery, selectedMetric } = this.props;
    const lowerSearchQuery = searchQuery.toLowerCase();
    const filteredData = searchQuery
      ? data.filter(i => i.toLowerCase().indexOf(lowerSearchQuery) !== -1)
      : data;
    return (
      <div className="inspector">
        <div className="inspector-toolbar">
          <input
            className="inspector-search"
            onChange={evt => this.onSearchDebounced(evt.target.value)}
            onKeyPress={evt => this.onKeyPressHandler(evt)}
            placeholder="Search"
            type="search"
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
                onClick={evt => onClick(evt.target)}
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
