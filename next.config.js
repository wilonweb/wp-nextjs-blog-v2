{
  /*
- next/image pour effectuer un certain nombre de vérifications pour s'assurer que les images sont sûres et provenant de sources approuvées.
- remotePatterns vous permet de spécifier les modèles d'URLs d'images distantes qui sont autorisés dans votre application.
*/
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, //option qui aide à identifier des problèmes potentiels dans votre application
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "nextjstest1.local",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
