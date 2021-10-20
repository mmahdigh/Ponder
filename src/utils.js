export function unixTimestamp(date = new Date()) {
  Math.floor(date.now() / 1000);
}
