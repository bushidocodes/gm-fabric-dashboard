import { PropTypes } from "prop-types";
import React from "react";

FabricTableToolbar.propTypes = {
  filterString: PropTypes.string.isRequired,
  setFilterString: PropTypes.func.isRequired
};

export default function FabricTableToolbar({ filterString, setFilterString }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <form>
          <input
            className="form-control"
            onChange={evt => setFilterString(evt.target.value)}
            placeholder="Search Services"
            type="search"
            value={filterString}
          />
        </form>
      </div>
      <div className="toolbar-right">
        <div className="uk-button-group">
          <button className="btn">
            <span className="label">Sort</span>
            <span className="icon" data-uk-icon="icon: triangle-down" />
          </button>
          <div data-uk-dropdown="mode: click; pos: bottom-right; boundary: ! .uk-button-group; boundary-align: true;">
            <ul className="uk-nav uk-dropdown-nav">
              <li>Foo</li>
              <li>Bar</li>
              <li>Baz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
