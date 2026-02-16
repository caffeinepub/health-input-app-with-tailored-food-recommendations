import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface DishImageProps {
  photoReference: string;
  dishName: string;
}

export function DishImage({ photoReference, dishName }: DishImageProps) {
  const [imageError, setImageError] = useState(false);

  // Build the path to the static asset
  const imagePath = photoReference.startsWith('/')
    ? photoReference
    : `/assets/generated/${photoReference}`;

  if (imageError || !photoReference) {
    return (
      <div className="w-full aspect-video rounded-lg bg-muted/50 flex flex-col items-center justify-center gap-3 border border-border/50">
        <ImageOff className="w-12 h-12 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">Image not available</p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted/30">
      <img
        src={imagePath}
        alt={`${dishName} - prepared dish`}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}
