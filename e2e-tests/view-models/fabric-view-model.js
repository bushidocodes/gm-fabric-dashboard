import ReactSelector from "testcafe-react-selectors";
import BaseView from "./base-view-model";
import { Selector } from "testcafe";

export default class FabricViewModel extends BaseView {
  constructor() {
    super();

    // Tab bar
    this.linkAllServices = ReactSelector("TabLink").withText("All Services");
    this.textAllServicesCount = ReactSelector("TabLink")
      .withText("All Services")
      .find("dd");
    this.linkDown = ReactSelector("TabLink").withText("Down");
    this.textDownCount = ReactSelector("TabLink")
      .withText("Down")
      .find("dd");
    this.linkWarning = ReactSelector("TabLink").withText("Warning");
    this.textWarningCount = ReactSelector("TabLink")
      .withText("Warning")
      .find("dd");
    this.linkStable = ReactSelector("TabLink").withText("Stable");
    this.textStableCount = ReactSelector("TabLink")
      .withText("Stable")
      .find("dd");

    // Filter bar
    this.inputSearchServices = ReactSelector("Toolbar").find("input");
    this.linkCards = ReactSelector("ButtonWrap").withAttribute(
      "title",
      "Cards"
    );
    this.linkList = ReactSelector("ButtonWrap").withAttribute("title", "List");

    this.selectGroup = Selector(".Select-control").withText("Group");
    // this.selectSort needs to be selected first,
    // so that the following options are created in the DOM
    this.optionGroupOwner = Selector(".Select-option").withText("Owner");
    this.optionGroupCapability = Selector(".Select-option").withText(
      "Capability"
    );
    this.optionGroupStatus = Selector(".Select-option").withText("Status");
    this.optionGroupNone = Selector(".Select-option").withText("None");

    this.selectSort = Selector(".Select-control").withText("Sort");
    // this.selectSort needs to be selected first,
    // so that the following options are created in the DOM
    this.optionSortName = Selector(".Select-option").withText("Name");
    this.optionSortStatus = Selector(".Select-option").withText("Status");

    // Grid
    // The following return all matching elements
    this.servicesCards = ReactSelector("GMServiceCard");
    this.servicesList = ReactSelector("ServicesListItem");
    this.servicesSections = ReactSelector("GMServiceCardCollection");
  }
}
