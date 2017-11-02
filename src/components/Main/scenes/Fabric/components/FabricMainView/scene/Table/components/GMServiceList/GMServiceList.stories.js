import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";

import GMServiceList from "./index.js";

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
    instances: [
      {
        name: "ee0fa3669fea7e9a0adea649c46bca56",
        start_time: 1508854912461
      },
      {
        name: "8bedb4551e801f38bf149001a72a1127",
        start_time: 1508370483156
      },
      {
        name: "d9de3a9c26c6c84daaf1ceb40559d659",
        start_time: 1508170483156
      }
    ],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 2",
    instances: [
      {
        name: "ee0fa3669fea7e9a0adea649c46bca56",
        start_time: 1508854912461
      },
      {
        name: "8bedb4551e801f38bf149001a72a1127",
        start_time: 1508370483156
      },
      {
        name: "d9de3a9c26c6c84daaf1ceb40559d659",
        start_time: 1508170483156
      }
    ],
    version: "1.5",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 3",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.7",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Warning"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 4",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 5",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 6",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 7",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 8",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 9",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Stable"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 10",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    authorized: true,
    status: "Down"
  },
  {
    headerTitle: "MEME Services",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 },
      { name: "8bedb4551e801f38bf149001a72a1127", start_time: 1508370483156 },
      { name: "d9de3a9c26c6c84daaf1ceb40559d659", start_time: 1508170483156 }
    ],
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
