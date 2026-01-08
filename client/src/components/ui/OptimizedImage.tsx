import React from "react";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Either a full URL/path (with extension) or a base path without extension */
  src: string;
  alt: string;
  className?: string;
}

function stripExtension(p: string) {
  return p.replace(/\.(png|jpg|jpeg|webp|avif)$/i, "");
}

export default function OptimizedImage({ src, alt, className, ...rest }: OptimizedImageProps) {
  const base = stripExtension(src);
  const avif = `${base}.avif`;
  const webp = `${base}.webp`;
  const fallback = `${base}.png`;

  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img src={fallback} alt={alt} className={className} loading="lazy" decoding="async" fetchPriority="low" {...rest} />
    </picture>
  );
}
