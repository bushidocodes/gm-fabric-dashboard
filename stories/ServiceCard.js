import React from "react";

import StoryRouter from "storybook-router";
import { storiesOf } from "@storybook/react";

import GMServiceCard from "../src/components/Main/scenes/Fabric/components/FabricMainView/scene/Card/components/GMServiceCardCollection/components/GMServiceCard/index.js";

storiesOf("Service Card", module)
  .addDecorator(StoryRouter())
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
