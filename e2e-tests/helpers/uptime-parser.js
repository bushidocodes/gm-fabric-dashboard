export default function parseUptimeSeconds(uptime) {
  // Pre: uptime is a string representation in the format "0d 0h 0m 0s"

  const minuteMultiplier = 60;
  const hourMultiplier = 60 * minuteMultiplier;
  const dayMultiplier = 24 * hourMultiplier;

  var uptimeSeconds = 0;
  var uptimeSubstrings = uptime.split(" ");

  for (var index = 0; index < uptimeSubstrings.count; index++) {
    if (uptimeSubstrings[index].substring(uptimeSubstrings.count - 1) === "s") {
      uptimeSeconds += parseInt(
        uptimeSubstrings[index].substring(0, uptimeSubstrings.count - 1)
      );
    } else if (
      uptimeSubstrings[index].substring(uptimeSubstrings.count - 1) === "m"
    ) {
      uptimeSeconds +=
        parseInt(
          uptimeSubstrings[index].substring(0, uptimeSubstrings.count - 1)
        ) * minuteMultiplier;
    } else if (
      uptimeSubstrings[index].substring(uptimeSubstrings.count - 1) === "h"
    ) {
      uptimeSeconds +=
        parseInt(
          uptimeSubstrings[index].substring(0, uptimeSubstrings.count - 1)
        ) * hourMultiplier;
    } else if (
      uptimeSubstrings[index].substring(uptimeSubstrings.count - 1) === "d"
    ) {
      uptimeSeconds +=
        parseInt(
          uptimeSubstrings[index].substring(0, uptimeSubstrings.count - 1)
        ) * dayMultiplier;
    }
  }

  return uptimeSeconds;
}
