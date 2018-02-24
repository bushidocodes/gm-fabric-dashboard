import ReactSelector from "testcafe-react-selectors";
import { Selector } from "testcafe";
import BaseInstanceView from "./base-instance-view-model";

export default class InstanceJvmViewModel extends BaseInstanceView {
  constructor() {
    super();
    // Summary
    this.summaryHostCPUReadout = ReactSelector(
      "ReadoutDisplay ItemDisplay"
    ).withText("Host CPU Cores");

    // Navigation
    this.linkThreads = ReactSelector("TabLink").withText("Threads");
    this.textThreadsCount = ReactSelector("TabLink")
      .withText("Threads")
      .find("dd");
    this.linkHTTP = ReactSelector("TabLink").withText("HTTP");
    this.textDetailHTTP = ReactSelector("TabLink")
      .withText("HTTP")
      .find("dd");
    this.linkJVM = ReactSelector("TabLink").withText("JVM");
    this.textDetailJVM = ReactSelector("TabLink")
      .withText("JVM")
      .find("dd");
    this.linkFinagle = ReactSelector("TabLink").withText("Finagle");
    this.textDetailFinagle = ReactSelector("TabLink")
      .withText("Finagle")
      .find("dd");

    // Threads Table Toolbar
    this.inputSearchThreads = ReactSelector("ToolbarLeft input");
    this.selectGroupThreads = Selector(".Select-control").withText("Group");
    // this.selectGroupThreads needs to be selected first
    // so that the following options are created in the DOM
    this.optionGroupThreadsState = Selector(".Select-option").withText("State");
    this.optionGroupThreadsNone = Selector(".Select-option").withText("None");

    this.selectSortThreads = Selector(".Select-control").withText("Sort");
    // this.selectSortThreads needs to be selected first
    // so that the following options are created in the DOM
    this.optionSortThreadsState = Selector(".Select-option").withText("State");
    this.optionSortThreadsID = Selector(".Select-option").withText("ID");
    this.optionSortThreadsName = Selector(".Select-option").withText("Name");

    // Threads Table
    this.threadsTableRows = ReactSelector("TableRow");
    this.threadsStackTraces = ReactSelector("StackTrace");

    // HTTP
    this.allHttpGrid = Selector(".react-grid-item");
    this.httpCharts = ReactSelector("LineChartDisplay");
    this.httpGrid1 = Selector(".react-grid-item").nth(0);
    this.httpGrid2 = Selector(".react-grid-item").nth(1);
    this.httpGrid3 = Selector(".react-grid-item").nth(2);
    this.httpGrid4 = Selector(".react-grid-item").nth(3);

    // JVM
    this.allJvmGrid = Selector(".react-grid-item");
    this.jvmCharts = ReactSelector("LineChartDisplay");
    this.jvmGrid1 = Selector(".react-grid-item").nth(0);
    this.jvmGrid2 = Selector(".react-grid-item").nth(1);

    // Finagle
    this.allFinagleGrid = Selector(".react-grid-item");
    this.finagleGrid1 = Selector(".react-grid-item").nth(0);
    this.finagleGrid2 = Selector(".react-grid-item").nth(1);
    this.finagleGrid3 = Selector(".react-grid-item").nth(2);
    this.finagleGrid4 = Selector(".react-grid-item").nth(3);
  }
}
