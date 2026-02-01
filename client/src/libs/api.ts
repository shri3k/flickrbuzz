import { PublicFeedAPIError, SearchFeedAPIError } from "./errors";
import type { Maybe, Mode } from "@/types.ts";

const { VITE_API_ENDPOINT } = import.meta.env;
const fullURL = (path: string): string => {
  return `${VITE_API_ENDPOINT}${path}`;
};

const endpoints = {
  feed: (): string => fullURL(`/`),
  search: (tags: string, mode: Maybe<Mode> = "all"): string =>
    fullURL(`/search?q=${encodeURIComponent(tags)}&tagmode=${mode}`),
};

export default {
  feed: async () => {
    try {
      const response = await fetch(endpoints.feed());
      if (!response.ok) {
        throw new SearchFeedAPIError("API server is down");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new PublicFeedAPIError("Failed to fetch public feed right now");
    }
  },
  search: async (tags: string, mode: Maybe<Mode>) => {
    try {
      const response = await fetch(endpoints.search(tags, mode));
      if (!response.ok) {
        throw new SearchFeedAPIError("API server is down");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new SearchFeedAPIError("Failed to search right now");
    }
  },
};
