import React from "react";
import { PropTypes } from "prop-types";

import DefaultRouter from "./default/Router";
import GolangRouter from "./golang/Router";
import JVMRouter from "./jvm/Router";

Router.propTypes = {
  runtime: PropTypes.string.isRequired
};

/**
 * Root Router 
 * @export
 * @param {Object} props - see propTypes
 * @returns JSX.Element - A 
 */
export default function Router({ runtime }) {
  switch (runtime) {
    case "JVM":
      return <JVMRouter />;
    case "GOLANG":
      return <GolangRouter />;
    default:
      return <DefaultRouter />;
  }
}
