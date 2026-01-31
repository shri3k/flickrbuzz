import React from 'react'
import type { FeedData } from './types.ts'

type Props = {
  feed: [FeedData]
}

export function Preview({ feed }: Props) {
  return (
    <div className="p-4">
      {feed.map((item, index) => {
        return (
          <div key={index} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <img src={item.media.m} alt={item.title} className="mb-2" />
            <p className="text-sm text-gray-600">
              By {item.author} on{' '}
              {new Date(item.date_taken).toLocaleDateString()}
            </p>
            <p className="mt-2">{item.description}</p>
            <p className="text-sm text-gray-500">Tags: {item.tags}</p>
          </div>
        )
      })}
    </div>
  )
}
