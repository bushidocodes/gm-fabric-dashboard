import React from "react";
import { PropTypes } from "prop-types";

import ErrorBox from "./ErrorBox";
import ErrorContent from "./ErrorContent";
import Span from "./Span";

/**Stateless functional React component that renders the error message box
 * Takes an error message and returns error message box
 * @param {string} errorMsg
 * @returns react component
 */

const NotFoundError = ({ errorMsg = "Not Found" }) => {
  return (
    <ErrorBox>
      <ErrorContent>
        <Span data-uk-icon="icon: warning; ratio: 1.8" />
        <Span>{errorMsg}</Span>
      </ErrorContent>
    </ErrorBox>
  );
};

NotFoundError.propTypes = {
  errorMsg: PropTypes.string
};

export default NotFoundError;
