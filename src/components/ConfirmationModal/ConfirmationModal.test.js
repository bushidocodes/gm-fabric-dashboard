import React from "react";
import { shallow } from "enzyme";
import ConfirmationModal from "./ConfirmationModal";

describe("ConfirmationModal", () => {
  it("matches snapshot when closed", () => {
    const aConfirmationModal = shallow(
      <ConfirmationModal
        isOpen={false}
        onCancel={() => {}}
        onConfirm={() => {}}
        question="Will this test pass?"
        secondary="Only time will tell"
      />
    );
    expect(aConfirmationModal).toMatchSnapshot();
  });
  it("matches snapshot when open", () => {
    const aConfirmationModal = shallow(
      <ConfirmationModal
        isOpen={true}
        onCancel={() => {}}
        onConfirm={() => {}}
        question="Will this test pass?"
        secondary="Only time will tell"
      />
    );
    expect(aConfirmationModal).toMatchSnapshot();
  });
});
