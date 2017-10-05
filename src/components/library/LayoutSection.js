import React from "react";
import { PropTypes } from "prop-types";

LayoutSection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired
};

/**
 * Section of a static dashboard, complete with header and icon
 * @param {Object} props - refer to propTypes 
 */
function LayoutSection({ children, className, title, icon }) {
  return (
    <section className={"layout-section " + className}>
      <header>
        {icon ? (
          <span className="section-icon">
            <img src={icon} alt="" />
          </span>
        ) : (
          <span
            className="section-icon"
            data-uk-icon={`icon: grid; ratio: 1`}
          />
        )}
        <h3 className="section-title">{title}</h3>
      </header>
      <div className="section-content">{children}</div>
    </section>
  );
}

export default LayoutSection;
