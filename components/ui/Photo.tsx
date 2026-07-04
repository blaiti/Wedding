"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Photo — next/image wrapper with a graceful fallback.
 *
 * All wedding photos live as local files under /public/photos. If one of those
 * files is missing (e.g. before the couple has dropped in their real photos),
 * the optimizer 404s and `onError` fires — we then paint a soft champagne
 * gradient in the same box so the layout never breaks.
 *
 * Note: this is a Client Component because `onError` must be serialized to the
 * client (see next/image docs). In Next 16 the eager-load prop is `preload`
 * (the old `priority` prop is deprecated).
 */
export function Photo({
  src,
  alt,
  className = "",
  sizes,
  preload = false,
  fill = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Eager-load + preload (replaces the deprecated `priority` prop). */
  preload?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        role="img"
        aria-label={alt}
        className={`photo-fallback block h-full w-full ${className}`}
        style={fill ? undefined : { width, height }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      preload={preload}
      onError={() => setFailed(true)}
      {...(fill ? { fill: true } : { width: width ?? 0, height: height ?? 0 })}
    />
  );
}
