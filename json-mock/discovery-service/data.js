const services = [
  {
    id: "7c2024fbc7c6cd81a310577d519ac47e",
    name: "Batcomputer",
    group: "0af453a8bd27001e5ebad832b7b80ec1",
    counts: {
      current: 3,
      minimum: 1,
      maximum: 6
    },
    metered: true,
    threaded: true,
    documentation: null,
    authorized: true,
    runtime: "JVM",
    instances: [
      "ee0fa3669fea7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149001a72a1127",
      "d9de3a9c26c6c84daaf1ceb40559d659"
    ]
  },
  {
    id: "ee0fa3669fea7e9a0a00000c46bca56",
    name: "Batcave Defense Systems",
    group: "0af453a8bd27001e5ebad832b7b80ec1",
    counts: {
      current: 3,
      minimum: 1,
      maximum: 6
    },
    metered: true,
    threaded: true,
    documentation: null,
    authorized: false,
    runtime: "JVM",
    instances: [
      "ee0f0000000a7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149000002a1127",
      "d000009c26c6c84daaf1ceb40559d659"
    ]
  }
];

const groups = [
  {
    id: "0af453a8bd27001e5ebad832b7b80ec1",
    name: "Batcave"
  }
];

module.exports = {
  services,
  groups
};
