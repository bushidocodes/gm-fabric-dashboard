import React from "react";
import { PropTypes } from "prop-types";

LayoutSection.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired
};

function LayoutSection(props: { children?: any }, title, className) {
  return (
    <section className={"layout-section " + props.className}>
      <header>
        <span className="section-icon" data-uk-icon={`icon: grid; ratio: 1`} />
        <h3 className="section-title">
          {props.title}
        </h3>
      </header>
      <div className="section-content">
        {props.children}
      </div>
    </section>
  );
}

export default LayoutSection;
