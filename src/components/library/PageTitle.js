import { PropTypes } from "prop-types";
import React from "react";

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

/**
 * Full width title component intended to be displayed at the top of the main view area 
 * just beneath the header
 * @param {*} props - see propTypes 
 */
function PageTitle({ title }) {
  return (
    <div className="page-title">
      <h1>{title}</h1>
    </div>
  );
}

export default PageTitle;
