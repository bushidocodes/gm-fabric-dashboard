import { PropTypes } from "prop-types";
import React, { Component } from "react";
import {
  Toolbar,
  ToolbarLeft,
  ToolbarCenter,
  ToolbarRight
} from "../library/GMTableToolbar";
import {
  StyledButton,
  ButtonRoundedLeft,
  ButtonRoundedRight,
  ButtonSecondaryText
} from "../library/GMButtons";
import SearchInput from "../library/GMSearchInput";
import TriangleDown from "../library/TriangleDown";
import List from "../../images/icons/list.svg";
import Card from "../../images/icons/card.svg";

export default class FabricTableToolbar extends Component {
  static propTypes = {
    displayType: PropTypes.string.isRequired,
    groupByAttribute: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    query: PropTypes.string,
    setDisplayType: PropTypes.func.isRequired,
    setGroupByAttribute: PropTypes.func.isRequired,
    setSortByAttribute: PropTypes.func.isRequired,
    sortByAttribute: PropTypes.string.isRequired
  };

  render = () => {
    const {
      displayType,
      query = "",
      setDisplayType,
      groupByAttribute,
      onChange,
      setGroupByAttribute,
      setSortByAttribute,
      sortByAttribute
    } = this.props;
    return (
      <Toolbar>
        <ToolbarLeft>
          <form>
            <SearchInput
              className="form-control"
              onChange={evt => onChange(evt.target.value)}
              placeholder="Search Services"
              value={query}
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
          <div className="uk-button-group">
            <StyledButton>
              <span>Group</span>
              <ButtonSecondaryText>{groupByAttribute}</ButtonSecondaryText>
              <TriangleDown />
            </StyledButton>
            <div data-uk-dropdown="mode: click; pos: bottom-right; boundary: ! .uk-button-group; boundary-align: true;">
              <ul className="uk-nav uk-dropdown-nav">
                <li onClick={() => setGroupByAttribute("Owner")}>Owner</li>
                <li onClick={() => setGroupByAttribute("Status")}>Status</li>
                <li onClick={() => setGroupByAttribute("None")}>None</li>
              </ul>
            </div>
          </div>

          <div className="uk-button-group">
            <StyledButton>
              <span>Sort</span>
              <ButtonSecondaryText>{sortByAttribute}</ButtonSecondaryText>
              <TriangleDown />
            </StyledButton>
            <div data-uk-dropdown="mode: click; pos: bottom-right; boundary: ! .uk-button-group; boundary-align: true;">
              <ul className="uk-nav uk-dropdown-nav">
                <li onClick={() => setSortByAttribute("Name")}>Name</li>
                <li onClick={() => setSortByAttribute("Status")}>Status</li>
              </ul>
            </div>
          </div>
        </ToolbarRight>
      </Toolbar>
    );
  };
}
