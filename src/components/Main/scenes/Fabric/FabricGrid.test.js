import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import _ from "lodash";

import FabricGrid from "./FabricGrid";
import GMServiceCardView from "./components/FabricMainView/scene/Card/components/GMServiceCardView";
import "store/states/fabric.js";

const mockServices = {
  "AAC Remote Information|1": {
    authorized: true,
    capability: "Crime Fighting",
    documentation: "https://www.google.com",
    instances: [{ name: "4o896smz6ag0000000000", start_time: 1277071626343 }],
    maximum: 7,
    metered: true,
    minimum: 4,
    name: "AAC Remote Information",
    owner: "Domain",
    runtime: "GO",
    threaded: true,
    version: "1"
  },
  "Entry Monitoring|4.2": {
    authorized: true,
    capability: "Crime Fighting",
    documentation: "https://www.google.com",
    instances: [],
    maximum: 4,
    metered: true,
    minimum: 2,
    name: "Entry Monitoring",
    owner: "AAC",
    runtime: "JVM",
    threaded: true,
    version: "4.2"
  },
  "Grace Hopper Battleship Control Program|1.0": {
    authorized: true,
    capability: "System of Record",
    documentation: "https://www.google.com",
    instances: [
      { name: "ee0fa3669fea7e9a0adea649c46bca56", start_time: 1508854912461 }
    ],
    maximum: 7,
    metered: false,
    minimum: 1,
    name: "Grace Hopper Battleship Control Program|1.0",
    owner: "Bootstrap",
    runtime: "COBOL",
    threaded: false,
    version: "4.6"
  }
};

// Wrap Fabric Grid in Memory Router to mock route props (history, match, location)
const RouterWrap = route => {
  return (
    <MemoryRouter initialEntries={route}>
      <Route
        render={props => (
          <FabricGrid {...props} services={_.values(mockServices)} />
        )}
      />
    </MemoryRouter>
  );
};

let FabricGridWrap;

describe("Fabric Grid Main View", () => {
  beforeEach(() => {
    FabricGridWrap = mount(RouterWrap(["/"]));
  });

  test("renders all services in card view", () => {
    expect(FabricGridWrap.find(FabricGrid).find("GMServiceCard").length).toBe(
      3
    );
    expect(
      FabricGridWrap.find(FabricGrid).find("GMServiceListItem").length
    ).toBe(0);
    expect(FabricGridWrap.find(FabricGrid).instance().state.displayType).toBe(
      "Card"
    );
    expect(FabricGridWrap.html().includes("AAC Remote Information")).toBe(true);
    expect(FabricGridWrap.html().includes("Entry Monitoring")).toBe(true);
    expect(
      FabricGridWrap.html().includes("Grace Hopper Battleship Control Program")
    ).toBe(true);
  });

  test("renders all services in table view", () => {
    // Remount with new search query
    FabricGridWrap = mount(RouterWrap([{ search: "?viewType=Table" }]));

    let FabricGridInstance = FabricGridWrap.find(FabricGrid).instance();

    expect(
      FabricGridWrap.find(FabricGrid).find("GMServiceListItem").length
    ).toBe(3);
    expect(FabricGridWrap.find(FabricGrid).find("GMServiceCard").length).toBe(
      0
    );
    expect(FabricGridInstance.state.displayType).toBe("Table");
    expect(FabricGridWrap.html().includes("AAC Remote Information")).toBe(true);
    expect(FabricGridWrap.html().includes("Entry Monitoring")).toBe(true);
    expect(
      FabricGridWrap.html().includes("Grace Hopper Battleship Control Program")
    ).toBe(true);
  });

  test("groups services by Owner, Capability, Status, and None", () => {
    let FabricGridInstance = FabricGridWrap.find(FabricGrid).instance();

    FabricGridInstance.setState({ groupByAttribute: "Owner" });
    expect(FabricGridInstance.state.groupByAttribute).toBe("Owner");
    expect(FabricGridWrap.html().includes("domain")).toBe(true);
    expect(FabricGridWrap.html().includes("aac")).toBe(true);
    expect(FabricGridWrap.html().includes("bootstrap")).toBe(true);

    FabricGridInstance.setState({ groupByAttribute: "Capability" });
    expect(FabricGridInstance.state.groupByAttribute).toBe("Capability");
    expect(FabricGridWrap.html().includes("system of record")).toBe(true);
    expect(FabricGridWrap.html().includes("crime fighting")).toBe(true);

    FabricGridInstance.setState({ groupByAttribute: "Status" });
    expect(FabricGridInstance.state.groupByAttribute).toBe("Status");
    expect(FabricGridWrap.html().includes("down")).toBe(true);
    expect(FabricGridWrap.html().includes("warning")).toBe(true);
    expect(FabricGridWrap.html().includes("stable")).toBe(true);

    // If groupByAttribute is none, there should be no headers present
    FabricGridInstance.setState({ groupByAttribute: "None" });
    expect(FabricGridWrap.html().includes("GMServiceHeader")).toBe(false);
    expect(FabricGridInstance.state.groupByAttribute).toBe("None");
  });

  test("sorts services by name and status", () => {
    // Remount with new query
    let FabricGridInstance = mount(RouterWrap([{ search: "?sortBy=Name" }]))
      .find(FabricGrid)
      .instance();

    expect(FabricGridInstance.state.sortByAttribute).toBe("Name");

    FabricGridInstance = mount(RouterWrap([{ search: "?sortBy=Status" }]))
      .find(FabricGrid)
      .instance();

    expect(FabricGridInstance.state.sortByAttribute).toBe("Status");
  });

  test("filters services based on searchQuery", () => {
    let FabricGridInstance = FabricGridWrap.find(FabricGrid).instance();

    FabricGridInstance.setState({ searchQuery: "Grace" });

    expect(FabricGridInstance.state.searchQuery).toBe("Grace");
    expect(FabricGridWrap.html().includes("AAC Remote Information")).toBe(
      false
    );
    expect(FabricGridWrap.html().includes("Entry Monitoring")).toBe(false);
    expect(
      FabricGridWrap.html().includes("Grace Hopper Battleship Control Program")
    ).toBe(true);
  });

  test("has buttons that toggle card and table view", () => {
    let FabricGridInstance = FabricGridWrap.find(FabricGrid).instance();
    const button = FabricGridWrap.find(FabricGrid).find("button");

    button.at(1).simulate("click");

    expect(FabricGridInstance.state.displayType).toBe("Table");

    button.at(0).simulate("click");

    expect(FabricGridInstance.state.displayType).toBe("Card");
  });
});

