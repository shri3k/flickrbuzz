import { PublicFeedAPIError, SearchFeedAPIError } from './errors'
import type { Mode } from './types'

const { VITE_API_ENDPOINT } = import.meta.env
const fullURL = (path: string): string => {
  return `${VITE_API_ENDPOINT}${path}`
}

const endpoints = {
  feed: (): string => fullURL(`/`),
  search: (tags: string, mode: Mode = 'all'): string =>
    fullURL(`/search?q=${encodeURIComponent(tags)}&tagmode=${mode}`),
}

export default {
  feed: async () => {
    const response = await fetch(endpoints.feed())

    if (!response.ok) {
      throw new PublicFeedAPIError('Network response was not ok')
    }

    try {
      const data = await response.json()
      return data
    } catch (error) {
      throw new PublicFeedAPIError('Failed to parse JSON response')
    }
  },
  search: async (tags: string, mode: Mode) => {
    const response = await fetch(endpoints.search(tags, mode))

    if (!response.ok) {
      throw new SearchFeedAPIError('Network response was not ok')
    }

    try {
      const data = await response.json()
      return data
    } catch (error) {
      throw new SearchFeedAPIError('Failed to parse JSON response')
    }
  },
}
