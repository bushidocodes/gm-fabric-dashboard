import ReactSelector from "testcafe-react-selectors";
import BaseInstanceViewModel from "../view-models/base-instance-view-model";

fixture`Getting Started`.page`http://localhost:3000`;

let instanceView = new BaseInstanceViewModel();

test("My first test", async t => {
  await t.click(ReactSelector("GMServiceCard").withText("Crashy"));
  await t.click(
    ReactSelector("TableCol")
      .find("a")
      .nth(0)
  );
  await t.wait(2000);
  await t.click(instanceView.linkExplorer);

  await t.typeText(instanceView.inputSearchMetrics, "r");

  await t.click(instanceView.inspectorItems.nth(0));
  await t.wait(3000);
  await t.expect(await instanceView.inspectorGraph.count).eql(1);
  await t.expect(instanceView.inspectorGraphTitleText.innerText).eql("Hey");
});
