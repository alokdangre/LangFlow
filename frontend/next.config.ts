import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@prisma/client', 'bcryptjs'],
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  }
};

export default nextConfig;
