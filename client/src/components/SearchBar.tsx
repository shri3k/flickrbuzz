import React from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'

type Props = {
  onSearchSubmit: (query: string, opts?: { mode: 'all' | 'any' }) => void
}

export function SearchBar({ onSearchSubmit }: Props) {
  const navigate = useNavigate({ from: '/' })
  const search = useSearch({ from: '/' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const query = (e.target as HTMLFormElement).search.value
    onSearchSubmit(query)
  }

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mode = (e.target as HTMLInputElement).value as 'all' | 'any'
    navigate({
      search: {
        ...search,
        mode,
      },
      replace: true,
    })
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = (e.target as HTMLInputElement).value
    navigate({
      search: {
        ...search,
        q: query,
      },
      replace: true,
    })
  }

  return (
    <div className="p-4">
      <form className="mb-4" onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          defaultValue={search.q || ''}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleQueryChange}
        />
        <div className="h-2">
          <label>
            Match mode:
            <label>
              <input
                onChange={handleModeChange}
                type="radio"
                name="mode"
                value="all"
                defaultChecked
              />{' '}
              All
            </label>
            <label>
              <input
                onChange={handleModeChange}
                type="radio"
                name="mode"
                value="any"
              />{' '}
              Any
            </label>
          </label>
        </div>
        <input
          type="submit"
          value="Search"
          className="ml-4 p-2 bg-blue-500 text-white rounded"
        />
      </form>
    </div>
  )
}
