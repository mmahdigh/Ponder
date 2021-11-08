export function unixTimestamp(date = new Date()) {
  Math.floor(date ? date.getTime() : Date.now() / 1000);
}
