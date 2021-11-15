export function unixTimestamp(date = new Date()) {
  Math.floor(date ? date.getTime() : Date.now() / 1000);
}

export function episodeId(episode) {
  return `${episode.title}@${episode.publishedAt.getTime()}`;
}

export function isFirstInstance(a, i, xs) {
  return xs.indexOf(a) === i;
}