describe("Fabric Grid Status Views", () => {
  test("render the correct services in stable view", () => {
    FabricGridWrap = mount(RouterWrap(["/stable"]));

    // Check that there is only one stable card rendered
    expect(FabricGridWrap.find(FabricGrid).find("GMServiceCard").length).toBe(
      1
    );
    expect(FabricGridWrap.html().includes("AAC Remote Information")).toBe(
      false
    );
    expect(FabricGridWrap.html().includes("Entry Monitoring")).toBe(false);
    expect(
      FabricGridWrap.html().includes("Grace Hopper Battleship Control Program")
    ).toBe(true);
  });

  test("render the correct services in warning view", () => {
    FabricGridWrap = mount(RouterWrap(["/warning"]));

    // Check that there is only one warning card rendered
    expect(FabricGridWrap.find(FabricGrid).find("GMServiceCard").length).toBe(
      1
    );
    expect(FabricGridWrap.html().includes("AAC Remote Information")).toBe(true);
    expect(FabricGridWrap.html().includes("Entry Monitoring")).toBe(false);
    expect(
      FabricGridWrap.html().includes("Grace Hopper Battleship Control Program")
    ).toBe(false);
  });

  test("render the correct services in down view", () => {
    FabricGridWrap = mount(RouterWrap(["/down"]));

    // Check that there is only one down card rendered
    expect(FabricGridWrap.find(FabricGrid).find("GMServiceCard").length).toBe(
      1
    );
    expect(FabricGridWrap.html().includes("AAC Remote Information")).toBe(
      false
    );
    expect(FabricGridWrap.html().includes("Entry Monitoring")).toBe(true);
    expect(
      FabricGridWrap.html().includes("Grace Hopper Battleship Control Program")
    ).toBe(false);
  });
});

describe("Fabric Grid Instance Method", () => {
  let FabricGridInstance;

  beforeEach(() => {
    FabricGridInstance = mount(RouterWrap(["/"]))
      .find(FabricGrid)
      .instance();
  });

  test("_pushHistory sets state and pushes queryString to browser history", () => {
    FabricGridInstance._pushHistory("AAC");

    expect(FabricGridInstance.state.lastPushedQueryString).toBe("AAC");
    expect(FabricGridInstance.props.history.location.search).not.toBe(null);
    expect(FabricGridInstance.props.history.location.search).toBe("?AAC");
    expect(FabricGridInstance.props.history.length).toBe(2);
  });

  test("popAndDecodeHistory parses the query string and sets local state", () => {
    FabricGridInstance.popAndDecodeHistory(
      "viewType=Table&groupBy=Owner&searchQuery=aac"
    );

    expect(FabricGridInstance.state.searchQuery).not.toBe("Card");
    expect(FabricGridInstance.state.displayType).toBe("Table");
    expect(FabricGridInstance.state.searchQuery).not.toBe("Status");
    expect(FabricGridInstance.state.groupByAttribute).toBe("Owner");
    expect(FabricGridInstance.state.searchQuery).not.toBe(null);
    expect(FabricGridInstance.state.searchQuery).toBe("aac");
  });

  // This test slowly begins to slow down running tests so commenting out for now - DTillery
  // test("debouncedPushHistory debounces _pushHistory call 500ms", async done => {
  //   // Call debounce with a query string
  //   FabricGridInstance.debouncedPushHistory("sortBy=Name");
  //
  //   // We should not have pushed to state at this point
  //   expect(FabricGridInstance.state.lastPushedQueryString).toBe("");
  //   expect(FabricGridInstance.state.lastPushedQueryString).not.toBe(
  //     "sortBy=Name"
  //   );
  //
  //   // Wait 500ms
  //   await setTimeout(async () => {
  //     // Now our sortBy attribute should be in local state
  //     expect(FabricGridInstance.state.lastPushedQueryString).not.toBe("");
  //     expect(FabricGridInstance.state.lastPushedQueryString).toBe(
  //       "sortBy=Name"
  //     );
  //     // Call debounce with another query
  //     FabricGridInstance.debouncedPushHistory("groupBy=Owner");
  //     //Wait another 500ms
  //     await setTimeout(() => {
  //       expect(FabricGridInstance.state.lastPushedQueryString).toBe(
  //         "groupBy=Owner"
  //       );
  //       expect(FabricGridInstance.state.lastPushedQueryString).not.toBe(
  //         "viewType=Table"
  //       );
  //       // Tell jest we're done
  //       done();
  //     }, 500);
  //   }, 500);
  // });
});
