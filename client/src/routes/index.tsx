import { createFileRoute, ErrorComponent } from '@tanstack/react-router';
import { useState } from 'react';
import { z } from 'zod';
import type { Maybe, Mode } from '@/types.ts';

import api from '@/libs/api.ts';
import { Preview } from '@/components/Preview';
import { SearchBar } from '@/components/SearchBar';

async function getFeed(query: string, mode: string | undefined) {
  if (query) {
    const items = await api.search(query, mode);
    return items;
  } else {
    const items = await api.feed();
    return items;
  }
}
const searchSchema = z.object({
  q: z.string().optional(),
  mode: z.enum(['all', 'any']).optional(),
});

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: (search) => searchSchema.parse(search),
  loader: async ({ location }) => {
    const search = new URLSearchParams(location.search);
    const query = search.get('q') || '';
    const mode = search.get('mode') || undefined;
    return getFeed(query, mode);
  },
  shouldReload: false,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
  pendingMs: 500,
});

function App() {
  const data = Route.useLoaderData();
  const [feed, setFeed] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState<string>('');

  const handleOnSearchSubmit = async (query: string, mode: Maybe<Mode>) => {
    setIsLoading(true);
    const items = await getFeed(query, mode);

    setFeed(items);
    setCurrentQuery(query);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full lg:w-xl m-auto">
        <SearchBar
          onSearchSubmit={handleOnSearchSubmit}
          isLoading={isLoading}
        />
      </div>
      <div>
        <Preview feed={feed} query={currentQuery} />
      </div>
    </div>
  );
}
