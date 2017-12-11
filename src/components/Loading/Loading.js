import React from "react";
import { PropTypes } from "prop-types";

import Spinner from "./components/Spinner";
import Message from "./components/Message";

const Loading = ({ error, pastDelay, timedOut }) => {
  if (error) {
    return (
      <Message>{"An error occurred while loading this component."}</Message>
    );
  } else if (timedOut) {
    return (
      <Message>
        {"This component failed to load within the allotted 15 seconds."}
      </Message>
    );
  } else if (pastDelay) {
    return <Spinner />;
  } else {
    return null;
  }
};

Loading.propTypes = {
  error: PropTypes.bool,
  pastDelay: PropTypes.bool,
  timedOut: PropTypes.bool
};

export { Loading };
