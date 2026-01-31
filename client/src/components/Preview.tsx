import { useState } from 'react';
import type { FeedData, Maybe } from '@/types.ts';
import type { PhotoCard as PhotoCardType } from './types';
import PhotoDialog from '@/components/PhotoDialog';
import PhotoCard from '@/components/PhotoCard';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  feed: [FeedData];
  query: string;
};

export function Preview({ query, feed }: Props) {
  const [currentItem, setCurrentItem] = useState<Maybe<PhotoCardType>>(null);

  const handlePhotoEnlargeClick = (item: PhotoCardType) => {
    setCurrentItem(item);
  };
  const handlePhotoEnlargeClose = () => {
    setCurrentItem(null);
  };

  return (
    <>
      <div className="p-4">
        <div className="columns-4 gap-2 mb-4">
          {feed.map((item) => {
            return (
              <PhotoCard
                item={item}
                onClick={handlePhotoEnlargeClick}
                query={query}
              />
            );
          })}
        </div>
        {currentItem && (
          <PhotoDialog item={currentItem} onClose={handlePhotoEnlargeClose} />
        )}
      </div>
    </>
  );
}
