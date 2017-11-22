import { PropTypes } from "prop-types";
import React from "react";

import GMSelect from "components/Main/components/GMSelect";
import SecondaryText from "components/SecondaryText";
import Toolbar from "components/Main/components/Toolbar";
import ToolbarLeft from "components/Main/components/ToolbarLeft";
import ToolbarRight from "components/Main/components/ToolbarRight";
import SearchInput from "components/Main/components/GMSearchInput";

RoutesTableToolbar.propTypes = {
  filterString: PropTypes.string.isRequired,
  keyToSortBy: PropTypes.string.isRequired,
  setFilterString: PropTypes.func.isRequired,
  setKeyToSortBy: PropTypes.func.isRequired
};
/**
 * UI controls for filtering and sorting the RoutesTable
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
  keyToSortBy,
  setFilterString,
  setKeyToSortBy
}) {
  return (
    <Toolbar>
      <ToolbarLeft>
        <form>
          <SearchInput
            onChange={evt => setFilterString(evt.target.value)}
            placeholder="Search Routes"
            aria-label="Search All Routes"
            value={filterString}
          />
        </form>
      </ToolbarLeft>
      <ToolbarRight>
        <GMSelect
          name="form-field-group-by"
          options={[
            {
              value: "route",
              label: "Route"
            },
            {
              value: "totalRequests",
              label: "Total Requests"
            },
            {
              value: "errorPercent",
              label: "Error %"
            }
          ]}
          value={keyToSortBy}
          onChange={val => setKeyToSortBy(val.value)}
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
