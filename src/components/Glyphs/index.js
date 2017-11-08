import React, { Component } from "react";
import { PropTypes } from "prop-types";

import Card from "./Card";
import Cog from "./Cog";
import CPU from "./CPU";
import Configuration from "./Configuration";
import Docs from "./Docs";
import Exclamation from "./Exclamation";
import Explorer from "./Explorer";
import Fabric from "./Fabric";
import Service from "./Service";
import ServiceInstance from "./ServiceInstance";
import Scatterplot from "./Scatterplot";
import Http from "./Http";
import GitHub from "./GitHub";
import EKG from "./EKG";
import Key from "./Key";
import Timer from "./Timer";
import Finagle from "./Finagle";
import JVM from "./JVM";
import Memory from "./Memory";
import Negation from "./Negation";
import LinkedIn from "./LinkedIn";
import Pause from "./Pause";
import Power from "./Power";
import Play from "./Play";
import Poll from "./Poll";
import RunningSmall from "./RunningSmall";
import Summary from "./Summary";
import Tape from "./Tape";
import Threads from "./Threads";

// this dynamic  component is used for story testing only.

// import all glyph components
const glyphs = {
  Http,
  Threads,
  Summary,
  Docs,
  Explorer,
  Configuration,
  CPU,
  JVM,
  Cog,
  Card,
  Poll,
  Play,
  EKG,
  Key,
  Pause,
  RunningSmall,
  LinkedIn,
  GitHub,
  Power,
  Finagle,
  Scatterplot,
  Memory,
  Timer,
  Service,
  ServiceInstance,
  Fabric,
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
