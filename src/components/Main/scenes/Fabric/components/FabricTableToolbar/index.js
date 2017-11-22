import { PropTypes } from "prop-types";
import React, { Component } from "react";

import Button from "components/Button";
import SearchInput from "components/Main/components/GMSearchInput";
import SecondaryText from "components/SecondaryText";
import GMSelect from "components/Main/components/GMSelect";
import Toolbar from "components/Main/components/Toolbar";
import ToolbarLeft from "components/Main/components/ToolbarLeft";
import ToolbarRight from "components/Main/components/ToolbarRight";
import ToolbarCenter from "components/Main/components/ToolbarCenter";

export default class FabricTableToolbar extends Component {
  static propTypes = {
    displayType: PropTypes.string.isRequired,
    groupByAttribute: PropTypes.string.isRequired,
    onSearchInputChange: PropTypes.func.isRequired,
    searchQuery: PropTypes.string,
    setDisplayType: PropTypes.func.isRequired,
    setGroupByAttribute: PropTypes.func.isRequired,
    setSortByAttribute: PropTypes.func.isRequired,
    sortByAttribute: PropTypes.string.isRequired,
    statusView: PropTypes.bool
  };

  render = () => {
    const {
      displayType,
      searchQuery = "",
      setDisplayType,
      groupByAttribute,
      onSearchInputChange,
      setGroupByAttribute,
      setSortByAttribute,
      sortByAttribute,
      statusView
    } = this.props;
    return (
      <Toolbar>
        <ToolbarLeft>
          <form>
            <SearchInput
              onChange={evt => onSearchInputChange(evt.target.value)}
              placeholder="Search Services"
              aria-label="Search All Services"
              value={searchQuery}
            />
          </form>
        </ToolbarLeft>
        <ToolbarCenter>
          <Button
            active={displayType === "Card"}
            clickAction={() => setDisplayType("Card")}
            glyph="Card"
            label="Card"
          />
          <Button
            active={displayType === "Table"}
            clickAction={() => setDisplayType("Table")}
            glyph="List"
            label="List"
          />
        </ToolbarCenter>
        <ToolbarRight>
          <GMSelect
            name="form-field-group-by"
            options={
              statusView
                ? [
                    {
                      value: "Owner",
                      label: "Owner"
                    },
                    {
                      value: "Status",
                      label: "Status"
                    },
                    {
                      value: "Capability",
                      label: "Capability"
                    }
                  ]
                : [
                    {
                      value: "Owner",
                      label: "Owner"
                    },
                    {
                      value: "Capability",
                      label: "Capability"
                    },
                    {
                      value: "Status",
                      label: "Status"
                    },
                    {
                      value: "None",
                      label: "None"
                    }
                  ]
            }
            value={groupByAttribute}
            onChange={val => setGroupByAttribute(val.value)}
            clearable={false}
            searchable={false}
            valueRenderer={val => (
              <span>
                <span>Group </span>
                <SecondaryText>{val.label}</SecondaryText>
              </span>
            )}
          />
          {!statusView ? (
            <GMSelect
              name="form-field-sort-by"
              options={[
                {
                  value: "Name",
                  label: "Name"
                },
                {
                  value: "Status",
                  label: "Status"
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
          ) : null}
        </ToolbarRight>
      </Toolbar>
    );
  };
}
