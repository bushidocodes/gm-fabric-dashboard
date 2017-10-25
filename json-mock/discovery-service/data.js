var _ = require("lodash");

const serviceNamePrefix = [
  "AAC",
  "Discovery",
  "Export",
  "ICPF",
  "Odrive",
  "Team",
  "Up2",
  "Bootstrap",
  "Authentication",
  "Backroom",
  "Domain",
  "Gateway",
  "Internet",
  "File",
  "Transfer",
  "Message",
  "Mail",
  "User",
  "Network",
  "Management",
  "Remote",
  "Job",
  "Entry",
  "Sequential",
  "Resource",
  "Routing",
  "Virtual",
  "Structure",
  "Transmission",
  "Statistics"
];
const serviceNamePostfix = [
  "Service",
  "Analysis",
  "Program",
  "Protocol",
  "System",
  "Channel",
  "Device",
  "Editor",
  "End",
  "Version",
  "Monitoring",
  "Entry",
  "News",
  "Information",
  "Debugger",
  "Measurement",
  "Option",
  "Infrastructure",
  "Application"
];

const generateRandomServiceName = () => {
  let n = _.random(1, 10);

  // shuffle the array and get n prefixes after the shuffle
  return (
    serviceNamePrefix
      .sort(() => 0.5 - Math.random())
      .slice(0, n)
      .join(" ") +
    " " +
    serviceNamePostfix.sort(() => 0.5 - Math.random()).slice(0, 1)
  );
};

const generateRandomInstanceArray = () => {
  let n = _.random(0, 5);
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push((Math.random() * 1e32).toString(36));
  }
  return arr;
};

const getRandomService = (quantity = 150) => {
  let arr = [];
  // Explicitly add a service that is NOT authorized
  // This is a chips and cheese microservice, nachos!
  arr.push({
    name: "Nachos",
    version: "1.0",
    owner: _.sample(serviceNamePrefix),
    capability: "Foods",
    minimum: _.random(1, 5),
    maximum: _.random(() => this.minimum, 7),
    documentation: "https://www.google.com",
    authorized: false,
    metered: true,
    threaded: true,
    runtime: _.sample(["JVM", "GO"]),
    instances: ["abcdefghicjlmnopqrstuvwxyz"]
  });
  for (let i = 0; i < quantity; i++) {
    arr.push({
      name: generateRandomServiceName(),
      version: _.round(_.random(1.0, 5.1), 1).toString(),
      owner: _.sample(serviceNamePrefix),
      capability: "Crime Fighting",
      minimum: _.random(1, 5),
      maximum: _.random(() => this.minimum, 7),
      documentation: "https://www.google.com",
      authorized: true,
      metered: true,
      threaded: true,
      runtime: _.sample(["JVM", "GO"]),
      instances: generateRandomInstanceArray()
    });
  }
  return arr;
};

const services = getRandomService();

/*
const services = [
  {
    name: "Batcomputer",
    version: "1.0",
    owner: "Batcave",
    capability: "Crime Fighting",
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
    owner: "Batcave",
    capability: "Crime Fighting",
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
    owner: "Batcave",
    capability: "Crime Fighting",
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
    owner: "Batcave",
    capability: "Crime Fighting",
    minimum: 4,
    maximum: 6,
    documentation: "https://en.wikipedia.org/",
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
    owner: "Some owner",
    capability: "Funkadelics",
    minimum: 5,
    maximum: 6,
    documentation: "https://en.wikipedia.org/",
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
    owner: "Some owner",
    capability: "Funkadelics",
    minimum: 1,
    maximum: 2,
    documentation: "https://en.wikipedia.org/",
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
    owner: "AAA owner",
    capability: "Three Letter Acronym",
    minimum: 1,
    maximum: 2,
    documentation: "https://en.wikipedia.org/",
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
    owner: "AAA owner",
    capability: "Three Letter Acronym",
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

*/

module.exports = {
  services
};
