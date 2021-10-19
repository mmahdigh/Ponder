import { sendTransaction } from './client';

export default async function createPodcastMetadata(podcast) {
  return sendTransaction(null, trx => {
    trx.addTag('Podner-type', 'Podcast');
    trx.addTag('Podner-id', podcast.id);
    trx.addTag('Podner-total-episodes', podcast.totalEpisodes);
    trx.addTag('Podner-rss2-feed', podcast.rssFeed);
    trx.addTag('Podner-title', podcast.title);
    trx.addTag('Podner-description', podcast.description);
    podcast.categories.forEach(category => {
      trx.addTag('Podner-category', category);
    });
    podcast.keywords.forEach(keyword => {
      trx.addTag('Podner-keyword', keyword);
    });
  });
}
