import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import { NavLink } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default class SummaryBarCard extends PureComponent {
  static propTypes = {
    chartData: PropTypes.array,
    chartTitle: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.string,
    isActive: PropTypes.bool,
    lines: PropTypes.array,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
  };

  static defaultProps = {
    lines: []
  };

  state = {
    isOpen: false
  };

  render() {
    const {
      chartData,
      chartTitle,
      href,
      icon,
      isActive,
      lines,
      tabIndex,
      title,
    } = this.props;
    return (
      <NavLink
        activeClassName="active"
        className={this.state.isOpen ? 'summary-bar-card open' : 'summary-bar-card'}
        tabIndex={tabIndex}
        to={href}
      >
        <div className="summary-bar-card-title">
          <span
            className="summary-bar-card-icon"
            data-uk-icon={`icon: ${icon || "grid"}; ratio: 1.4`}
          />
          <h1 className="summary-bar-card-heading">{title}</h1>
          <button
            className="summary-bar-card-show-toggle uk-button"
            onClick={evt => {
              evt.preventDefault();
              this.setState({ isOpen: !this.state.isOpen });
            }}
          >
            <span data-uk-icon={`icon: chevron-left; ratio: 1`} className="summary-card-accordion-arrow"/>
          </button>
        </div>
        {this.state.isOpen &&
          <div className="uk-card-body summary-bar-card-body">
            {lines.map(line =>
              <div className="summary-bar-card-kv">
                <dt key={line.name} className="summary-bar-card-kv-key">
                  {line.name}
                </dt>
                <dd className="summary-bar-card-kv-value">
                  {line.value}
                </dd>
              </div>
            )}
            {chartTitle &&
              <div>
                {chartTitle}
              </div>}
            {chartData &&
              <Sparklines
                data={chartData}
                preserveAspectRatio="xMaxYMin"
                style={{ width: "100%" }}
              >
                <SparklinesLine
                  style={{
                    stroke: "currentColor",
                    strokeWidth: 1,
                    fill: "currentColor",
                    fillOpacity: ".1"
                  }}
                />
              </Sparklines>}
          </div>}
      </NavLink>
    );
  }
}
