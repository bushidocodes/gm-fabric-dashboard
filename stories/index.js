import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import GMServiceCard from "../src/components/library/GMServiceCard";
import GMServiceListItem from "../src/components/library/GMServiceListItem";

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
