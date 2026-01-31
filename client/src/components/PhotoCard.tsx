import type { PhotoCard as PhotoCardType } from './types.ts';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

import { Card, CardContent, CardFooter } from '@/components/ui/card';

type PhotoCardProps = {
  item: PhotoCardType;
  onClick: (item: PhotoCardType) => void;
  query: string;
};

function PhotoCard({ item, onClick, query }: PhotoCardProps) {
  return (
    <Card className="overflow-hidden max-w-sm m-3">
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            onClick={() => onClick(item)}
            src={item.media.m}
            alt={item.title}
            className="object-cover w-full h-full transition-hover hover:scale-105 duration-300"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-1">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </a>
            <div className="flex gap-1 overflow-x-auto ">
              {item.tags.split(' ').map((tag) => {
                const tags = query.split(',').map((t) => t.trim());
                return (
                  <Badge
                    variant={tags.includes(tag) ? 'destructive' : 'outline'}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PhotoCard;
