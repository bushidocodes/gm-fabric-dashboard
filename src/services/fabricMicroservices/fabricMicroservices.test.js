import moxios from "moxios";
import { fetchFabricMicroservices } from "./fabricMicroservices";

// Note: Outside of src directory, so module directory import not possible
import { staticServices } from "../../../json-mock/discovery-service/staticData";

describe("Fabric Microservices Module ", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  // test with static array of mock services
  it("fetches services from the discovery service and maps them with a key of name", done => {
    moxios.stubRequest("server/services", {
      status: 200,
      response: staticServices
    });
    fetchFabricMicroservices("server")
      .then(result =>
        expect(result).toMatchObject({
          "Export Team Gateway Up2 Management Message Resource Measurement|1": {
            authorized: true,
            capability: "Crime Fighting",
            documentation: "https://www.google.com",
            instances: [
              {
                name: "ee0fa3669fea7e9a0adea649c46bca56",
                start_time: 1508854912461
              },
              {
                name: "8bedb4551e801f38bf149001a72a1127",
                start_time: 1508370483156
              },
              {
                name: "d9de3a9c26c6c84daaf1ceb40559d659",
                start_time: 1508170483156
              }
            ],
            maximum: 0,
            metered: true,
            minimum: 2,
            name:
              "Export Team Gateway Up2 Management Message Resource Measurement",
            owner: "Virtual",
            runtime: "GO",
            threaded: true,
            version: "1"
          },
          "Internet Option|3.6": {
            authorized: true,
            capability: "Crime Fighting",
            documentation: "https://www.google.com",
            instances: [
              {
                name: "ee0fa3669fea7e9a0adea649c46bca56",
                start_time: 1508854912461
              },
              {
                name: "8bedb4551e801f38bf149001a72a1127",
                start_time: 1508370483156
              },
              {
                name: "d9de3a9c26c6c84daaf1ceb40559d659",
                start_time: 1508170483156
              }
            ],
            maximum: 4,
            metered: true,
            minimum: 5,
            name: "Internet Option",
            owner: "Sequential",
            runtime: "GO",
            threaded: true,
            version: "3.6"
          },
          "Up2 Message Network Team Entry Job Transmission End|4.7": {
            authorized: true,
            capability: "Crime Fighting",
            documentation: "https://www.google.com",
            instances: [
              {
                name: "ee0fa3669fea7e9a0adea649c46bca56",
                start_time: 1508854912461
              },
              {
                name: "8bedb4551e801f38bf149001a72a1127",
                start_time: 1508370483156
              },
              {
                name: "d9de3a9c26c6c84daaf1ceb40559d659",
                start_time: 1508170483156
              }
            ],
            maximum: 0,
            metered: true,
            minimum: 3,
            name: "Up2 Message Network Team Entry Job Transmission End",
            owner: "Internet",
            runtime: "GO",
            threaded: true,
            version: "4.7"
          }
        })
      )
      .then(() => done());
  });
  xit("fetches metrics from a microservice via the discovery service");
});
