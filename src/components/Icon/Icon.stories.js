import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, select, number, color } from "@storybook/addon-knobs";

import Icon from "./Icon";

// receives dynamic glyph-name for testing with storybook.  do not integrate into codebase.
import Glyph from "../Glyphs";

const glyphNames = [
  "Docs",
  "Threads",
  "Summary",
  "Http",
  "Explorer",
  "Configuration",
  "JVM",
  "TriangleDown",
  "Cog",
  "Card",
  "Play",
  "Pause",
  "Poll",
  "Tape"
];

const iconBackgroundNames = [
  "BackgroundSquare",
  "BackgroundSquareBeveled",
  "BackgroundSquareRounded",
  "BackgroundSquareRoundedSmooth",
  "BackgroundSquircle",
  "BackgroundTriangle"
];

const iconBorderNames = ["BorderSquare"];

// dynamic glyph name is used for story knob testing only.
// call the glyph component by name specifically, <CardGlyph> instead of <Glyph name="CardGlyph"> for code implementation

storiesOf("Icons", module)
  .addDecorator(withKnobs)
  .add(" Icon", () => {
    const glyphName = select("Glyph", glyphNames, "Card");

    return (
      <Icon
        glyphName={glyphName}
        backgroundStyle={select(
          "Icon Background",
          iconBackgroundNames,
          "BackgroundSquare"
        )}
        backgroundColor={color("Background Color", "#f00")}
        backgroundOpacity={number("Background Opacity", 0.5)}
        borderStyle={select("Icon Border", iconBorderNames, "BorderSquare")}
        borderColor={color("Border Color", "currentColor")}
        borderOpacity={number("Border Opacity", 0.5)}
        iconRatio={number("Icon Ratio", 1)}
        glyphColor={color("Glyph Color", "currentColor")}
        glyphRatio={number("Glyph Ratio", 1)}
        transform={""}
      >
        <Glyph name={glyphName} />
      </Icon>
    );
  });
