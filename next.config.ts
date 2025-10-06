import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["ik.imagekit.io"], // agrega aquí todos los dominios externos que uses
  },
};

export default nextConfig;
