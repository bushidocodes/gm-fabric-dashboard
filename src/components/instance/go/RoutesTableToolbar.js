import { PropTypes } from "prop-types";
import React from "react";

const spanWidth = {
  flexBasis: "2em"
};

RoutesTableToolbar.propTypes = {
  filterString: PropTypes.string.isRequired,
  setFilterString: PropTypes.func.isRequired,
  setKeyToSortBy: PropTypes.func.isRequired
};
/**
 * UI controls for filtering and sorting the Go RoutesTable
 * @export
 * @param {any} {
 *   filterString,
 *   setFilterString,
 *   setKeyToSortBy
 * }
 * @returns JSX.Element
 */
export default function RoutesTableToolbar({
  filterString,
  setFilterString,
  setKeyToSortBy
}) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <form>
          <input
            className="form-control"
            onChange={evt => setFilterString(evt.target.value)}
            placeholder="Search Routes"
            type="search"
            value={filterString}
          />
        </form>
      </div>
      <div className="toolbar-right">
        <div className="uk-button-group">
          <button className="btn">
            <span className="label" style={spanWidth}>
              Sort
            </span>
            <span
              className="icon"
              data-uk-icon="icon: triangle-down"
              style={spanWidth}
            />
          </button>
          <div data-uk-dropdown="mode: click; pos: bottom-right; boundary: ! .uk-button-group; boundary-align: true;">
            <ul className="uk-nav uk-dropdown-nav">
              <li onClick={evt => setKeyToSortBy("route")}>Route</li>
              <li onClick={evt => setKeyToSortBy("requests")}>Requests</li>
              <li onClick={evt => setKeyToSortBy("errorCount")}>Error Count</li>
              <li onClick={evt => setKeyToSortBy("latency50")}>Latency 50%</li>
              <li onClick={evt => setKeyToSortBy("latency99")}>Latency 99%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
