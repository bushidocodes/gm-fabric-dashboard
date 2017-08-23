import moxios from "moxios";
import { main as ajaxWorker } from "./ajax";
import metrics from "../../json-mock/metrics";
import threads from "../../json-mock/threads";

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
      type: "fetchMetrics",
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
      type: "fetchMetrics",
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
});
