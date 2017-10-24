import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";

import GMServiceList from "../src/components/Main/scenes/Fabric/components/FabricMainView/scene/Table/components/GMServiceList";

storiesOf("Section List View", module)
  .addDecorator(StoryRouter())
  .add("with a grouping header and group of lists", () => (
    <GMServiceList items={singleGroupingByHeadingListViewMockData} />
  ))
  .add("with multiple grouping headers and groups of lists", () => (
    <GMServiceList items={groupingByHeadingListViewMockData} />
  ));

// mock data for Section List View
const groupingByHeadingListViewMockData = [
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 1",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 2",
    version: "1.5",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 3",
    version: "1.7",
    docsLink: "http://www.deciphernow.com",
    state: "Warning"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 4",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 5",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 6",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 7",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 8",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 9",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 10",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 11",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Warning"
  }
];
const singleGroupingByHeadingListViewMockData = groupingByHeadingListViewMockData.filter(
  elem => elem.headerTitle === "MEME Services"
);
