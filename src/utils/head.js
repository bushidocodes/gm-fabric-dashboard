// Utils for running with a Fabric Server

/**
 * getFabricServer is a utility function that extracts the fabricServer property
 * from the HEAD of the index.html file.
 * @returns {String}
 */
export function getFabricServer() {
  const fabricServer = document.head.querySelector("[property=fabricServer]")
    .content;

  return fabricServer !== "__FABRIC_SERVER__" ? fabricServer : null;
}
