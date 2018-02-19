import SettingsViewModel from "../view-models/settings-view-model";
import FabricViewModel from "../view-models/fabric-view-model";
import ServiceViewModel from "../view-models/service-view-model";

const settingsView = new SettingsViewModel();
const fabricView = new FabricViewModel();
const serviceView = new ServiceViewModel();

fixture`Settings View`.page`http://localhost:3000`.beforeEach(
  async t => await t.click(settingsView.linkSettings)
);

test("Validate Fabric Polling Settings Functionality", async t => {
  let fabricPollingButtonText = await settingsView.fabricPollingButtonText
    .innerText;

  await t
    .expect(fabricPollingButtonText)
    .contains("Pause Polling")
    .click(settingsView.fabricPollingButton);

  fabricPollingButtonText = await settingsView.fabricPollingButtonText
    .innerText;

  await t.expect(fabricPollingButtonText).contains("Resume Polling");

  /*/ The following tests should work according to testcafe
  https://testcafe-discuss.devexpress.com/t/how-to-perform-drag-action-on-input-type-range-elements/834/2

  However, for some reason, no matter what text we type, it comes back with the
  magic number 63. ¯\_(ツ)_/¯ /*/

  // await t.typeText(settingsView.fabricInputSlider, "50").wait(1000);

  // const inputRangeValue = await settingsView.fabricInputSlider.getReact(
  //   ({ props, state }) => props.value
  // );

  // await t.expect(inputRangeValue).eql(50);
});

test("Validate Instance Polling Settings Functionality", async t => {
  // Instance polling should be disabled because we have not selected an instance
  await t
    .expect(settingsView.instancePollingButton.hasAttribute("disabled"))
    .ok();

  // Navigate back to Fabric view and select a service and an instance
  await t
    .click(settingsView.linkFabric)
    .click(fabricView.servicesCards.withText("USA"))
    .click(serviceView.instanceIDs.nth(0))
    .click(settingsView.linkSettings);

  let instancePollingButtonText = await settingsView.instancePollingButtonText
    .innerText;

  await t
    .expect(instancePollingButtonText)
    .contains("Pause Polling")
    .click(settingsView.instancePollingButton);

  instancePollingButtonText = await settingsView.instancePollingButtonText
    .innerText;

  await t.expect(instancePollingButtonText).contains("Resume Polling");
});

test("Validate Clear Cache Modal Functionality", async t => {
  await t
    .click(settingsView.clearCacheButton)
    .click(settingsView.clearCacheModalCancelButton);

  await t
    .click(settingsView.clearCacheButton)
    .click(settingsView.clearCacheModalConfirmButton)
    .expect(settingsView.cacheSizeText.innerText)
    .contains("0 B");
});
