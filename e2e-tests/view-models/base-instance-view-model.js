import ReactSelector from "testcafe-react-selectors";
import { Selector } from "testcafe";
import BaseViewModel from "./base-view-model";

export default class BaseInstanceViewModel extends BaseViewModel {
  constructor() {
    super();
    // The following selectors are common to both JVM and GO instance views

    // Navigation
    this.linkSummary = ReactSelector("TabLink").withText("Summary");
    this.textUptimeCount = ReactSelector("TabLink")
      .withText("Summary")
      .find("dd");
    this.linkRoutes = ReactSelector("TabLink").withText("Routes");
    this.textRoutesCount = ReactSelector("TabLink")
      .withText("Routes")
      .find("dd");
    this.linkExplorer = ReactSelector("TabLink").withText("Explorer");

    // Summary view
    this.summaryVitalsSection = ReactSelector("Header").withText("Vitals");
    this.summaryStatisticsSection = ReactSelector("Header").withText(
      "Statistics"
    );
    this.summaryAllReadouts = ReactSelector("Readout");
    this.summaryUptimeReadout = ReactSelector("ArrayValue").nth(1);
    this.summaryRequestPerSecChart = ReactSelector("LineChartDisplay").withText(
      "Requests Per Second"
    );
    this.summaryAvgResponseTimeReadout = ReactSelector(
      "ReadoutDisplay ItemDisplay"
    ).withText("Avg. Response Time");
    this.summaryErrorRateReadout = ReactSelector(
      "ReadoutDisplay ItemDisplay"
    ).withText("Error Rate");

    // Routes View
    this.inputSearchRoutes = ReactSelector("ToolbarLeft").find("input");
    this.routesTableRows = ReactSelector("TableRow");
    this.routesTableColsRequests = ReactSelector("TableCol").withAttribute(
      "name",
      "requests"
    );
    this.routesTableColsError = ReactSelector("TableCol").withAttribute(
      "name",
      "error"
    );
    this.routesTableColsLatency50 = ReactSelector("TableCol").withAttribute(
      "name",
      "latency50"
    );
    this.routesTableColsLatency99 = ReactSelector("TableCol").withAttribute(
      "name",
      "latency99"
    );
    this.routesChart = ReactSelector("LineChartDisplay");
    this.routesChartTitle = ReactSelector("LineChartTitle");
    this.selectSortRoutes = Selector(".Select-control").withText("Sort");
    // this.selectSort needs to be selected first
    // so that the following options are created in the DOM
    this.optionSortRoutesRoute = Selector(".Select-option").withText("Route");
    this.optionSortRoutesRequests = Selector(".Select-option").withText(
      "Requests"
    );
    this.optionSortRoutesError = Selector(".Select-option").withText("Error %");
    this.optionSortRoutesLatency50 = Selector(".Select-option").withText(
      "Latency 50%"
    );
    this.optionSortRoutesLatency99 = Selector(".Select-option").withText(
      "Latency 99%"
    );

    // Explorer View
    this.inputSearchMetrics = ReactSelector("InspectorSearch input");
    this.checkboxHideZero = ReactSelector("InspectorHideZero");
    this.checkboxHideStatic = ReactSelector("InspectorHideStatic");
    this.inspectorItems = ReactSelector("InspectorItem");
    this.inspectorGraph = ReactSelector("LineChartDisplay");
    this.inspectorGraphTitleText = ReactSelector("LineChartTitle");
  }
}
