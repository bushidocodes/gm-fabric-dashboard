import React from "react";

import { storiesOf } from "@storybook/react";

import StatusIcon from "../src/components/StatusIcon";

storiesOf("Status Icons", module)
  .add("Down", () => <StatusIcon status="down" />)
  .add("Stable", () => <StatusIcon status="stable" />)
  .add("Warning", () => <StatusIcon status="warning" />);
