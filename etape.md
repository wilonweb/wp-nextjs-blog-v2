# NextJS with Wordpres headless

<https://www.youtube.com/watch?v=6eVMBX2u_Ug&list=PLpvmpNjU5ooWkh1xAldsikmTxgoo5gc2v>
Coding reflexions

Installation de nextJS

`npm run dev` pour lancer le projet

### Creation des page et dossier de notre projet

- [pageSlug].js
- contact.js
- /blog
  - - [postSlug].js
  - - index.js
- /category
  - - [categoryName].js

### Creattion de la page d'acceuil avec Tailwind CSS - Next.js + Headless WordPress Blog

- L'auteur a ajouté les fichiers de route nécessaires pour un blog Next.js.
- Ils ont débuté avec le fichier `index.js`, responsable de la page d'accueil.
- Les images de logo et de fond ont été téléchargées au préalable et placées dans le dossier public de l'application Next.js.
- Installation de TaillwindCSS avec UsingPostCSS
  `npm install -D tailwindcss postcss autoprefixer`
  Puis on lance la commande d'initialisation `npx tailwindcss init`
  Configuration de `content` dans `/taillwind.config.js` pour la liste de fichier qu'on accepte

```js
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Configuration de `/postcss.config.js`
Ajout de `\styles\main.css`pour configurer Tailwind CSS pour un fichier CSS et faire référence à des directives spécifiques de Tailwind CSS. Voici ce que chacune de ces directives fait :

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

@tailwind base; : Cette directive inclut la base de styles de Tailwind CSS dans votre feuille de style. Les styles de base définissent des styles de base pour les éléments HTML, tels que les styles par défaut pour les titres, les paragraphes, les listes, etc. Cela établit la base à partir de laquelle vous pouvez construire vos propres styles.

@tailwind components; : Cette directive inclut les composants de Tailwind CSS dans votre feuille de style. Les composants de Tailwind sont des classes CSS prédéfinies qui définissent des composants d'interface utilisateur courants, tels que des boutons, des formulaires, des alertes, etc. En incluant cette directive, vous avez accès aux styles de ces composants que vous pouvez utiliser dans votre application.

@tailwind utilities; : Cette directive inclut les utilitaires de Tailwind CSS dans votre feuille de style. Les utilitaires de Tailwind sont des classes CSS prédéfinies qui vous permettent de rapidement appliquer des styles à des éléments individuels, tels que la gestion de la taille des polices, des marges, des rembourrages, des couleurs de texte, etc.

- Les composants `head`, `image`, et `link` de Next.js ont été importés pour gérer la structure de la page.
- En utilisant ces composants, une structure de page a été créée avec un en-tête contenant un logo, une navigation, un titre, et un bouton pour accéder au blog.
- Un composant `site header` a été créé pour faciliter la réutilisation de l'en-tête sur d'autres pages.
- La page d'accueil a été stylisée en utilisant des classes de Tailwind CSS pour obtenir une apparence attrayante.
- Le résultat est une page d'accueil accueillante pour un blog de voyage imaginaire, avec un en-tête élégant, un titre accrocheur et un bouton invitant les visiteurs à explorer le blog.

import de `main.css` dans `pages\_app.js`

## Bug :

Je n'arrive pas a afficher un background image appeler avec TaillWind.

Dans mon fichier principal `pages\index.js` j'ai cette ligne
`<div className="min-h-screen bg-[url('/home.jpg')] relative"></div>`
Qui est censé affiché cette image en background
`public\home.jpg`

Pour cela j'ai installer `npm install -D tailwindcss postcss autoprefixer`
Puis j'ai créer le fichier d'initialisation avec `npx tailwindcss init`

```js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Ensuite j'ai créer `postcss.config.js` les deux plugin ( taillwindCSS et autoPrefixer )

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

Puis j'ai créer `styles\main.css` pour importer toute les couche de taillWind css dans le fichier.

```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Creation du composant `components\SiteHeader.js` pour l'index principal

### Setup de GraphQL API sur Wordpress

WordPress, servira de backend API pour notre frontend Next.js
configurer un site WordPress sur un serveur VPS cloud, en l'occurrence DigitalOcean ( TODO )

---

Installation du plugin WPGraphQL
Tester une requete avec postMan

Puis installation du plugin HeadlessMode et ajouter a `wp-config`

```php
/* That's all, stop editing! Happy publishing. */
define( 'HEADLESS_MODE_CLIENT_URL', 'http://nextjstest1.local/wp-login' );
```

### Fetch Posts from WordPress GraphQL API

nous allons créer la page d'index du blog pour afficher la liste des articles récupérée à partir de l'API WordPress.

Voici le processus

Creation de `lib\graphqlRequest.js` qui contient toute les details de la requette HTTP pour interagir avec un serveur GraphQL
( Elle gère les en-têtes (headers) et le corps (body) des requêtes )

`lib\posts.js` : Définis une query pour définir ce que la requette doit extraire de l'API graphQL

`next.config.js` : Pour configurer le projet nextJS ( performance, sécurité ... )

- next/image pour effectuer un certain nombre de vérifications pour s'assurer que les images sont sûres et provenant de sources approuvées.
- remotePatterns vous permet de spécifier les modèles d'URLs d'images distantes qui sont autorisés dans votre application.

`components\FeaturedImage.js` : Pour afficher une image à la une d'un article avec un lien vers le détail de l'article.

pour cela on créé `pages\blog\index.js` pour afficher coté front les article chargé depuis l'API graphQL

nous avons mis en place un processus de récupération des données depuis l'API GraphQL de WordPress en utilisant la bibliothèque Next.js. Nous avons également créé des composants personnalisés pour afficher les images en vedette de chaque article, les titres, les extraits et les catégories. Enfin, nous avons ajouté un pied de page simple avec un avis de droits d'auteur.

## BUG

Je n'arrive pas a afficher l'image a la une lié a un article depuis ma query GraphQL
a la place j'ai l'image par default qui s'affiche
Pourtant quand je log je récupère bien l'URL de l'image de chaque article

L'image est sensé être affiché par le composant <FeaturedImage> dans mon template de page `pages\blog\index.js`

```js
import FeaturedImage from "@/components/FeaturedImage";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import getAllPosts from "@/lib/posts";

