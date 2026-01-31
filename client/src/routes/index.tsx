import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import api from '@/libs/api.ts'
import { Preview } from '@/components/Preview'
import { SearchBar } from '@/components/SearchBar'

const searchSchema = z.object({
  q: z.string().optional(),
  mode: z.enum(['all', 'any']).default('all'),
})

export const Route = createFileRoute('/')({
  component: App,
  validateSearch: (s) => searchSchema.parse(s),
  loader: async ({ location: { search } }) => {
    if (search.q) {
      const items = await api.search(search.q, search.mode)
      return items
    } else {
      const items = await api.feed()
      return items
    }
  },
})

function App() {
  const data = Route.useLoaderData()
  const [feed, setFeed] = useState(data)

  const handleOnSearchSubmit = async (query: string, opts) => {
    const items = await api.search(query, opts)
    setFeed(items)
  }

  return (
    <div className="text-center">
      <SearchBar onSearchSubmit={handleOnSearchSubmit} />
      <Preview feed={feed} />
    </div>
  )
}
