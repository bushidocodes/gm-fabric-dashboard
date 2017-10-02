import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import GMServiceCard from "../src/components/library/GMServiceCard";
import GMServiceListItem from "../src/components/library/GMServiceListItem";
import GroupingHeader from "../src/components/library/GroupingHeader";
import GMServiceCardCollection from "../src/components/library/GMServiceCardCollection";
import GMServiceList from "../src/components/library/GMServiceList";

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
  .add("with title, version, documentation link, and Stable state", () => (
    <GMServiceCard
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="Stable"
    />
  ))
  .add("with title, version, documentation link, and Warning state", () => (
    <GMServiceCard
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="Warning"
    />
  ))
  .add("with title, version, documentation link, and Error state", () => (
    <GMServiceCard
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="Error"
    />
  ))
  .add("in a row", () => (
    <div style={{ display: "flex", flexDirection: "row", height: "150px" }}>
      <GMServiceCard
        name="Awesome Service"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="Stable"
      />
      <GMServiceCard
        name="Awesome Service 2"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        state="Error"
      />
      <GMServiceCard
        name="Awesome Service 3"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="Warning"
      />
      <GMServiceCard
        name="Awesome Service 4"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        state="Stable"
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
  .add("with title, version, documentation link, and Stable state", () => (
    <GMServiceListItem
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="Stable"
    />
  ))
  .add("with title, version, documentation link, and Warning state", () => (
    <GMServiceListItem
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="Warning"
    />
  ))
  .add("with title, version, documentation link, and Error state", () => (
    <GMServiceListItem
      name="Awesome Service"
      version="1.1"
      docsLink="http://www.deciphernow.com"
      state="Error"
    />
  ))
  .add("in a list", () => (
    <ul>
      <GMServiceListItem
        name="Awesome Service"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="Stable"
      />
      <GMServiceListItem
        name="Awesome Service 2"
        version="1.0"
        docsLink="http://www.deciphernow.com"
        state="Error"
      />
      <GMServiceListItem
        name="Awesome Service 3"
        version="1.1"
        docsLink="http://www.deciphernow.com"
        state="Warning"
      />
      <GMServiceListItem
        name="Awesome Service 4"
        version="3.1"
        docsLink="http://www.deciphernow.com"
        state="Stable"
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
    <GMServiceCardCollection items={singleGroupingByStatusCardsViewMockData} />
  ))
  .add("with multiple grouping headers and groups of cards", () => (
    <GMServiceCardCollection items={groupingByStatusCardsViewMockData} />
  ));

storiesOf("Section List View", module)
  .add("with a grouping header and group of lists", () => (
    <GMServiceList items={singleGroupingByHeadingListViewMockData} />
  ))
  .add("with multiple grouping headers and groups of lists", () => (
    <GMServiceList items={groupingByHeadingListViewMockData} />
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
