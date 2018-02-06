import React from "react";

import state from "json/mockReduxState";
import JVMHeaderContent from "./JVMHeaderContent";
import { shallowWithIntl } from "utils/i18nTesting";

// Router is necessary because of the <Tab />'s which need a router context
const RouterWrap = <JVMHeaderContent metrics={state.instance.metrics} />;

describe("JVMHeaderContent", () => {
  test("matches snapshot", () => {
    const tree = shallowWithIntl(RouterWrap);
    expect(tree).toMatchSnapshot();
  });
});
