import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";

import GMServiceList from "../src/components/Main/scenes/Fabric/components/FabricMainView/scene/Table/components/GMServiceList";

storiesOf("Service List Collection", module)
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
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 2",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.5",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 3",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.7",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Warning"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 4",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 5",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 6",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 7",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 8",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 9",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 10",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "MEME Services",
    instances: ["a8a76dfaasdf", "234igkefaskjf", "asdfhaksjhf8"],
    name: "Awesome Service 11",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Warning"
  }
];
const singleGroupingByHeadingListViewMockData = groupingByHeadingListViewMockData.filter(
  elem => elem.headerTitle === "MEME Services"
);
