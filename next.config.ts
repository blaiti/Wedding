import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The bundled placeholder art in /public/images is SVG, which next/image
    // won't optimize unless explicitly allowed. These are local, trusted
    // assets. Once you swap in real JPG/PNG photos you can safely remove this
    // whole `images` block — raster photos are optimized automatically.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
