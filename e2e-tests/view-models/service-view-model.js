import ReactSelector from "testcafe-react-selectors";
import { Selector } from "testcafe";

import BasePage from "./base-view-model";

export default class ServiceViewModel extends BasePage {
  constructor() {
    super();
    // Navigation
    this.linkInstances = ReactSelector("TabLink").withText("Instances");
    this.textInstancesCount = ReactSelector("TabLink")
      .withText("Instances")
      .find("dd");

    // Toolbar
    this.inputSearchInstances = ReactSelector("ToolbarLeft").find("input");
    this.selectSort = Selector(".Select-control").withText("Sort");
    // this.selectSort needs to be selected first
    // so that the following options are created in the DOM
    this.optionSortName = Selector(".Select-option").withText("Name");
    this.optionSortStatus = Selector(".Select-option").withText("Uptime");

    // Instance table
    this.tableRows = ReactSelector("TableRow");
    this.instanceIDs = ReactSelector("TableCol").find("a");
    this.instanceUptimes = ReactSelector("ArrayValue");
  }
}
