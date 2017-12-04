import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, text, object, select } from "@storybook/addon-knobs";

import TableToolbar from "./index.js";

const sortByOptions = [
  {
    value: "Name",
    label: "Name"
  },
  {
    value: "Status",
    label: "Status"
  }
];

const groupByOptions = [
  {
    value: "Owner",
    label: "Owner"
  },
  {
    value: "Status",
    label: "Status"
  }
];

const mockFabricViewProps = {
  displayTypeProps: {
    displayType: "Card",
    setDisplayType: () => alert("fired setDisplayType")
  },
  searchInputProps: {
    filterString: "",
    searchPlaceholder: "Search Services",
    setFilterString: () => alert("fired setFilterString")
  },
  groupByProps: {
    groupByOptions,
    groupByAttribute: "Status",
    setGroupByAttribute: () => alert("fired setGroupByAttribute")
  },
  sortByProps: {
    sortByOptions,
    sortByAttribute: "Name",
    setSortByAttribute: () => alert("fired setSortByAttribute")
  }
};

storiesOf("Table Toolbar", module).add("default", () => {
  return (
    <div style={{ width: "100%" }}>
      <TableToolbar {...mockFabricViewProps} />
    </div>
  );
});
