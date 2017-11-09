import React, { Component } from "react";
import { PropTypes } from "prop-types";
import _ from "lodash";

import CPU from "./CPU";
import Card from "./Card";
import Close from "./Close";
import Cog from "./Cog";
import Configuration from "./Configuration";
import Docs from "./Docs";
import EKG from "./EKG";
import Exclamation from "./Exclamation";
import Explorer from "./Explorer";
import Fabric from "./Fabric";
import Finagle from "./Finagle";
import Functions from "./Functions";
import GitHub from "./GitHub";
import Http from "./Http";
import JVM from "./JVM";
import Key from "./Key";
import LinkedIn from "./LinkedIn";
import List from "./List";
import Memory from "./Memory";
import Negation from "./Negation";
import NoKey from "./NoKey";
import NoMetrics from "./NoMetrics";
import Pause from "./Pause";
import Play from "./Play";
import Poll from "./Poll";
import Power from "./Power";
import RunningSmall from "./RunningSmall";
import Scatterplot from "./Scatterplot";
import Service from "./Service";
import ServiceInstance from "./ServiceInstance";
import Summary from "./Summary";
import Tape from "./Tape";
import Threads from "./Threads";
import Timer from "./Timer";
import Twitter from "./Twitter";

// import all glyph components
const glyphs = {
  CPU,
  Card,
  Close,
  Cog,
  Configuration,
  Docs,
  EKG,
  Exclamation,
  Explorer,
  Fabric,
  Finagle,
  Functions,
  GitHub,
  Go: JVM,
  Http,
  JVM,
  Key,
  LinkedIn,
  List,
  Memory,
  Negation,
  NoKey,
  NoMetrics,
  Pause,
  Play,
  Poll,
  Power,
  RunningSmall,
  Scatterplot,
  Service,
  ServiceInstance,
  Summary,
  Tape,
  Threads,
  Timer,
  Twitter
};

/**
 * returns Glyph by pass glyph name or empty <g> element if not found
 *
 * @export class Glyph
 * @class Glyph
 * @extends {Component}
 */
export default class Glyph extends Component {
  static propTypes = {
    name: PropTypes.string,
    ratio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  glyphs = {
    name: this.props.name
  };

  render() {
    let { name, ratio } = this.props;
    // use upperFirst instead of capitalize to respect camelCase
    name = _.upperFirst(name);

    // if glyph name is not found, return empty glyph and console log an error message
    if (!glyphs[name]) {
      console.log(`${name} is not found in glyph adapter`);
      return <g />;
    }
    // dynamically render glyph component by name
    const GlyphComponent = glyphs[name];

    return (
      <g
        className="glyph"
        fill="currentColor"
        transform={"scale(" + ratio + ")"}
      >
        <GlyphComponent />
      </g>
    );
  }
}

Glyph.defaultProps = {
  ratio: 1
};
