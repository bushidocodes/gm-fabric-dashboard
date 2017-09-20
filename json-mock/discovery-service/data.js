const services = [
  {
    name: "Batcomputer",
    version: "1.0",
    group: "Batcave",
    minimum: 1,
    maximum: 6,
    documentation: "https://en.wikipedia.org/wiki/Batcomputer",
    authorized: true,
    metered: true,
    threaded: true,
    runtime: "JVM"
  },
  {
    name: "Batcave Defense Systems",
    version: "3.1",
    group: "Batcave",
    minimum: 1,
    maximum: 6,
    documentation: null,
    authorized: false,
    metered: true,
    threaded: true,
    runtime: "JVM"
  }
];

const instances = [
  {
    service: "Batcomputer",
    version: "1.0",
    instance: "ee0fa3669fea7e9a0adea649c46bca56"
  },
  {
    service: "Batcomputer",
    version: "1.0",
    instance: "8bedb4551e801f38bf149001a72a1127"
  },
  {
    service: "Batcomputer",
    version: "1.0",
    instance: "d9de3a9c26c6c84daaf1ceb40559d659"
  },
  {
    service: "Batcave Defense Systems",
    version: "3.1",
    instance: "ee0f0000000a7e9a0adea649c46bca56"
  },
  {
    service: "Batcave Defense Systems",
    version: "3.1",
    instance: "8bedb4551e801f38bf149000002a1127"
  },
  {
    service: "Batcave Defense Systems",
    version: "3.1",
    instance: "d000009c26c6c84daaf1ceb40559d659"
  }
];

module.exports = {
  services,
  instances
};
