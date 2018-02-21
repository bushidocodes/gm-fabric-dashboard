import ReactSelector from "testcafe-react-selectors";
import { Selector } from "testcafe";
import BaseInstanceViewModel from "./base-instance-view-model";

export default class InstanceGoViewModel extends BaseInstanceViewModel {
  constructor() {
    super();

    // Navigation
    this.linkFunctions = ReactSelector("TabLink").withText("Functions");
    this.textDetailFunctions = ReactSelector("TabLink")
      .withText("Functions")
      .find("dd");
    this.linkGo = ReactSelector("TabLink").withText("Go");
    this.textDetailGo = ReactSelector("TabLink")
      .withText("Go")
      .find("dd");

    // Summary
    this.summaryHostCPUReadout = ReactSelector(
      "ReadoutDisplay ItemDisplay"
    ).withText("Host CPU Utilized");
    this.summaryMemoryReadout = ReactSelector(
      "ReadoutDisplay ItemDisplay"
    ).withText("Memory Utilized");

    // Functions Table Toolbar
    this.inputSearchFunctions = ReactSelector("ToolbarLeft input");
    this.selectSortFunctions = Selector(".Select-control").withText("Sort");
    // this.selectSortFunctions needs to be selected first
    // so that the following options are created in the DOM
    this.optionSortFunctionsFunction = Selector(".Select-option").withText(
      "Function"
    );
    this.optionSortFunctionsStatus = Selector(".Select-option").withText(
      "Requests"
    );
    this.optionSortFunctionsError = Selector(".Select-option").withText(
      "Error %"
    );
    this.optionSortFunctionsLatency50 = Selector(".Select-option").withText(
      "Latency 50%"
    );
    this.optionSortFunctionsLatency99 = Selector(".Select-option").withText(
      "Latency 99%"
    );

    // Functions Table
    this.functionsTableRows = ReactSelector("TableRow");
    this.functionsLineCharts = ReactSelector("LineChartDisplay");

    // Go
    this.goGrid1 = Selector(".react-grid-item").nth(0);
    this.goGrid2 = Selector(".react-grid-item").nth(1);
  }
}
