import React from "react";
import { render } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import configureMockStore from "redux-mock-store";
import PropTypes from "prop-types";

import state from "json/mockReduxState";
import JVMHeaderContent from "./JVMHeaderContent";

// Router is necessary because of the <Tab />'s which need a router context
const RouterWrap = (
  <MemoryRouter>
    <Route
      render={props => (
        <JVMHeaderContent {...props} metrics={state.instance.metrics} />
      )}
    />
  </MemoryRouter>
);

describe("JVMHeaderContent", () => {
  test("matches snapshot", () => {
    const tree = render(RouterWrap, {
      context: { store: configureMockStore()(state) },
      childContextTypes: { store: PropTypes.object.isRequired }
    });
    expect(tree).toMatchSnapshot();
  });
});
