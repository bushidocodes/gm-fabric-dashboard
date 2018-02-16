import ReactSelector from "testcafe-react-selectors";

fixture`Getting Started`.page`http://localhost:3000`;

test("My first test", async t => {
  const searchInput = ReactSelector("Toolbar").find("input");
  await t
    .expect(searchInput.value)
    .eql("", "input is empty")
    .typeText(searchInput, "Grace Hopper")
    .expect(searchInput.value)
    .contains("G", 'input contains text "G"');
});
