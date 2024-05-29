/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['*'], // Permitir todas las imágenes de cualquier origen
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      // Agregar otros patrones de host remoto si es necesario
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
