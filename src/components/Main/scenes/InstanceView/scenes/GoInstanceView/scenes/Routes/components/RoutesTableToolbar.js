import { PropTypes } from "prop-types";
import React from "react";

import GMSelect from "components/Main/components/GMSelect";
import Toolbar from "components/Main/components/Toolbar";
import ToolbarLeft from "components/Main/components/ToolbarLeft";
import ToolbarRight from "components/Main/components/ToolbarRight";
import SecondaryText from "components/SecondaryText";
import SearchInput from "components/Main/components/GMSearchInput";

RoutesTableToolbar.propTypes = {
  filterString: PropTypes.string.isRequired,
  keyToSortBy: PropTypes.string.isRequired,
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
              value: "requests",
              label: "Requests"
            },
            {
              value: "errorCount",
              label: "Error %"
            },
            {
              value: "latency50",
              label: "Latency 50%"
            },
            {
              value: "latency99",
              label: "Latency 99%"
            }
          ]}
          value={keyToSortBy}
          onChange={val => setKeyToSortBy(val.value)}
          clearable={false}
          searchable={false}
          valueRenderer={val => [
            <span key={val}>
              <span>Sort </span>
              <SecondaryText>{val.label}</SecondaryText>
            </span>
          ]}
        />
      </ToolbarRight>
    </Toolbar>
  );
}
