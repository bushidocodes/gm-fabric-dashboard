import React from "react";
import { render } from "enzyme";
import { MemoryRouter, Route } from "react-router";

import state from "json/mockReduxState";
import FabricAppHeaderContent from "./Fabric";
import configureMockStore from "redux-mock-store";

// Router is necessary because of the <Tab />'s which need a router context
const RouterWrap = (
  <MemoryRouter>
    <Route
      render={props => (
        <FabricAppHeaderContent
          {...props}
          store={configureMockStore()(state)}
        />
      )}
    />
  </MemoryRouter>
);

describe("FabricAppHeaderContent", () => {
  test("matches snapshot", () => {
    const tree = render(RouterWrap);
    expect(tree).toMatchSnapshot();
  });
});
