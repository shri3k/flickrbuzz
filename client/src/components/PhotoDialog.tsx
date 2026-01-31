import type { PhotoCard as PhotoCardType } from "./types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PhotoDialog = {
  item: PhotoCardType;
  onClose: () => void;
};
function PhotoDialog({ item, onClose }: PhotoDialog) {
  const largeImageUrl = item.media.m.replace("_m.", "_b.");
  return (
    <Dialog open={!!item} onOpenChange={onClose}>
      <DialogContent aria-label="photo-dialog">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>
            <img
              aria-label="higher-res-image"
              srcSet={`
              ${largeImageUrl} 1024w,
              ${item.media.m} 500w
              `}
              alt={item.title}
              style={{
                border: "1px solid #e2e8f0",
                width: "100%",
                height: "auto",
              }}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PhotoDialog;
