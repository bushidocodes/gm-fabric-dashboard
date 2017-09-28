import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import GMServiceCard from "../src/components/library/GMServiceCard";
import GMServiceListItem from "../src/components/library/GMServiceListItem";
import GroupingHeader from "../src/components/library/GroupingHeader";
import SectionCardsView from "../src/components/library/SectionCardsView";
import SectionListView from "../src/components/library/SectionListView";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>😀 😎 👍 💯</Button>
  ));

storiesOf("Service Card", module)
  .add("with title", () => <GMServiceCard name="Awesome Service" />)
  .add("with title and version", () => (
    <GMServiceCard name="Awesome Service" version="1.1" />
  ))
  .add("with title, version, and documentation link", () => (
    <GMServiceCard
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
    />
  ))
  .add("with title, version, documentation link, and healthy state", () => (
    <GMServiceCard
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="healthy"
    />
  ))
  .add("with title, version, documentation link, and warning state", () => (
    <GMServiceCard
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="warning"
    />
  ))
  .add("with title, version, documentation link, and error state", () => (
    <GMServiceCard
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="error"
    />
  ))
  .add("in a row", () => (
    <div style={{ display: "flex", flexDirection: "row", height: "150px" }}>
      <GMServiceCard
        name="Awesome Service"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="healthy"
      />
      <GMServiceCard
        name="Awesome Service 2"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        state="error"
      />
      <GMServiceCard
        name="Awesome Service 3"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="warning"
      />
      <GMServiceCard
        name="Awesome Service 4"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        state="healthy"
      />
    </div>
  ));

storiesOf("Service List Item", module)
  .add("with title", () => <GMServiceListItem name="Awesome Service" />)
  .add("with title and version", () => (
    <GMServiceListItem name="Awesome Service" version="1.1" />
  ))
  .add("with title, version, and documentation link", () => (
    <GMServiceListItem
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
    />
  ))
  .add("with title, version, documentation link, and healthy state", () => (
    <GMServiceListItem
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="healthy"
    />
  ))
  .add("with title, version, documentation link, and warning state", () => (
    <GMServiceListItem
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="warning"
    />
  ))
  .add("with title, version, documentation link, and error state", () => (
    <GMServiceListItem
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="error"
    />
  ))
  .add("in a list", () => (
    <ul>
      <GMServiceListItem
        name="Awesome Service"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="healthy"
      />
      <GMServiceListItem
        name="Awesome Service 2"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        state="error"
      />
      <GMServiceListItem
        name="Awesome Service 3"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="warning"
      />
      <GMServiceListItem
        name="Awesome Service 4"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        state="healthy"
      />
    </ul>
  ));

storiesOf("Grouping Header", module)
  .add("with icon and 'Sample' title", () => (
    <GroupingHeader headerTitle="Sample headerTitle" />
  ))
  .add("with icon and 'Grey Matter Services' headerTitle", () => (
    <GroupingHeader headerTitle="Grey Matter Services" />
  ))
  .add("with icon and 'MEME Services' headerTitle", () => (
    <GroupingHeader headerTitle="MEME Services" />
  ))
  .add("with icon and 'Down' headerTitle", () => (
    <GroupingHeader headerTitle="Down" />
  ))
  .add("with icon and 'Warning' headerTitle", () => (
    <GroupingHeader headerTitle="Warning" />
  ))
  .add("with icon and 'Stable' headerTitle", () => (
    <GroupingHeader headerTitle="Stable" />
  ));

// mock data is at the end of file
storiesOf("Section Cards View", module)
  .add("with a single grouping header and group of cards", () => (
    <SectionCardsView dataArr={singleGroupingByStatusCardsViewMockData} />
  ))
  .add("with multiple grouping headers and groups of cards", () => (
    <SectionCardsView dataArr={groupingByStatusCardsViewMockData} />
  ));

storiesOf("Section List View", module)
  .add("with a grouping header and group of lists", () => (
    <SectionListView dataArr={singleGroupingByHeadingListViewMockData} />
  ))
  .add("with multiple grouping headers and groups of lists", () => (
    <SectionListView dataArr={groupingByHeadingListViewMockData} />
  ));

// mock data for Section Cards View
const groupingByStatusCardsViewMockData = [
  {
    headerTitle: "Stable",
    name: "Awesome Service 1",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 2",
    version: "1.5",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "Warning",
    name: "Awesome Service 3",
    version: "1.7",
    docsLink: "http://www.deciphernow.com",
    state: "warning"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 4",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 5",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 6",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 7",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 8",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "Stable",
    name: "Awesome Service 9",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "Down",
    name: "Awesome Service 10",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "Warning",
    name: "Awesome Service 11",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "warning"
  }
];

const singleGroupingByStatusCardsViewMockData = groupingByStatusCardsViewMockData.filter(
  elem => elem.headerTitle === "Warning"
);

// mock data for Section List View
const groupingByHeadingListViewMockData = [
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 1",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 2",
    version: "1.5",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 3",
    version: "1.7",
    docsLink: "http://www.deciphernow.com",
    state: "warning"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 4",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 5",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 6",
    version: "1.2",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 7",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 8",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 9",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "healthy"
  },
  {
    headerTitle: "Grey Matter Services",
    name: "Awesome Service 10",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "error"
  },
  {
    headerTitle: "MEME Services",
    name: "Awesome Service 11",
    version: "1.1",
    docsLink: "http://www.deciphernow.com",
    state: "warning"
  }
];

const singleGroupingByHeadingListViewMockData = groupingByHeadingListViewMockData.filter(
  elem => elem.headerTitle === "MEME Services"
);
