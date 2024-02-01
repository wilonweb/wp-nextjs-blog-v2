{
  /*
- next/image pour effectuer un certain nombre de vérifications pour s'assurer que les images sont sûres et provenant de sources approuvées.
- remotePatterns vous permet de spécifier les modèles d'URLs d'images distantes qui sont autorisés dans votre application.
*/
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["1.gravatar.com", "nextjs-test1.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nextjs-test1.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nextjs-test1.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
