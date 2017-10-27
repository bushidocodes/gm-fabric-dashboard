import React from "react";
import StoryRouter from "storybook-router";

import { storiesOf } from "@storybook/react";
import { withKnobs, text, boolean, object } from "@storybook/addon-knobs";

import { AppHeader } from "../src/components/AppHeader";
import { AppToolBar } from "../src/components/AppHeader";
import { SectionNav } from "../src/components/AppHeader";
import { Banner } from "../src/components/AppHeader";

const mockTabs = [
  {
    path: "/",
    icon: "grid",
    title: "Summary",
    details: { key: "Uptime", value: "15 Days" }
  },
  {
    path: "go",
    icon: "grid",
    title: "Functions",
    details: { key: "Functions", value: "24" },
    graphData: [6, 2, 5.2, 8, 3, 6, 5.37, 7, 3.3, 8]
  },
  {
    path: "go",
    icon: "grid",
    title: "Threads",
    details: { key: "Threads", value: "26" },
    graphData: [6, 2, 5.2, 8, 3, 6, 5.37, 7, 3.3, 8]
  },
  {
    path: "go",
    icon: "grid",
    title: "HTTP",
    details: { key: "Error Rate", value: "0.121%" },
    graphData: [6, 2, 5.2, 8, 3, 6, 5.37, 7, 3.3, 8]
  },
  {
    path: "go",
    icon: "grid",
    title: "JVM",
    details: { key: "Memory Used", value: "116 MB" },
    graphData: [6, 2, 5.2, 8, 3, 6, 5.37, 7, 3.3, 8]
  }
];

const mockSecondaryTabs = [
  {
    path: "/",
    icon: "grid",
    title: "Explorer"
  },
  {
    path: "go",
    icon: "grid",
    title: "Configuration"
  }
];

const mockToolbarButtons = [
  {
    path: "/settings",
    icon: "cog",
    label: "Settings"
  },
  {
    path: "#",
    icon: "bell",
    label: "Alerts"
  }
];

const bannerExtras = [
  {
    path: "/settings",
    title: "Extra, Extra, Read all about it"
  }
];

storiesOf("App Header", module)
  .addDecorator(withKnobs)
  .addDecorator(StoryRouter())
  .add("AppToolbar", () => (
    <AppToolBar
      hideRoot={boolean("Hide Root Breadcrumb", true)}
      pathname={text("pathname", "/stuff/things")}
      AppVersion={text("Version Number", "0.7.1")}
      toolbarButtons={object("Toolbar Buttons", mockToolbarButtons)}
    />
  ))
  .add("SectionNav", () => (
    <SectionNav
      tabs={object("Tabs", mockTabs)}
      secondaryTabs={object("Secondary Tabs", mockSecondaryTabs)}
    />
  ))
  .add("Banner", () => (
    <Banner
      hideBackground={boolean("Hide Banner Background", false)}
      title={text("Section Title", "Security Service: 00ab2a")}
      extras={object("Banner Extras", bannerExtras)}
    />
  ))
  .add("Default App Header", () => (
    <AppHeader
      tabs={object("Tabs", mockTabs)}
      bannerTitle={"Security Service: 00ab2a"}
      bannerExtras={object("Banner Extras", bannerExtras)}
      secondaryTabs={object("Secondary Tabs", mockSecondaryTabs)}
      hideRoot={boolean("Hide Root Breadcrumb", true)}
      pathname={text("pathname", "/stuff/things")}
      AppVersion={text("Version Number", "0.7.1")}
      toolbarButtons={object("Toolbar Buttons", mockToolbarButtons)}
    />
  ));
