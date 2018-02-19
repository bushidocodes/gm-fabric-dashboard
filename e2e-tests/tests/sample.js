import ReactSelector from "testcafe-react-selectors";
import BaseInstanceViewModel from "../view-models/base-instance-view-model";
import SettingsViewModel from "../view-models/settings-view-model";
fixture`Getting Started`.page`http://localhost:3000`;

let instanceView = new BaseInstanceViewModel();
let settingsView = new SettingsViewModel();

test("My first test", async t => {
  await t.click(ReactSelector("GMServiceCard").withText("Crashy"));
  await t.click(
    ReactSelector("TableCol")
      .find("a")
      .nth(0)
  );

  await t.click(settingsView.linkSettings);

  // await t
  //   .typeText(settingsView.fabricInputSlider, "80")
  //   .expect(settingsView.fabricInputSlider.value)
  //   .eql("80");

  await t.wait(2000);
  // await t.click(settingsView.instancePollingButton);

  // await t.click(instanceView.inspectorItems.nth(0));
  // await t.wait(3000);
  await t.click(settingsView.clearCacheButton);
  await t.wait(1000);
  await t.click(settingsView.clearCacheModalCancelButton);
  await t.wait(1000);
  await t.click(settingsView.clearCacheButton);
  await t.wait(1000);
  await t.click(settingsView.clearCacheModalConfirmButton);
  await t.wait(1000);
  await t.expect(settingsView.cacheSizeText.innerText).eql("0 B");

  // await t.expect(instanceView.inspectorGraphTitleText.innerText).eql("Hey");
});
