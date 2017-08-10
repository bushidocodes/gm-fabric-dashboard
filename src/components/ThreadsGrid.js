import { Actions } from "jumpstate";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import JVMThreadsSection from "./JVMThreadsSection";

class ThreadsGrid extends Component {
  static propTypes = {
    threadsTable: PropTypes.array
  };

  componentDidMount() {
    Actions.fetchThreads();
  }

  render() {
    const { threadsTable } = this.props;
    return (
      <div className="thread-table-container">
        <JVMThreadsSection threadsTable={threadsTable} />
      </div>
    );
  }
}

function mapStateToProps({ metrics: { threadsTable } }) {
  return { threadsTable };
}

export default connect(mapStateToProps)(ThreadsGrid);
