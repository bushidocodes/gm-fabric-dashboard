import { PropTypes } from "prop-types";
import React from "react";
import GMSelect from "../../../../../../../components/GMSelect";
import { ButtonSecondaryText } from "../../../../../../../../GMButtons";

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
              <ButtonSecondaryText>{val.label}</ButtonSecondaryText>
            </span>
          )}
        />
      </div>
    </div>
  );
}
