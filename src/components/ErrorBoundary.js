import PropTypes from "prop-types";
import React from "react";

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    fallBackUI: PropTypes.element
  };

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      info: ""
    };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  // Check if a fallback UI is provided, if not, render a default error
  fallBackUI = () => {
    return this.props.fallBackUI ? (
      this.props.fallBackUI
    ) : (
      <div className="no-routes-found-error">
        <div className="content">
          <span data-uk-icon="icon: warning; ratio: 1.8" />
          <span>{`Error: ${this.state.info}`}</span>
        </div>
      </div>
    );
  };
  // If there is an error, render the fallback UI, else render children
  render() {
    return this.state.error ? this.fallBackUI() : this.props.children;
  }
}

export default ErrorBoundary;
