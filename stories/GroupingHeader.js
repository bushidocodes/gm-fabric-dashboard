import React from "react";

import { storiesOf } from "@storybook/react";

import GMServiceHeader from "../src/components/Main/scenes/Fabric/components/FabricMainView/components/GMServiceHeader.js";

storiesOf("Grouping Header", module)
  .add("with icon and 'Sample' title", () => (
    <GMServiceHeader headerTitle="Sample headerTitle" />
  ))
  .add("with icon and 'Grey Matter Services' headerTitle", () => (
    <GMServiceHeader headerTitle="Grey Matter Services" />
  ))
  .add("with icon and 'MEME Services' headerTitle", () => (
    <GMServiceHeader headerTitle="MEME Services" />
  ))
  .add("with icon and 'Down' headerTitle", () => (
    <GMServiceHeader headerTitle="Down" />
  ))
  .add("with icon and 'Warning' headerTitle", () => (
    <GMServiceHeader headerTitle="Warning" />
  ))
  .add("with icon and 'Stable' headerTitle", () => (
    <GMServiceHeader headerTitle="Stable" />
  ));
