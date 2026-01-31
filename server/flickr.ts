import {
  FlickrError,
  FlickrSearchError,
  FlickPublicFeedError,
} from './error.ts';

type Mode = 'all' | 'any';

const { FLICKR_ENDPOINT } = process.env;

const fullURL = (path: string): string => {
  const queryConcatenator = path.includes('?') ? '&' : '?';
  return `${FLICKR_ENDPOINT}${path}${queryConcatenator}format=json&nojsoncallback=1`;
};

const endpoints = {
  publicFeed: (): string => fullURL(`/services/feeds/photos_public.gne`),
  search: (tags: string, mode: Mode = 'all'): string =>
    fullURL(
      `/services/feeds/photos_public.gne?tags=${encodeURIComponent(
        tags
      )}&tagmode=${mode}`
    ),
};

export default {
  publicFeed: async () => {
    const response = await fetch(endpoints.publicFeed());
    if (!response.ok) {
      throw new FlickPublicFeedError('Failed to fetch public feed', response);
    }
    try {
      const data = await response.json();
      return data.items;
    } catch (error) {
      throw new FlickrError('Failed to parse public feed response as JSON');
    }
  },
  search: async (query: string, mode: Mode | undefined) => {
    const endpoint = endpoints.search(query, mode);
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new FlickrSearchError('Failed to search flickr', response);
    }
    try {
      const data = await response.json();
      return data.items;
    } catch (error) {
      throw new FlickrError('Failed to parse search response as JSON');
    }
  },
};
