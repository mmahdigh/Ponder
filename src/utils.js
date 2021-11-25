export function unixTimestamp(date) {
  return Math.floor(date ? date.getTime() : Date.now() / 1000);
}

export function episodeId(episode) {
  return `${episode.title}@${episode.publishedAt.getTime()}`;
}