/* Fonction asynchrone pour récupérer les données des articles */
export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts: allPosts,
    },
  };
}

/* Définition du composant principal de la page de blog */
export default function BlogHome({ allPosts }) {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="h-[50vh] min-h-[20rem] bg-[url('/home.jpg')] relative">
        <div className="absolute bg-slate-900 inset-0 z-0 opacity-40"></div>
        <SiteHeader className="header-blog-home z-10 relative" />
        <h1 className="text-6xl text-center text-slate-100 relative z-10 py-8">
          BLOG
        </h1>
        <p className="relative z-10 text-center text-slate-200 text-2xl">
          Read our latest articles
        </p>
      </div>
      <main>
        <section className="post-list mt-4">
          <ul>
            {/* Mapping de la liste des articles récupérée */}
            {allPosts.nodes.map((post) => (
              <li key={post.slug} className="grid grid-col-5 gap-4 mb-4">
                <div className="col-span-2">
                  {/* Affiche de l'image à la une de l'article */}
                  <FeaturedImage post={post} />
                  {/*console.log(
                    post.featuredImage.node.mediaDetails.sizes[0].sourceUrl
                  )*/}
                </div>
                <div className="col-span-3">
                  <h2 className="py-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-400 text-2xl"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {/* affiche le contenu de l'extrait d'un article de manière sécurisée en utilisant React */}
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  ></div>
                  {/* affiche les categories de l'article avec un liens*/}
                  <div>
                    Posted under {/* affiche post under ou publié sous*/}
                    {post.categories.nodes.map((category) => (
                      <Link
                        href={`/category/${category.slug}`}
                        key={category.slug}
                        className="text-blue-400 hover:text-blue-500"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
```

`components\FeaturedImage.js`

```js
import Image from "next/image";
import Link from "next/link";

// Composant fonctionnel "FeaturedImage" qui prend un objet "post" en tant que paramètre
export default function FeaturedImage({ post }) {
  let img = "";

  // URL de l'image par défaut en cas de manque d'image dans "post"
  const defaultFeaturedImage =
    "http://nextjstest1.local/wp-content/uploads/2022/12/travel_icy-polar_022K.jpg";

  // Dimensions par défaut pour l'image
  const defaultWidth = "300";
  const defaultHeight = "200";

  // Affiche les données de post pour le débogage
  console.log("Données de post :", post);
  console.log(post.featuredImage);
  console.log("url" + post.featuredImage.node.mediaDetails.sizes[0].sourceUrl);

  // Vérifie si "post" a une image en vedette ("FeaturedImage")
  if (post.FeaturedImage) {
    // Si oui, récupère la première taille de l'image dans les détails multimédias
    let size = post.FeaturedImage.node.mediaDetails.sizes[0];
    img = {
      src: size.sourceUrl,
      width: size.width,
      height: size.height,
    };
    // Si "post" n'a pas d'image en vedette, utilise l'image et les dimensions par défaut
  } else
    img = {
      src: defaultFeaturedImage,
      width: defaultWidth,
      height: defaultHeight,
    };
  // Retourne un composant "Link" de Next.js avec une image liée
  return (
    <Link href={`/blog/${post.slug}`}>
      <Image
        src={img.src}
        width={img.width}
        height={img.height}
        alt={post.title}
      />
    </Link>
  );
}
```

Ma query est : `lib\graphqlRequest.js`

```js
export default async function graphqlRequest(query) {
  // URL de l'API GraphQL que nous allons interroger
  const url = "http://nextjstest1.local/graphql";
  // En-têtes de la requête HTTP pour spécifier que nous envoyons des données au format JSON.
  const headers = { "Content-Type": "application/json" };

  // Effectue une requête POST asynchrone vers l'URL spécifiée avec les en-têtes
  // et le corps de la requête fournis.
  const res = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(query),
  });

  // Attend la réponse de la requête HTTP et la convertit en objet JSON.
  const resJson = await res.json();
  // Retourne la réponse JSON. Notez que cette fonction est asynchrone,
  // ce qui signifie qu'elle renvoie une promesse résolue avec la réponse JSON.
  return resJson;
}
```

Et mon `next.config.js`

```js
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
```
