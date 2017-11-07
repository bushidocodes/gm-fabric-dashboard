import React from "react";
import { PropTypes } from "prop-types";

import SecondaryText from "components/SecondaryText";
import GMSelect from "components/Main/components/GMSelect";
import Toolbar from "components/Main/components/Toolbar";
import ToolbarLeft from "components/Main/components/ToolbarLeft";
import ToolbarRight from "components/Main/components/ToolbarRight";

GMServiceTableToolbar.propTypes = {
  filterString: PropTypes.string,
  serviceName: PropTypes.string.isRequired,
  setFilterString: PropTypes.func.isRequired,
  setSortByAttribute: PropTypes.func.isRequired,
  sortByAttribute: PropTypes.string
};

GMServiceTableToolbar.defaultProps = {
  filterString: "",
  sortByAttribute: ""
};

function GMServiceTableToolbar({
  serviceName,
  filterString,
  setFilterString,
  setSortByAttribute,
  sortByAttribute
}) {
  return (
    <Toolbar>
      <ToolbarLeft>
        <form>
          <input
            className="form-control"
            onChange={evt => setFilterString(evt.target.value)}
            placeholder="Search Instances"
            aria-label="Search All Instances"
            type="search"
            value={filterString}
          />
        </form>
      </ToolbarLeft>

      <ToolbarRight>
        <GMSelect
          name="form-field-sort-by"
          options={[
            {
              value: "name",
              label: "Name"
            },
            {
              value: "start_timem",
              label: "Uptime"
            }
          ]}
          value={sortByAttribute}
          onChange={val => setSortByAttribute(val.value)}
          clearable={false}
          searchable={false}
          valueRenderer={val => (
            <span>
              <span>Sort </span>
              <SecondaryText>{val.label}</SecondaryText>
            </span>
          )}
        />
      </ToolbarRight>
    </Toolbar>
  );
}

export default GMServiceTableToolbar;
