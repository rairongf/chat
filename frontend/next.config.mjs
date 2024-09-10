/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/channels/@me',
        permanent: true,
      },
      {
        source: '/channels(/?$)',
        destination: '/channels/@me',
        permanent: true,
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      }
    ]
  },
};

export default nextConfig;
