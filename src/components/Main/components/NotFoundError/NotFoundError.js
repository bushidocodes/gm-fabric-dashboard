import React from "react";
import { PropTypes } from "prop-types";

import ErrorBox from "./components/ErrorBox";
import ErrorContent from "./components/ErrorContent";

import Icon from "components/Icon";
import Glyph from "components/Glyphs/index";
import Span from "components/Main/components/Span";

/**Stateless functional React component that renders the error message box
 * Takes an error message and returns error message box
 * @param {string} errorMsg
 * @returns react component
 */

const NotFoundError = ({ errorMsg = "Not Found" }) => {
  return (
    <ErrorBox>
      <ErrorContent>
        <Span>
          <Icon borderStyle="BorderTriangleSmall" iconRatio={"3"}>
            <Glyph name={"Exclamation"} />
          </Icon>
        </Span>
        <Span>{errorMsg}</Span>
      </ErrorContent>
    </ErrorBox>
  );
};

NotFoundError.propTypes = {
  errorMsg: PropTypes.string
};

export default NotFoundError;
