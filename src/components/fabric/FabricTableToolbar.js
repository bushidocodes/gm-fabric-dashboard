import { PropTypes } from "prop-types";
import React from "react";
import {
  Toolbar,
  ToolbarLeft,
  ToolbarCenter,
  ToolbarRight
} from "../library/GMTableToolbar";
import {
  StyledButton,
  RoundedLeft,
  RoundedRight,
  SecondaryText
} from "../library/GMButtons";
import SearchInput from "../library/GMSearchInput";
import TriangleDown from "../library/TriangleDown";
import List from "../../images/icons/list.svg";
import Card from "../../images/icons/card.svg";

FabricTableToolbar.propTypes = {
  displayType: PropTypes.string.isRequired,
  filterString: PropTypes.string.isRequired,
  groupByAttribute: PropTypes.string.isRequired,
  setDisplayType: PropTypes.func.isRequired,
  setFilterString: PropTypes.func.isRequired,
  setGroupByAttribute: PropTypes.func.isRequired,
  setSortByAttribute: PropTypes.func.isRequired,
  sortByAttribute: PropTypes.string.isRequired
};

export default function FabricTableToolbar({
  displayType,
  setDisplayType,
  filterString,
  groupByAttribute,
  setFilterString,
  setGroupByAttribute,
  setSortByAttribute,
  sortByAttribute
}) {
  return (
    <Toolbar>
      <ToolbarLeft>
        <form>
          <SearchInput
            className="form-control"
            onChange={evt => setFilterString(evt.target.value)}
            placeholder="Search Services"
            value={filterString}
          />
        </form>
      </ToolbarLeft>
      <ToolbarCenter>
        <RoundedLeft
          selected={displayType === "Card"}
          onClick={() => setDisplayType("Card")}
        >
          <img alt="Select Card View" style={{ height: "22px" }} src={Card} />
          <span>Cards</span>
        </RoundedLeft>
        <RoundedRight
          selected={displayType === "Table"}
          onClick={() => setDisplayType("Table")}
        >
          <img alt="Select List View" style={{ height: "22px" }} src={List} />
          <span>Table</span>
        </RoundedRight>
      </ToolbarCenter>
      <ToolbarRight>
        <div className="uk-button-group">
          <StyledButton>
            <span>Group</span>
            <SecondaryText>{groupByAttribute}</SecondaryText>
            <TriangleDown />
          </StyledButton>
          <div data-uk-dropdown="mode: click; pos: bottom-right; boundary: ! .uk-button-group; boundary-align: true;">
            <ul className="uk-nav uk-dropdown-nav">
              <li onClick={() => setGroupByAttribute("Owner")}>Owner</li>
              <li onClick={() => setGroupByAttribute("State")}>State</li>
              <li onClick={() => setGroupByAttribute("None")}>None</li>
            </ul>
          </div>
        </div>
        <div className="uk-button-group">
          <StyledButton>
            <span>Sort</span>
            <SecondaryText>{sortByAttribute}</SecondaryText>
            <TriangleDown />
          </StyledButton>
          <div data-uk-dropdown="mode: click; pos: bottom-right; boundary: ! .uk-button-group; boundary-align: true;">
            <ul className="uk-nav uk-dropdown-nav">
              <li onClick={() => setSortByAttribute("Name")}>Name</li>
              <li onClick={() => setSortByAttribute("State")}>State</li>
              <li onClick={() => setSortByAttribute("Date Last Updated")}>
                Date Last Updated
              </li>
            </ul>
          </div>
        </div>
      </ToolbarRight>
    </Toolbar>
  );
}
