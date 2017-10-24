import React from "react";
import { PropTypes } from "prop-types";
import Toolbar from "../../../../../components/Toolbar";
import ToolbarLeft from "../../../../../components/ToolbarLeft";
import ToolbarRight from "../../../../../components/ToolbarRight";

GMServiceTableToolbar.propTypes = {
  filterString: PropTypes.string,
  serviceName: PropTypes.string.isRequired,
  setFilterString: PropTypes.func.isRequired
};

GMServiceTableToolbar.defaultProps = {
  filterString: ""
};

function GMServiceTableToolbar({ serviceName, filterString, setFilterString }) {
  return (
    <Toolbar>
      <ToolbarLeft>
        <form>
          <input
            className="form-control"
            onChange={evt => setFilterString(evt.target.value)}
            placeholder="Search Instances"
            type="search"
            value={filterString}
          />
        </form>
      </ToolbarLeft>

      <ToolbarRight>
        <button className="btn" disabled>
          <span className="label">Group</span>
          <span className="icon" data-uk-icon="icon: triangle-down" />
        </button>

        <button className="btn" disabled>
          <span className="label">Sort</span>
          <span className="icon" data-uk-icon="icon: triangle-down" />
        </button>
      </ToolbarRight>
    </Toolbar>
  );
}

export default GMServiceTableToolbar;
