import React, { Component } from "react";
import { PropTypes } from "prop-types";

import Threads from "./Threads";
import Summary from "./Summary";
import Http from "./Http";
import Explorer from "./Explorer";
import Configuration from "./Configuration";
import RunningSmall from "./RunningSmall";
import Docs from "./Docs";
import JVM from "./JVM";
import Cog from "./Cog";
import Card from "./Card";
import Tape from "./Tape";
import Poll from "./Poll";
import Exclamation from "./Exclamation";
import Negation from "./Negation";

// this dynamic  component is used for story testing only.

// import all glyph components
const glyphs = {
  Http,
  Threads,
  Summary,
  Docs,
  Explorer,
  Configuration,
  JVM,
  Cog,
  Card,
  Poll,
  RunningSmall,
  Exclamation,
  Negation,
  Tape
};

export default class Glyph extends Component {
  static propTypes = {
    name: PropTypes.string,
    ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  glyphs = {
    name: this.props.name
  };

  render() {
    const { name, ratio } = this.props;

    // dynamically render glyph component by name
    const GlyphComponent = glyphs[name];
    return (
      <g
        className="glyph"
        fill="currentColor"
        transform={"scale(" + ratio + ")"}
      >
        <GlyphComponent name={name} />
      </g>
    );
  }
}

Glyph.defaultProps = {
  name: "Threads",
  ratio: 1
};
