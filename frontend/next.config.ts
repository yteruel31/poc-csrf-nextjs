import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'standalone',
    publicRuntimeConfig: {
        backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend:8000',
    },
};

export default nextConfig;
