import React from "react";
import StoryRouter from "storybook-router";

import { storiesOf } from "@storybook/react";

import { AppHeader } from "../src/components/AppHeader";
import { AppToolBar } from "../src/components/AppHeader";
import { SectionNav } from "../src/components/AppHeader";
import { Banner } from "../src/components/AppHeader";

storiesOf("App Header", module)
  .addDecorator(StoryRouter())
  .add("AppToolbar", () => <AppToolBar pathname="/stuff/things" />)
  .add("SectionNav", () => <SectionNav />)
  .add("Banner", () => <Banner />)
  .add("Default App Header", () => <AppHeader />);
