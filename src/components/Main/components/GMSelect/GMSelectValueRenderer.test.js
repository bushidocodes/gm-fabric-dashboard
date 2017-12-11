import React from "react";
import { shallow } from "enzyme";
import GMSelectValueRenderer from "./GMSelectValueRenderer";

describe("GMSelectValueRenderer", () => {
  it("matches snapshot", () => {
    const aGMSelectValueRenderer = shallow(
      <GMSelectValueRenderer title="Yo" val={{ label: "Yo label" }} />
    );
    expect(aGMSelectValueRenderer).toMatchSnapshot();
  });
});
