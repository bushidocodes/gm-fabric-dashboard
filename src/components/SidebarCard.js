import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button.js";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";

export default class SidebarCard extends Component {
  static propTypes = {
    chartData: PropTypes.array,
    chartTitle: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
    lines: PropTypes.array,
    tabIndex: PropTypes.number,
    title: PropTypes.string
  };

  static defaultProps = {
    lines: []
  };

  state = {
    isOpen: true
  };

  render() {
    const {
      chartData,
      chartTitle,
      href,
      icon,
      lines,
      tabIndex,
      title
    } = this.props;
    return (
      <NavLink
        activeClassName="active"
        className={
          this.state.isOpen ? "summary-bar-card open" : "summary-bar-card"
        }
        tabIndex={tabIndex}
        to={href}
      >
        <div className="summary-bar-card-title">
          <span
            className="summary-bar-card-icon"
            data-uk-icon={`icon: ${icon || "grid"}; ratio: 1`}
          />
          <h1 className="summary-bar-card-heading">{title}</h1>
          {(this.props.lines.length > 0 ||
            this.props.chartTitle ||
            this.props.chartData) && (
            <Button
              clickAction={evt => {
                evt.preventDefault();
                this.setState({ isOpen: !this.state.isOpen });
              }}
              icon={"chevron-left"}
              label={"Details"}
              outline={"none"}
            />
          )}
        </div>
        <div className="uk-card-body summary-bar-card-body">
          {lines.map(line => (
            <div className="summary-bar-card-kv" key={line.name}>
              <dt className="summary-bar-card-kv-key">{line.name}</dt>
              <dd className="summary-bar-card-kv-value">
                <span className="value-text">{line.value}</span>
                {chartData && (
                  <div className="sparkline-container">
                    <Sparklines
                      className="summary-datapoint-line"
                      data={chartData}
                      // limit={30}
                      margin={3}
                      // preserveAspectRatio="xMaxYMin"
                      svgHeight={20}
                      svgWidth={120}
                      title={chartTitle}
                    >
                      <SparklinesSpots />
                      <SparklinesLine
                        style={{
                          stroke: "currentColor",
                          strokeWidth: "2",
                          fill: "currentColor",
                          fillOpacity: "0"
                        }}
                      />
                    </Sparklines>
                  </div>
                )}
              </dd>
            </div>
          ))}
        </div>
      </NavLink>
    );
  }
}
