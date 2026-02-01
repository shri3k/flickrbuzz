import { useState } from "react";
import type { Maybe } from "@/types.ts";
import type { PhotoCard as PhotoCardType } from "./types";
import PhotoDialog from "@/components/PhotoDialog";
import PhotoCard from "@/components/PhotoCard";

type Props = {
  feed: Maybe<Array<PhotoCardType>>;
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

  if (!feed) {
    return null;
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="preview-pane"
      >
        {feed.map((item) => {
          return (
            <PhotoCard
              key={item.link}
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
    </>
  );
}
