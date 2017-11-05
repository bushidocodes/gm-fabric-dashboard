import React from "react";
import { storiesOf } from "@storybook/react";

import StatusIcon from "./StatusIcon";

storiesOf("Status Icon", module)
  .add("Down", () => <StatusIcon status="down" />)
  .add("Stable", () => <StatusIcon status="stable" />)
  .add("Warning", () => <StatusIcon status="warning" />);
