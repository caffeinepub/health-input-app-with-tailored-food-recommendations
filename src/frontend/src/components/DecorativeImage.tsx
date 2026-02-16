import { useState } from 'react';

interface DecorativeImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export function DecorativeImage({ src, alt = '', className = '' }: DecorativeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      aria-hidden="true"
    />
  );
}
