import moxios from "moxios";
import { main as ajaxWorker } from "./ajax";
import metrics from "../../json-mock/jvm/metrics";
import threads from "../../json-mock/jvm/threads";
import { staticServices } from "../../json-mock/discovery-service/staticData";

describe("AJAX Web Worker", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("fetches a metrics endpoint and returns a promise which resolves to the result", done => {
    moxios.stubRequest("/admin/metrics.json", {
      status: 200,
      response: metrics
    });
    ajaxWorker({
      type: "fetchMetricsWithoutServer",
      runtime: "JVM",
      endpoint: "/admin/metrics.json"
    })
      .then(json => expect(json).toMatchObject(metrics))
      .then(() => done());
  });
  it("fetches a Envoy metrics endpoint, automatically converts the statsd response, and returns a promise which resolves to the result", done => {
    moxios.stubRequest("/stats", {
      status: 200,
      response:
        "cluster.clock.update_failure: 0\n" +
        "cluster.clock.update_success: 8\n" +
        "cluster.clock.upstream_cx_active: 0\n" +
        "cluster.clock.upstream_cx_close_notify: 0\n"
    });
    ajaxWorker({
      type: "fetchMetricsWithoutServer",
      runtime: "ENVOY",
      endpoint: "/stats"
    })
      .then(statsd =>
        expect(statsd).toMatchObject({
          "cluster.clock.update_failure": 0,
          "cluster.clock.update_success": 8,
          "cluster.clock.upstream_cx_active": 0,
          "cluster.clock.upstream_cx_close_notify": 0
        })
      )
      .then(() => done());
    return false;
  });
  it("fetches a threads endpoint and returns a promise which resolves to the result", done => {
    moxios.stubRequest("/admin/threads", {
      status: 200,
      response: threads
    });
    ajaxWorker({
      type: "fetchThreads",
      endpoint: "/admin/threads"
    })
      .then(result => expect(result).toMatchObject(threads))
      .then(() => done());
  });
  it("fetches a threads endpoint and returns a promise which resolves to a rejection when the request didn't return JSON as expected", () => {
    moxios.stubRequest("/admin/threads2", {
      status: 200,
      response: '<!DOCTYPE html><html lang="en"><body></body></html>'
    });
    expect(
      ajaxWorker({
        type: "fetchThreads",
        endpoint: "/admin/threads2"
      })
    ).rejects.toMatch("The data object didn't contain JSON as expected");
  });
  it("returns an immediately rejected promise when given an unknown message", () => {
    expect(
      ajaxWorker({
        type: "hackTheMainframe",
        endpoint: "/decipher/mainframe/computer"
      })
    ).rejects.toMatch("Invalid Message");
  });
  // test with static array of mock services
  it("fetches services from the discovery service and maps them with a key of name", done => {
    moxios.stubRequest("server/services", {
      status: 200,
      response: staticServices
    });
    ajaxWorker({
      type: "fetchServices",
      fabricServer: "server"
    })
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
