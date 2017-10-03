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
    runtime: "JVM",
    instances: [
      "ee0fa3669fea7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149001a72a1127",
      "d9de3a9c26c6c84daaf1ceb40559d659"
    ]
  },
  {
    name: "Nora Fries Cryostasis",
    version: "1.0",
    group: "Batcave",
    minimum: 1,
    maximum: 6,
    documentation: "https://en.wikipedia.org/wiki/Nora_Fries",
    authorized: true,
    metered: true,
    threaded: true,
    runtime: "JVM",
    instances: []
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
    runtime: "GO",
    instances: [
      "ee0f0000000a7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149000002a1127",
      "d000009c26c6c84daaf1ceb40559d659"
    ]
  },
  {
    name: "Whacky Hidden Missile Silo",
    version: "1.7",
    group: "Batcave",
    minimum: 4,
    maximum: 6,
    documentation: null,
    authorized: false,
    metered: true,
    threaded: true,
    runtime: "GO",
    instances: [
      "ee0f0000000a7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149000002a1127",
      "d000009c26c6c84daaf1ceb40559d659"
    ]
  },
  {
    name: "Funky System",
    version: "1.7",
    group: "Some Group",
    minimum: 5,
    maximum: 6,
    documentation: null,
    authorized: false,
    metered: true,
    threaded: true,
    runtime: "GO",
    instances: [
      "ee0f0000000a7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149000002a1127",
      "d000009c26c6c84daaf1ceb40559d659"
    ]
  },
  {
    name: "Some System",
    version: "1.7",
    group: "Some Group",
    minimum: 1,
    maximum: 2,
    documentation: null,
    authorized: false,
    metered: true,
    threaded: true,
    runtime: "GO",
    instances: [
      "ee0f0000000a7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149000002a1127",
      "d000009c26c6c84daaf1ceb40559d659"
    ]
  },
  {
    name: "AAA System",
    version: "1.7",
    group: "AAA Group",
    minimum: 1,
    maximum: 2,
    documentation: null,
    authorized: false,
    metered: true,
    threaded: true,
    runtime: "GO",
    instances: [
      "ee0f0000000a7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149000002a1127",
      "d000009c26c6c84daaf1ceb40559d659"
    ]
  },
  {
    name: "ZZZ System",
    version: "1.7",
    group: "AAA Group",
    minimum: 1,
    maximum: 2,
    documentation: null,
    authorized: false,
    metered: true,
    threaded: true,
    runtime: "GO",
    instances: [
      "ee0f0000000a7e9a0adea649c46bca56",
      "8bedb4551e801f38bf149000002a1127",
      "d000009c26c6c84daaf1ceb40559d659"
    ]
  }
];

module.exports = {
  services
};
