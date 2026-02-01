import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton.tsx";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

function PhotoCard() {
  return (
    <Card className="max-w-lg m-3" aria-label="preview-card">
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="w-md h-full " />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-1">
            <Skeleton className="font-semibold text-lg" />
            <div className="flex gap-1 overflow-x-auto "></div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PhotoCard;
