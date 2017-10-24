import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";

import GMServiceCardCollection from "../src/components/Main/scenes/Fabric/components/FabricMainView/scene/Card/components/GMServiceCardCollection";

// mock data is at the end of file
storiesOf("Section Cards View", module)
  .addDecorator(StoryRouter())
  .add("with a single grouping header and group of cards", () => (
    <GMServiceCardCollection items={singleGroupingByStatusCardsViewMockData} />
  ))
  .add("with multiple grouping headers and groups of cards", () => (
    <GMServiceCardCollection items={groupingByStatusCardsViewMockData} />
  ));

// mock data for Section Cards View
const groupingByStatusCardsViewMockData = [
  {
    headerTitle: "Stable",
    name: "Awesome Service 1",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 2",
    version: "1.5",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "Warning",
    name: "Awesome Service 3",
    version: "1.7",
    docsLink: "http://www.deciphernow.com",
    state: "Warning"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 4",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 5",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 6",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 7",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 8",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 9",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Stable"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 10",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Error"
  },
  {
    headerTitle: "Warning",
    name: "Awesome Service 11",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "Warning"
  }
];
const singleGroupingByStatusCardsViewMockData = groupingByStatusCardsViewMockData.filter(
  elem => elem.headerTitle === "Warning"
);
