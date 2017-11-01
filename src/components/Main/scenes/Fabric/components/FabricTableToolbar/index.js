import { PropTypes } from "prop-types";
import React, { Component } from "react";
import Toolbar from "../../../../components/Toolbar";
import ToolbarLeft from "../../../../components/ToolbarLeft";
import ToolbarRight from "../../../../components/ToolbarRight";
import ToolbarCenter from "../../../../components/ToolbarCenter";
import {
  ButtonRoundedLeft,
  ButtonRoundedRight,
  ButtonSecondaryText
} from "../../../../../GMButtons";
import SearchInput from "./components/GMSearchInput";
import List from "../../../../../../images/icons/list.svg";
import Card from "../../../../../../images/icons/card.svg";
import GMSelect from "../../../../components/GMSelect";

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
      statusView = false
    } = this.props;
    return (
      <Toolbar>
        <ToolbarLeft>
          <form>
            <SearchInput
              className="form-control"
              onChange={evt => onSearchInputChange(evt.target.value)}
              placeholder="Search Services"
              value={searchQuery}
              aria-label="Search All Services"
            />
          </form>
        </ToolbarLeft>
        <ToolbarCenter>
          <ButtonRoundedLeft
            selected={displayType === "Card"}
            onClick={() => setDisplayType("Card")}
          >
            <img alt="Select Card View" style={{ height: "22px" }} src={Card} />
            <span>Cards</span>
          </ButtonRoundedLeft>
          <ButtonRoundedRight
            selected={displayType === "Table"}
            onClick={() => setDisplayType("Table")}
          >
            <img alt="Select List View" style={{ height: "22px" }} src={List} />
            <span>Table</span>
          </ButtonRoundedRight>
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
                <ButtonSecondaryText>{val.label}</ButtonSecondaryText>
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
                  <ButtonSecondaryText>{val.label}</ButtonSecondaryText>
                </span>
              )}
            />
          ) : null}
        </ToolbarRight>
      </Toolbar>
    );
  };
}
