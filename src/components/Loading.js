import React from "react";
import { PropTypes } from "prop-types";
import styled, { keyframes } from "styled-components";

const Rotate360 = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -30px;
  margin-left: -30px;
  width: 60px;
  height: 60px;
  font-size: 8px;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(0, 0, 0, 0.2);
  border-right: 1.1em solid rgba(0, 0, 0, 0.2);
  border-bottom: 1.1em solid rgba(0, 0, 0, 0.2);
  border-left: 1.1em solid #000000;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${Rotate360} 1.1s infinite linear;
  animation: ${Rotate360} 1.1s infinite linear;
  border-radius: 50%;
`;

const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20px;
  margin-left: -150px;
  width: 300px;
  text-align: center;
`;

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
