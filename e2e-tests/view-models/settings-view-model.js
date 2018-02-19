import ReactSelector from "testcafe-react-selectors";
import { Selector } from "testcafe";
import BaseView from "./base-view-model";

export default class SettingsViewModel extends BaseView {
  constructor() {
    super();
    this.fabricPollingButton = Selector("button")
      .withAttribute("type", "polling")
      .nth(0);
    this.fabricPollingButtonText = ReactSelector("ButtonWrap span").nth(0);
    this.fabricInputSlider = ReactSelector("InputRange").nth(0);
    this.instancePollingButton = Selector("button")
      .withAttribute("type", "polling")
      .nth(1);
    this.instancePollingButtonText = ReactSelector("ButtonWrap span").nth(1);
    this.instanceInputSlider = ReactSelector("InputRange").nth(1);

    this.clearCacheModal = ReactSelector("ReactModal");
    this.cacheSizeText = ReactSelector("ReadoutItemValue");
    this.clearCacheButton = ReactSelector("ButtonWrap").withAttribute(
      "title",
      "Clear Cache"
    );
    this.clearCacheModalCancelButton = ReactSelector(
      "ButtonWrap"
    ).withAttribute("title", "Cancel");
    this.clearCacheModalConfirmButton = ReactSelector(
      "ButtonWrap"
    ).withAttribute("title", "Confirm");
  }
}
