import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";

import GMServiceListItem from "../src/components/Main/scenes/Fabric/components/FabricMainView/scene/Table/components/GMServiceList/components/GMServiceListItem";

storiesOf("Service List Item", module)
  .addDecorator(StoryRouter())
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
