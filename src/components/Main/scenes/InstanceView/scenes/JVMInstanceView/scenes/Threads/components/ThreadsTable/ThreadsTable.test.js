import React from "react";

import configureStore from "redux-mock-store";
import { renderWithIntl } from "utils/i18nTesting";
import mockState from "json/mockReduxState";
import ThreadsTable from "./index";

const mockStore = configureStore()(mockState);

describe("ThreadsTable component", () => {
  test("matches the snapshot", () => {
    expect(
      renderWithIntl(<ThreadsTable store={mockStore} />)
    ).toMatchSnapshot();
  });
});
