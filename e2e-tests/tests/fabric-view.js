import FabricViewModel from "../view-models/fabric-view-model";
import sleep from "../helpers/sleeper";

fixture`Fabric View`.page`http://localhost:3000`;

const fabricView = new FabricViewModel();
const defaultTimeout = 30; // Number of seconds to wait before giving up repeated attempts

test("Validate Service Counts", async t => {
  // Count all services and make sure the count matches what's shown in the All Services tab
  var attempts = 0;
  var allServicesCardsCount = 0;

  while (allServicesCardsCount === 0 && attempts < defaultTimeout) {
    allServicesCardsCount = await fabricView.servicesCards.count;
    sleep(1000);
    attempts++;
  }

  const allServicesTabCount = parseInt(
    await fabricView.textAllServicesCount.textContent
  );

  await t
    .expect(allServicesCardsCount)
    .eql(allServicesTabCount, "All Services count matches");

  // Navigate to the Down tab
  await t.click(fabricView.linkDown);

  // Count down services and make sure the count matches what's shown in the Down tab
  attempts = 0;
  var downServicesCardsCount = 0;

  while (downServicesCardsCount === 0 && attempts < defaultTimeout) {
    downServicesCardsCount = await fabricView.servicesCards.count;
    sleep(1000);
    attempts++;
  }

  const downServicesTabCount = parseInt(
    await fabricView.textDownCount.textContent
  );

  await t
    .expect(downServicesCardsCount)
    .eql(downServicesCardsCount, "Down services count matches");

  // Navigate to the Warning tab
  await t.click(fabricView.linkWarning);

  // Count the warning services and make sure the count matches what's shown in the Warning tab
  attempts = 0;
  var warningServicesCardsCount = 0;

  while (warningServicesCardsCount === 0 && attempts < defaultTimeout) {
    warningServicesCardsCount = await fabricView.servicesCards.count;
    sleep(1000);
    attempts++;
  }

  const warningServicesTabCount = parseInt(
    await fabricView.textWarningCount.textContent
  );

  await t
    .expect(warningServicesCardsCount)
    .eql(warningServicesTabCount, "Warning services count matches");

  // Navigate to the Stable tab
  await t.click(fabricView.linkStable);

  // Count the stable services and make sure the count matches what's shown in the Stable tab
  attempts = 0;
  var stableServicesCardsCount = 0;

  while (stableServicesCardsCount === 0 && attempts < defaultTimeout) {
    stableServicesCardsCount = await fabricView.servicesCards.count;
    sleep(1000);
    attempts++;
  }

  const stableServicesTabCount = parseInt(
    await fabricView.textStableCount.textContent
  );

  await t
    .expect(stableServicesCardsCount)
    .eql(stableServicesTabCount, "Stable service count matches");
});
