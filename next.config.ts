import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ik.imagekit.io", "res.cloudinary.com"], // agrega aquí todos los dominios externos que uses
  },
};

export default nextConfig;
