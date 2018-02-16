export default function sleep(milliseconds) {
  var start = new Date().getTime();

  for (var i = 0; i < 1e7; i++) {
    // Tries for a maximum of 1e7 milliseconds, which is equal to 10^7
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
