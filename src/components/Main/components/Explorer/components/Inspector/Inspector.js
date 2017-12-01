import { PropTypes } from "prop-types";
import React, { Component } from "react";

import InspectorWrap from "./components/InspectorWrap";
import InspectorToolbar from "./components/InspectorToolbar";
import InspectorData from "./components/InspectorData";
import InspectorItem from "./components/InspectorItem";
import InspectorSearch from "./components/InspectorSearch";

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
      <InspectorWrap>
        <InspectorToolbar>
          <InspectorSearch
            onChange={evt => this.props.onSearch(evt.target.value)}
            placeholder="Search"
            aria-label="Search All Metrics"
            type="search"
            value={searchQuery}
          />
        </InspectorToolbar>
        {data.length > 0 && (
          <InspectorData>
            {filteredData.map(key => (
              <InspectorItem
                active={selectedMetric === key}
                key={key}
                onClick={evt => {
                  onClick(evt.target.innerText);
                  evt.target.blur();
                }}
                onKeyDown={evt => {
                  if (evt.keyCode === 13) {
                    onClick(evt.target.innerText);
                  }
                }}
                tabIndex="0"
              >
                {key}
              </InspectorItem>
            ))}
          </InspectorData>
        )}
      </InspectorWrap>
    );
  }
}
