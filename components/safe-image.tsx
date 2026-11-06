"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface SafeImageProps extends ImageProps {
  fallbackSrc?: string
}

export default function SafeImage({
  alt,
  fallbackSrc = "/placeholder.svg",
  onError,
  src,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <Image
      {...props}
      src={hasError ? fallbackSrc : src}
      alt={hasError ? "Image unavailable" : alt}
      onError={(event) => {
        onError?.(event)
        if (!hasError) setHasError(true)
      }}
    />
  )
}
